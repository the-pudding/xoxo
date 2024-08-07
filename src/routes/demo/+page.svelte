<script>
	import { load } from "$utils/supabase.js";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import Guesses from "$routes/demo/Guesses.svelte";
	import Birthdays from "$routes/demo/Birthdays.svelte";
	import Simulation from "$routes/demo/Simulation.svelte";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let userView;
	let showResults;

	const receiveMessage = (payload) => {
		console.log("demo message received", payload);
	};

	onMount(async () => {
		const userChannel = supabase.channel("demo");
		userChannel
			.on("broadcast", { event: "view" }, (payload) => receiveMessage(payload))
			.subscribe();
	});
</script>

{#if userView === "guesses"}
	{#if showResults}
		<Guesses />
	{:else}
		<h2>Enter your guess</h2>
	{/if}
{:else if userView === "birthdays"}
	{#if showResults}
		<Birthdays />
	{:else}
		<h2>Enter your birthday</h2>
	{/if}
{:else if userView === "simulation"}
	<Simulation />
{/if}

<style>
	strong {
		color: var(--color-red);
	}
</style>
