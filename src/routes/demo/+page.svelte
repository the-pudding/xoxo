<script>
	import { load } from "$utils/supabase.js";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import Guesses from "$routes/demo/Guesses.svelte";
	import Birthdays from "$routes/demo/Birthdays.svelte";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view;

	const handleViewUpdate = (payload) => {
		if (payload.eventType === "UPDATE") {
			view = payload.new.view;
		}
	};

	onMount(async () => {
		const userView = await load({ table: "user_view" });
		view = userView[0]?.view;
		supabase
			.channel("user_view")
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "user_view" },
				handleViewUpdate
			)
			.subscribe();
	});
</script>

{#if view === "guesses"}
	<Guesses />
{:else if view === "birthdays"}
	<Birthdays />
{:else if view === "viz"}{/if}

<style>
	strong {
		color: var(--color-red);
	}
</style>
