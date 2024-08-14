<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let fill = "#ccc";
</script>

<g>
	{#each $data as d, i}
		{@const x = $xScale.range()[0]}
		{@const y = $yGet(d)}
		{@const width = $xGet(d)}
		{@const height = $yScale.bandwidth()}
		{#if width > 0 && height > 0}
			<rect data-id={i} {x} {y} {width} {height} {fill} />
		{/if}
	{/each}
</g>
