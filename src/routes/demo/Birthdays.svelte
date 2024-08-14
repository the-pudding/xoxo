<script>
	import Default from "$routes/demo/Birthdays.Default.svelte";
	import Astrology from "$routes/demo/Birthdays.Astrology.svelte";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import { load } from "$utils/supabase.js";
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

<div class="website">
	<h4>
		Go to <strong>pudding.cool/xoxo</strong> and tell us your birthday! 🎈
	</h4>
	<div class="qr-code">qr code</div>
</div>

<div class="chart">
	{#if groupBy === "default"}
		<Default birthdays={manyBirthdays} />
	{:else if groupBy === "astrology"}
		<Astrology birthdays={manyBirthdays} />
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
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.qr-code {
		background: var(--color-gray-200);
		height: 200px;
		width: 200px;
		text-align: center;
	}
	.chart {
		margin-top: 2rem;
		width: 100%;
	}
</style>
