<script>
	import Default from "$components/Birthdays.Default.svelte";
	import Astrology from "$components/Birthdays.Astrology.svelte";
	import Common from "$components/Birthdays.Common.svelte";
	import Today from "$components/Birthdays.Today.svelte";
	import BadActors from "$components/Birthdays.BadActors.svelte";
	import February from "$components/Birthdays.February.svelte";
	import Holidays from "$components/Birthdays.Holidays.svelte";
	import { base } from "$app/paths";
	import _ from "lodash";

	export let birthdays = [];
	export let groupBy;

	let zero = "0";

	// $: console.log(groupBy)

	// function getRandomMonthDay() {
	// 	const month = Math.floor(Math.random() * 12); // Months are 0-11
	// 	const day = Math.floor(Math.random() * 31) + 1; // Days are 1-31 (will be adjusted for month validity)

	// 	// Create a date object to handle month/day overflow automatically
	// 	const date = new Date(2024, month, day); // Year is arbitrary, used to create a valid date

	// 	return { month: date.getMonth() + 1, day: date.getDate() }; // Return month/day as an object
	// }

	// const n = 600; // Replace with the desired number of random dates
	// const manyBirthdays = Array.from({ length: n }, () => getRandomMonthDay());

	// birthdays = manyBirthdays.map(d => {
	// 	return {
	// 		first_name: "matt daniels here togegther",
	// 		birthday: `2024-${d.month < 10 ? zero.concat(d.month) : d.month}-${d.day < 10 ? zero.concat(d.day) : d.day}`
	// 	}
	// })
</script>

<div class="text">
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
		display: flex;
		flex-direction: column;
		align-items: center;
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
