<script>
	import Default from "$routes/demo/Birthdays.Default.svelte";
	import Astrology from "$routes/demo/Birthdays.Astrology.svelte";
	import Common from "$routes/demo/Birthdays.Common.svelte";
	import Today from "$routes/demo/Birthdays.Today.svelte";
	import February from "$routes/demo/Birthdays.February.svelte";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import { load } from "$utils/supabase.js";
	import { base } from "$app/paths";
	import _ from "lodash";

	export let groupBy;

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let birthdays = [];

	$: manyBirthdays = _.flatMap(birthdays, (birthday) =>
		Array(20).fill(birthday)
	);

	const handleBirthdayInsert = (payload) => {
		if (payload.eventType === "INSERT") {
			birthdays = [...birthdays, payload.new];
		}
	};

	onMount(async () => {
		birthdays = await load({ table: "birthdays" });
		supabase
			.channel("birthdays")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "birthdays" },
				handleBirthdayInsert
			)
			.subscribe();
	});
</script>

<div class="website" class:visible={groupBy !== "today"}>
	<img src={`${base}/assets/qrcode.png`} alt="qr code" class="qr-code" />
	<h4>
		Go to <strong>pudding.cool/xoxo</strong> and tell us your birthday! 🎈
	</h4>
</div>

<div class="chart">
	{#if groupBy === "default"}
		<Default {birthdays} />
	{:else if groupBy === "astrology"}
		<Astrology {birthdays} />
	{:else if groupBy === "common"}
		<Common {birthdays} />
	{:else if groupBy === "today"}
		<Today {birthdays} />
	{:else if groupBy === "february"}
		<February {birthdays} />
	{/if}
</div>

<style>
	h2,
	h4 {
		text-align: center;
	}
	strong {
		color: var(--color-red);
	}
	.website {
		display: none;
		align-items: center;
	}
	.visible {
		display: flex;
	}
	.qr-code {
		height: 200px;
		width: 200px;
	}
	.chart {
		margin-top: 2rem;
		width: 100%;
	}
</style>
