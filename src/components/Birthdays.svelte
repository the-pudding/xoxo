<script>
	import Default from "$components/Birthdays.Default.svelte";
	import Astrology from "$components/Birthdays.Astrology.svelte";
	import Common from "$components/Birthdays.Common.svelte";
	import Today from "$components/Birthdays.Today.svelte";
	import BadActors from "$components/Birthdays.BadActors.svelte";
	import February from "$components/Birthdays.February.svelte";
	import _ from "lodash";

	export let birthdays = [];
	export let groupBy;
</script>

<div class="text">
	<h2>
		Text your first name + birthday to <strong>866-404-0072</strong>
	</h2>
	<div>Like this:</div>
	<h3><span>Matt 1/31</span></h3>
	<h3><span>Michelle 6/13</span></h3>
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
	.qr-code {
		height: 200px;
		width: 200px;
	}
	.chart {
		margin-top: 2rem;
		width: 100%;
	}
	.text {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.text span {
		background: #fab5ae;
		padding: 0 4px;
	}
	h3 {
		margin: 0;
	}
</style>
