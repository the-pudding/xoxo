<script>
	import { timeFormat } from "d3-time-format";
	import _ from "lodash";

	export let birthdays;

	const colors = [
		"var(--color-red)",
		"var(--color-blue)",
		"var(--color-green)",
		"var(--color-yellow)",
		"var(--color-purple)"
	];

	const dateFormatter = timeFormat("%b %-d");
</script>

<div class="default">
	{#each birthdays as { first_name, birthday }}
		<div class="name" style={`--color: ${_.sample(colors)}`}>
			{first_name} - {dateFormatter(new Date(birthday)).toLowerCase()}
		</div>
	{/each}
</div>

<style>
	.default {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}
	.name {
		border-bottom: 4px solid var(--color);
		width: fit-content;
	}
</style>
