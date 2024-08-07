<script>
	import { getContext } from "svelte";
	import _ from "lodash";
	import { fly } from "svelte/transition";
	import { scaleLinear } from "d3-scale";

	const { data, xGet, yScale, width } = getContext("LayerCake");

	const rx = 10;
	const ry = 16;
	const colors = [
		"var(--color-green)",
		"var(--color-blue)",
		"var(--color-red)",
		"var(--color-yellow)",
		"var(--color-purple)"
	];
	$: timeScale = scaleLinear().domain([0, $width]).range([1000, 5000]);
</script>

{#each $data as d, i}
	{@const fill = colors[i % colors.length]}
	{@const cx = $xGet(d)}
	{@const cy = $yScale(0) - ry - 3}
	<g transition:fly={{ x: -cx, opacity: 1, duration: timeScale(cx) }}>
		<ellipse {fill} {rx} {ry} {cx} {cy} />
		<ellipse {fill} rx={4} ry={10} cx={cx - 6} cy={cy + 9} />
		<ellipse {fill} rx={4} ry={10} cx={cx + 6} cy={cy + 9} />

		<circle fill="var(--color-black)" r="1.5" cx={cx - 3} cy={cy - 4} />
		<circle fill="var(--color-black)" r="1.5" cx={cx + 3} cy={cy - 4} />
		<line
			stroke="var(--color-black)"
			stroke-width="1"
			x1={cx - 4}
			y1={cy + 4}
			x2={cx + 4}
			y2={cy + 4}
		/>

		<text class="name" x={cx} y={cy - ry - 5}>{d.first_name}</text>

		{#if d.hasMatch}
			<text class="match" x={cx} y={cy - ry - 25} fill="var(--color-red)"
				>🎉</text
			>
		{/if}
	</g>
{/each}

<style>
	.name {
		font-size: 0.8rem;
		text-anchor: middle;
		fill: var(--color-gray-800);
	}
	.match {
		text-anchor: middle;
		font-size: 1.3rem;
	}
</style>
