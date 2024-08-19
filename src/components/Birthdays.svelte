<script>
	import Default from "$components/Birthdays.Default.svelte";
	import Astrology from "$components/Birthdays.Astrology.svelte";
	import Common from "$components/Birthdays.Common.svelte";
	import Today from "$components/Birthdays.Today.svelte";
	import BadActors from "$components/Birthdays.BadActors.svelte";
	import February from "$components/Birthdays.February.svelte";
	import { base } from "$app/paths";
	import _ from "lodash";

	export let birthdays = [];
	export let groupBy;
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
	{:else if groupBy === "bad"}
		<BadActors {birthdays} />
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
