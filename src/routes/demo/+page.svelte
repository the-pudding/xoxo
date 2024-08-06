<script>
	import { load } from "$utils/supabase.js";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import Guesses from "$routes/demo/Guesses.svelte";
	import Birthdays from "$routes/demo/Birthdays.svelte";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let userView;
	let showResults;

	const handleViewUpdate = (payload) => {
		if (payload.eventType === "UPDATE") {
			userView = payload.new.user_view;
			showResults = payload.new.show_results;
		}
	};

	onMount(async () => {
		const view = await load({ table: "view" });
		userView = view[0]?.user_view;
		showResults = view[0]?.show_results;
		supabase
			.channel("view")
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "view" },
				handleViewUpdate
			)
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
{:else if userView === "viz"}{/if}

<style>
	strong {
		color: var(--color-red);
	}
</style>
