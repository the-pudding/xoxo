<script>
	import { load } from "$utils/supabase.js";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import Guesses from "$routes/demo/Guesses.svelte";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view;
	let birthdays = [];

	const handleUpdate = (payload) => {
		if (payload.eventType === "UPDATE") {
			view = payload.new.view;
		}
	};
	const handleInserts = (payload) => {
		if (payload.eventType === "INSERT") {
			birthdays = [...birthdays, payload.new];
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
				handleUpdate
			)
			.subscribe();

		birthdays = await load({ table: "birthdays" });
		supabase
			.channel("birthdays")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "birthdays" },
				handleInserts
			)
			.subscribe();
	});
</script>

{#if view === "guesses"}
	<Guesses />
{:else if view === "birthdays"}
	<h2><strong>{birthdays.length}</strong> birthdays entered 🎈</h2>
{:else if view === "viz"}{/if}

<style>
	strong {
		color: var(--color-red);
	}
</style>
