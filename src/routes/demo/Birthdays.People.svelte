<script>
	import { getContext } from "svelte";

	const { data, xGet, xScale, yScale } = getContext("LayerCake");

	const r = 8;
	const h = 30;
</script>

{#each $data as d}
	<circle
		fill="var(--color-green)"
		{r}
		cx={$xGet(d)}
		cy={$yScale(0) - r - h}
		opacity={0.6}
	/>
	<line
		stroke="var(--color-green)"
		stroke-width="2"
		x1={$xGet(d)}
		y1={$yScale(0)}
		x2={$xGet(d)}
		y2={$yScale(0) - h}
		opacity={0.6}
	/>
	<text x={$xGet(d)} y={$yScale(0) - r - h - 12}>{d.first_name}</text>
{/each}

<style>
	text {
		font-size: 0.8rem;
		text-anchor: middle;
		fill: var(--color-gray-800);
	}
</style>
