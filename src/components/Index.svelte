<script>
	import Birthdays from "$components/Birthdays.svelte";
	import Guesses from "$components/Guesses.svelte";
	import { load } from "$utils/supabase.js";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view;

	const handleUpdate = (payload) => {
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
				handleUpdate
			)
			.subscribe();
	});
</script>

{#if view === "birthdays"}
	<Birthdays />
{:else if view === "guesses"}
	<Guesses />
{:else if view === "viz"}{/if}
