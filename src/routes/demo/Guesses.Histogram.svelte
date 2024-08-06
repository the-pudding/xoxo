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
	const binCount = 100;
	const domain = [0, 100];

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

<div class="histogram">
	<div class="title">
		If we ask 50 people for their birthdays, how likely are to get a match?
	</div>
	<div class="subtitle">XOXO 2024's guesses</div>
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
