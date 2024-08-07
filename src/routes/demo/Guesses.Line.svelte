<script>
	import { getContext } from "svelte";

	const { xScale, height } = getContext("LayerCake");

	export let average;
</script>

{#if average}
	<g transform={`translate(${$xScale(average)}, 0)`}>
		<line x1={0} y1={-10} x2={0} y2={$height} />
		<text y={-20}>Average: {average}%</text>
	</g>
{/if}

<style>
	g {
		transition: transform 0.3s;
	}
	line {
		stroke: var(--color-gray-400);
		stroke-dasharray: 2;
	}
	text {
		fill: var(--color-gray-800);
		text-anchor: middle;
		font-weight: bold;
		font-size: 1rem;
	}
</style>
