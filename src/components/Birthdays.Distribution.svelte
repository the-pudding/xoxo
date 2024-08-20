<script>
	import { LayerCake, Svg } from "layercake";
	import Line from "$components/layercake/Line.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { utcFormat } from "d3-time-format";
	import _ from "lodash";

	export let birthdays = [];

	const generateAllDates = (year) => {
		const dates = [];
		for (let month = 1; month <= 12; month++) {
			for (let day = 1; day <= new Date(year, month, 0).getDate(); day++) {
				dates.push(
					`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
				);
			}
		}
		return dates;
	};

	const xKey = "date";
	const yKey = "count";
	const format = utcFormat("%b");
	const dateTicks = _.range(12).map((month) => new Date(2024, month, 1));

	$: data = generateAllDates(2024).map((date) => ({
		date: new Date(date),
		count: birthdays.filter(({ birthday }) => birthday === date).length
	}));
</script>

<div id="distribution">
	<div class="title">XOXO 2024's birthdays</div>

	<div class="chart-container">
		<LayerCake
			padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
			x={xKey}
			y={yKey}
			yDomain={[0, null]}
			{data}
		>
			<Svg>
				<AxisX ticks={dateTicks} {format} />
				<AxisY />
				<Line stroke="var(--color-purple)" />
			</Svg>
		</LayerCake>
	</div>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 400px;
	}
	.title {
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}
</style>
