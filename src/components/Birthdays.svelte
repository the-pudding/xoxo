<script>
	import Default from "$components/Birthdays.Default.svelte";
	import Distribution from "$components/Birthdays.Distribution.svelte";
	import Astrology from "$components/Birthdays.Astrology.svelte";
	import Today from "$components/Birthdays.Today.svelte";
	import Names from "$components/Birthdays.Names.svelte";
	import BadActors from "$components/Birthdays.BadActors.svelte";
	import Holidays from "$components/Birthdays.Holidays.svelte";
	import _ from "lodash";

	export let birthdays = [];
	export let groupBy;
</script>

<div class="text" class:visible={groupBy !== "today"}>
	<h2>
		Text <strong>866-404-0072</strong>
	</h2>
	<h2 class="demo"><span>your first name</span> <span>MM/DD</span></h2>
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
	{:else if groupBy === "holidays"}
		<Holidays {birthdays} />
	{:else if groupBy === "today"}
		<Today {birthdays} />
	{:else if groupBy === "names"}
		<Names {birthdays} />
	{:else if groupBy === "bad"}
		<BadActors {birthdays} />
	{/if}
</div>

<style>
	h2 {
		font-size: 4rem;
	}
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
		font-size: 2.5rem;
		font-family: var(--mono);
	}
	.demo {
		padding: 0 4px;
	}
	.example {
		font-size: 1.5rem;
		margin-top: 1rem;
	}
	span {
		background: var(--color-gray-300);
		padding: 0 4px;
	}
</style>
