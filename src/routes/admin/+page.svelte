<script>
	import Demo from "$routes/demo/+page.svelte";
	import User from "$components/Index.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import { load, update } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";
	import { onMount } from "svelte";
	import _ from "lodash";

	// const months = [
	// 	31, // jan
	// 	29, // feb
	// 	31, // mar
	// 	30, // apr
	// 	31, // may
	// 	30, // jun
	// 	31, // jul
	// 	31, // aug
	// 	30, // sep
	// 	31, // oct
	// 	30, // nov
	// 	31 // dec
	// ];

	// const dayToDate = (dayOfYear) => {
	// 	let tally = 0;
	// 	let m;
	// 	let d;
	// 	months.forEach((month, i) => {
	// 		if (!m && !d) {
	// 			tally += month;

	// 			if (tally > dayOfYear) {
	// 				tally -= month;
	// 				d = dayOfYear - tally;
	// 				m = i;
	// 			}
	// 		}
	// 	});
	// 	return new Date(2024, m, d);
	// };

	// const transformed = article.map((d) => ({
	// 	...d,
	// 	birthday: dayToDate(d.day)
	// }));
	// console.log(transformed);

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view;
	let simulationN;
	let groupBy;
	let birthdays;
	let userChannel;
	let demoChannel;
	let userChannelConnected = false;
	let demoChannelConnected = false;

	const viewOptions = [
		{ label: "Gather birthdays", value: "birthdays" },
		{ label: "Simulations", value: "simulation" }
	];
	const groupOptions = [
		{ label: "Default", value: "default" },
		{ label: "Astrological sign", value: "astrology" },
		{ label: "Most common", value: "common" },
		{ label: "Feb 29", value: "february" },
		{ label: "Holidays", value: "holidays" },
		{ label: "Bad actor", value: "bad" },
		{ label: "Today's birthdays", value: "today" }
	];

	const sendBroadcast = ({ channel, event, payload }) => {
		if (
			(channel === userChannel && !userChannelConnected) ||
			(channel === demoChannel && !demoChannelConnected)
		)
			return null;

		channel.send({
			type: "broadcast",
			event: event,
			payload: payload
		});
	};

	$: view, updateView();
	$: groupBy, updateGroupBy();

	const updateView = async () => {
		if (!userChannel || !demoChannel) return;

		sendBroadcast({
			channel: userChannel,
			event: "view",
			payload: view
		});
		sendBroadcast({
			channel: demoChannel,
			event: "view",
			payload: view
		});

		await update({ table: "state", column: "view", value: view, id: 1 });
	};
	const updateGroupBy = async () => {
		if (!demoChannel) return;

		sendBroadcast({
			channel: demoChannel,
			event: "groupBy",
			payload: groupBy
		});
		await update({
			table: "state",
			column: "groupBy",
			value: groupBy,
			id: 1
		});
	};
	const runSimulation = () => {
		if (!demoChannel) return;

		const simulationData = _.sampleSize(birthdays, simulationN);

		sendBroadcast({
			channel: demoChannel,
			event: "simulation-n",
			payload: { n: simulationN, birthdays: simulationData }
		});
	};

	onMount(async () => {
		userChannel = supabase.channel("user");
		demoChannel = supabase.channel("demo");

		[userChannel, demoChannel].forEach((channel) => {
			channel.subscribe((status) => {
				if (status !== "SUBSCRIBED") return null;
				else {
					if (channel === userChannel) userChannelConnected = true;
					if (channel === demoChannel) demoChannelConnected = true;
				}
			});
		});

		birthdays = await load({ table: "birthdays" });

		const dbView = await load({ table: "state" });
		view = dbView[0].view;
		groupBy = dbView[0].groupBy;
	});
</script>

<h2>Admin</h2>

<!-- <button class="red">Use article data</button> -->

<div>
	User Channel: {userChannelConnected ? "Connected ✅" : "Not connected 🚫"}
</div>
<div>
	Demo Channel: {demoChannelConnected ? "Connected ✅" : "Not connected 🚫"}
</div>

<ButtonSet legend={"Set View"} options={viewOptions} bind:value={view} />

{#if view === "birthdays"}
	<ButtonSet legend={"Group by"} options={groupOptions} bind:value={groupBy} />
{/if}

{#if view === "simulation"}
	<div class="input">
		<div>Simulation with N people</div>
		<input type="number" bind:value={simulationN} placeholder="N" />
		<button on:click={runSimulation}>Run</button>
	</div>
{/if}

<hr />

<h3>On people's phones</h3>
<div class="box">
	<User />
</div>
<h3>On the big screen</h3>
<div class="box">
	<Demo />
</div>

<style>
	.box {
		width: 100%;
		padding: 1rem;
		border: 3px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3rem;
	}
	hr {
		width: 100%;
		border: 1px solid var(--color-gray-400);
		margin: 5rem 0;
	}
	.input {
		text-align: center;
	}
	input {
		width: 5rem;
	}
	.red {
		background-color: #e45546;
	}
	.red:hover {
		background-color: var(--color-red);
	}
</style>
