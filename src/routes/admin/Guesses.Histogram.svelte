<script>
	import { LayerCake, Svg, bin, takeEvery } from "layercake";
	import { extent, scaleBand, format } from "d3";
	import Column from "$components/layercake/Column.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";

	export let data = [];

	const f = format(".0f");
	const xKey = ["x0", "x1"];
	const yKey = "length";
	const binCount = 10; /* TODO make this dynamic */

	$: domain = extent(data);

	const calcThresholds = (domain = [0, 1], n) => {
		const breaks = [domain[0]];
		const brk = (domain[1] - domain[0]) / n;
		while (breaks[breaks.length - 1] < domain[1]) {
			const node = breaks[breaks.length - 1] + brk;
			breaks.push(node);
		}
		return breaks;
	};

	$: thresholds = calcThresholds(domain, binCount);
	$: slimThresholds = takeEvery(thresholds, 5);

	$: binnedData = bin(data, (d) => d, {
		domain,
		thresholds
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 20, right: 5, bottom: 20, left: 30 }}
		x={xKey}
		y={yKey}
		xDomain={thresholds}
		xScale={scaleBand().paddingInner(0)}
		yDomain={[0, null]}
		data={binnedData}
	>
		<Svg>
			<AxisX
				gridlines={false}
				baseline
				ticks={slimThresholds}
				formatTick={(d) => +f(d)}
			/>
			<AxisY gridlines={false} ticks={3} />
			<Column fill="var(--color-red)" stroke="none" />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
	input {
		height: auto;
	}
</style>
