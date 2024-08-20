<script>
	import Default from "$components/Birthdays.Default.svelte";
	import Distribution from "$components/Birthdays.Distribution.svelte";
	import Astrology from "$components/Birthdays.Astrology.svelte";
	import Common from "$components/Birthdays.Common.svelte";
	import Today from "$components/Birthdays.Today.svelte";
	import BadActors from "$components/Birthdays.BadActors.svelte";
	import February from "$components/Birthdays.February.svelte";
	import Holidays from "$components/Birthdays.Holidays.svelte";
	import _ from "lodash";

	export let birthdays = [];
	export let groupBy;
</script>

<div class="text" class:visible={groupBy !== "today"}>
	<h2>
		Text <strong>866-404-0072</strong>
	</h2>
	<h2 class="demo">[your first name] [MM/DD]</h2>
	<div class="example">For example:</div>
	<h3>Matt 01/31</h3>
	<h3>Michelle 06/13</h3>
</div>

<div class="chart">
	{#if groupBy === "default"}
		<Default {birthdays} />
	{:else if groupBy === "distribution"}
		<Distribution {birthdays} />
	{:else if groupBy === "astrology"}
		<Astrology {birthdays} />
	{:else if groupBy === "common"}
		<Common {birthdays} />
	{:else if groupBy === "holidays"}
		<Holidays {birthdays} />
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
		background: var(--color-gray-50);
		padding: 1rem;
		width: 100%;
		display: none;
		flex-direction: column;
		align-items: center;
	}
	.text.visible {
		display: flex;
	}
	h2,
	h3 {
		margin: 0;
	}
	h3 {
		font-family: var(--mono);
	}
	.demo {
		padding: 0 4px;
		font-family: var(--mono);
	}
	.example {
		margin-top: 2rem;
	}
</style>
