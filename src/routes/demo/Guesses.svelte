<script>
	import Histogram from "$routes/demo/Guesses.Histogram.svelte";
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

<div class="container">
	{#if guesses.length > 0}
		<Histogram data={guesses.map((d) => d.guess)} />
	{/if}

	<div class="bottom">
		<div class="qr-code">qr code</div>
		<div>Go to <strong>the-pudding.github.io/xoxo</strong> to participate!</div>
	</div>
</div>

<style>
	.qr-code {
		background: var(--color-gray-200);
		height: 100px;
		width: 100px;
		text-align: center;
		margin-top: 1rem;
		margin-right: 2rem;
	}
	.bottom {
		display: flex;
		align-items: center;
	}
</style>
