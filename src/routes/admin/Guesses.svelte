<script>
	import Histogram from "$routes/admin/Guesses.Histogram.svelte";
	import { onMount } from "svelte";
	import { load } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";
	import _ from "lodash";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let guesses = [];

	const handleInserts = (payload) => {
		if (payload.eventType === "INSERT") {
			guesses = [...guesses, payload.new];
		}
	};

	onMount(async () => {
		guesses = await load({ table: "guesses" });
		supabase
			.channel("guesses")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "guesses" },
				handleInserts
			)
			.subscribe();
	});
</script>

<h4>Guesses 🤷🏽‍♀️</h4>

{#if guesses.length > 0}
	<Histogram data={guesses.map((d) => d.guess)} />
{/if}
