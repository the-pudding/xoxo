<script>
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import Guesses from "$routes/demo/Guesses.svelte";
	import Birthdays from "$routes/demo/Birthdays.svelte";
	import Simulation from "$routes/demo/Simulation.svelte";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view = "guesses";
	let showResults;
	let simulationData;

	const receiveMessage = (msg) => {
		if (msg.event === "view") {
			view = msg.payload;
		} else if (msg.event === "show-results") {
			showResults = msg.payload;
		} else if (msg.event === "simulation-n") {
			simulationData = msg.payload.birthdays;
			simulationData = simulationData.map((d) => ({
				...d,
				hasMatch: !!simulationData.find(
					(m) => m.birthday === d.birthday && m.id !== d.id
				)
			}));
		}
	};

	onMount(async () => {
		const userChannel = supabase.channel("demo");
		userChannel
			.on("broadcast", { event: "view" }, (payload) => receiveMessage(payload))
			.on("broadcast", { event: "show-results" }, (payload) =>
				receiveMessage(payload)
			)
			.on("broadcast", { event: "simulation-n" }, (payload) =>
				receiveMessage(payload)
			)
			.subscribe();
	});
</script>

{#if view === "guesses"}
	{#if showResults}
		<Guesses />
	{:else}
		<h2>Enter your guess</h2>
	{/if}
{:else if view === "birthdays"}
	{#if showResults}
		<Birthdays />
	{:else}
		<h2>Enter your birthday</h2>
	{/if}
{:else if view === "simulation"}
	<Simulation data={simulationData} />
{/if}

<style>
	strong {
		color: var(--color-red);
	}
</style>
