<script>
	import { utcFormat } from "d3-time-format";
	import _ from "lodash";

	export let birthdays;

	const colors = [
		"var(--color-red)",
		"var(--color-blue)",
		"var(--color-green)",
		"var(--color-yellow)",
		"var(--color-purple)"
	];

	const dateFormatter = utcFormat("%b %-d");
</script>

<div class="default">
	<h2><strong>{birthdays.length} birthdays</strong> so far</h2>
	<div class="names">
		{#each birthdays as { first_name, birthday }}
			<div class="name" style={`--color: ${_.sample(colors)}`}>
				{first_name} - {dateFormatter(new Date(birthday)).toLowerCase()}
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
		gap: 1rem;
	}
	.name {
		border-bottom: 3px solid var(--color);
		width: fit-content;
	}
</style>
