<script>
	import { utcFormat } from "d3-time-format";
	import { scaleLinear } from "d3";
	import _ from "lodash";

	export let birthdays;

	let fontScale = scaleLinear().domain([50,2]).range([10,48]).clamp(true);

	const colors = [
		"var(--color-red)",
		"var(--color-blue)",
		"var(--color-green)",
		"var(--color-yellow)",
		"var(--color-purple)"
	];

	const dateFormatter = utcFormat("%b %-d");

	//const birthdaysFiltered = birthdays.slice(0,100)
</script>

<div class="default">
	<h2><strong>{birthdays.length} birthdays</strong> so far</h2>
	<div class="names">
		{#each birthdays as { first_name, birthday }}
			<div class="name" style={`--color: ${_.sample(colors)}; font-size:${fontScale(birthdays.length)}px;`}>
				{first_name.length > 10 ? first_name.slice(0,10).concat("...") : first_name} - {dateFormatter(new Date(birthday)).toLowerCase()}
			</div>
		{/each}
	</div>
</div>

<style>
	.default {
		text-align: center;
		position: relative;
	}
	h2 {
		position: sticky;
		top: 0;
		background: rgba(255, 255, 255, 0.7);
	}
	.names {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.name {
		border-bottom: 3px solid var(--color);
		width: fit-content;
		margin: 5px;
	}
</style>
