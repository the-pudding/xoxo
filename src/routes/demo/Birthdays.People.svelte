<script>
	import { getContext } from "svelte";
	import _ from "lodash";

	const { data, xGet, yScale } = getContext("LayerCake");

	const rx = 10;
	const ry = 16;

	const colors = [
		"var(--color-green)",
		"var(--color-blue)",
		"var(--color-red)",
		"var(--color-yellow)",
		"var(--color-purple)"
	];
</script>

{#each $data as d}
	{@const fill = _.sample(colors)}
	{@const cx = $xGet(d)}
	{@const cy = $yScale(0) - ry - 3}
	<ellipse {fill} {rx} {ry} {cx} {cy} />
	<ellipse {fill} rx={3} ry={10} cx={cx - 5} cy={cy + 9} />
	<ellipse {fill} rx={3} ry={10} cx={cx + 5} cy={cy + 9} />

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

	<text x={cx} y={cy - ry - 5}>{d.first_name}</text>
{/each}

<style>
	text {
		font-size: 0.8rem;
		text-anchor: middle;
		fill: var(--color-gray-800);
	}
</style>
