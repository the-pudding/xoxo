<script>
	import BadActor from "$routes/admin/BadActor.svelte";
	import Demo from "$components/Index.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import { load, update } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";
	import { onMount } from "svelte";
	import _ from "lodash";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view;
	let simulationN;
	let groupBy;
	let birthdays;
	let demoChannel;
	let demoChannelConnected = false;

	const viewOptions = [
		{ label: "Gather birthdays", value: "birthdays" },
		{ label: "Simulations", value: "simulation" }
	];
	const groupOptions = [
		{ label: "Default", value: "default" },
		{ label: "Astrological sign", value: "astrology" },
		{ label: "Holidays", value: "holidays" },
		{ label: "Bad actor", value: "bad" },
		{ label: "Today's birthdays", value: "today" }
	];

	const sendBroadcast = ({ channel, event, payload }) => {
		if (channel === demoChannel && !demoChannelConnected) return null;

		channel.send({
			type: "broadcast",
			event: event,
			payload: payload
		});
	};

	$: view, updateView();
	$: groupBy, updateGroupBy();

	const updateView = async () => {
		if (!demoChannel) return;

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
		demoChannel = supabase.channel("demo");

		demoChannel.subscribe((status) => {
			if (status !== "SUBSCRIBED") return null;
			else demoChannelConnected = true;
		});

		birthdays = await load({ table: "birthdays" });

		const dbView = await load({ table: "state" });
		view = dbView[0].view;
		groupBy = dbView[0].groupBy;
	});

	const thisWeekend = ["2024-08-22", "2024-08-23", "2024-08-24", "2024-08-25"];

	$: birthdaysThisWeekend = birthdays
		? birthdays.filter((d) => thisWeekend.includes(d.birthday))
		: [];
</script>

<div class="page">
	<h2>Admin</h2>

	<button class="red">Use article data</button>

	<div>
		Demo Channel: {demoChannelConnected ? "Connected ✅" : "Not connected 🚫"}
	</div>

	<ButtonSet legend={"Set View"} options={viewOptions} bind:value={view} />

	{#if view === "birthdays"}
		<ButtonSet
			legend={"Group by"}
			options={groupOptions}
			bind:value={groupBy}
		/>
	{/if}

	{#if view === "simulation"}
		<div class="input">
			<div>Simulation with N people</div>
			<input type="number" bind:value={simulationN} placeholder="N" />
			<button on:click={runSimulation}>Run</button>
		</div>
	{/if}

	<p>{birthdaysThisWeekend.length} birthdays this weekend.</p>

	<BadActor {birthdays} />

	<hr />

	<h3>On the big screen</h3>
	<div class="box">
		<Demo />
	</div>
</div>

<style>
	.page {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
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
