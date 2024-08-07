<script>
	import { LayerCake, Svg, bin, takeEvery } from "layercake";
	import { scaleBand, format, range } from "d3";
	import Column from "$components/layercake/Column.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import Line from "$routes/demo/Guesses.Line.svelte";

	export let data = [];

	const f = format(".0f");
	const xKey = ["x0", "x1"];
	const yKey = "length";
	const domain = [0, 100];
	const thresholds = range(100);
	const ticks = takeEvery(thresholds, 4);

	$: binnedData = bin(data, (d) => d, {
		domain,
		thresholds
	});
	$: average = Math.floor(data.reduce((a, b) => a + b, 0) / data.length);
</script>

<div class="histogram">
	<div class="title">
		If we ask 50 people for their birthdays, how likely are to get a match?
	</div>
	<div class="subtitle">XOXO 2024's guesses</div>
	<div class="chart-container">
		<LayerCake
			padding={{ top: 40, right: 5, bottom: 20, left: 30 }}
			x={xKey}
			y={yKey}
			xDomain={thresholds}
			xScale={scaleBand().paddingInner(0)}
			yDomain={[0, null]}
			data={binnedData}
		>
			<Svg>
				<AxisX
					tickMarks={true}
					gridlines={false}
					baseline
					{ticks}
					formatTick={(d) => +f(d)}
				/>
				<AxisY gridlines={false} ticks={3} />
				<Column stroke="none" />
				<Line {average} />
			</Svg>
		</LayerCake>
	</div>
</div>

<style>
	.histogram {
		width: 100%;
	}
	.chart-container {
		width: 100%;
		height: 300px;
	}
	input {
		height: auto;
	}
	.title {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.subtitle {
		color: var(--color-gray-800);
		margin: 0.5rem 0;
	}
</style>
