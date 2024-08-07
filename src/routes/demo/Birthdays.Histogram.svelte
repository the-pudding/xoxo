<script>
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import People from "$routes/demo/Birthdays.People.svelte";
	import { LayerCake, Svg } from "layercake";
	import { scaleBand } from "d3-scale";
	import { timeFormat, timeParse } from "d3-time-format";

	export let data = [];

	const xKey = "birthday";
	const yKey = "id";
	const startDate = new Date(1990, 0, 1);
	const formatDate = (d) => timeFormat("%b %d")(d);
	const parseDate = (d) => timeParse("%Y-%m-%d")(d);
	const xTicks = [startDate, new Date(1990, 6, 2), new Date(1990, 11, 31)];

	const dates = Array.from({ length: 366 }, (_, i) => {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		return date;
	});

	$: data = data.map((d) => ({
		...d,
		birthday: parseDate(d.birthday),
		hasMatch: !!data.find((m) => m.birthday === d.birthday && m.id !== d.id)
	}));
</script>

<div class="histogram">
	<div class="title">XOXO 2024's birthdays</div>
	<div class="subtitle">Is there a birthday match?</div>
	<div class="subtitle" style="text-align: center">🎉 = shared birthday</div>

	<div class="chart-container">
		<LayerCake
			padding={{ top: 0, right: 25, bottom: 50, left: 25 }}
			x={xKey}
			y={yKey}
			xScale={scaleBand().paddingInner(0.02)}
			xDomain={dates}
			yDomain={[0, null]}
			{data}
		>
			<Svg>
				<AxisX
					ticks={xTicks}
					gridlines={false}
					format={formatDate}
					baseline={true}
				/>
				<People />
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
	.title {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.subtitle {
		color: var(--color-gray-800);
		margin: 0.5rem 0;
	}
</style>
