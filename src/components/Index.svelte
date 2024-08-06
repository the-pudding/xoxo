<script>
	import Birthdays from "$components/Birthdays.svelte";
	import Guesses from "$components/Guesses.svelte";
	import { load } from "$utils/supabase.js";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let userView;

	const handleUpdate = (payload) => {
		if (payload.eventType === "UPDATE") {
			userView = payload.new.user_view;
		}
	};

	onMount(async () => {
		const view = await load({ table: "view" });
		userView = view[0]?.user_view;
		supabase
			.channel("view")
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "view" },
				handleUpdate
			)
			.subscribe();
	});
</script>

{#if userView === "birthdays"}
	<Birthdays />
{:else if userView === "guesses"}
	<Guesses />
{:else if userView === "viz"}{/if}
