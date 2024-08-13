<script>
	import Demo from "$routes/demo/+page.svelte";
	import User from "$components/Index.svelte";
	import Toggle from "$components/helpers/Toggle.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import { load, update } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";
	import { onMount } from "svelte";
	import _ from "lodash";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view;
	let showResults;
	let simulationN;
	let birthdays;
	let userChannel;
	let demoChannel;
	let userChannelConnected = false;
	let demoChannelConnected = false;

	const viewOptions = [
		{ label: "Gather votes", value: "guesses" },
		{ label: "Gather birthdays", value: "birthdays" },
		{ label: "Simulations", value: "simulation" }
	];
	const toggleOptions = [
		{ value: true, text: "on" },
		{ value: false, text: "off" }
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
	$: showResults, updateShowResults();

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

		showResults = false;
		await update({ table: "state", column: "view", value: view, id: 1 });
	};
	const updateShowResults = async () => {
		if (!demoChannel) return;

		sendBroadcast({
			channel: demoChannel,
			event: "show-results",
			payload: showResults
		});

		await update({
			table: "state",
			column: "show_results",
			value: showResults,
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
		showResults = dbView[0].show_results;
	});
</script>

<div>
	User Channel: {userChannelConnected ? "Connected ✅" : "Not connected 🚫"}
</div>
<div>
	Demo Channel: {demoChannelConnected ? "Connected ✅" : "Not connected 🚫"}
</div>

<ButtonSet legend={"Set View"} options={viewOptions} bind:value={view} />

{#if view === "guesses" || view === "birthdays"}
	<Toggle
		label="Show results in demo"
		style="inner"
		options={toggleOptions}
		bind:value={showResults}
	/>
{/if}

{#if view === "simulation"}
	<div class="input">
		<div>Simulation with N people</div>
		<input type="number" bind:value={simulationN} placeholder="N" />
		<button on:click={runSimulation}>Run</button>
	</div>

	<button>Reset simulations</button>
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
</style>
