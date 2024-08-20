<script>
	import AxisX from "$components/layercake/AxisX.html.svelte";
	import People from "$components//Lineup.People.svelte";
	import { LayerCake, Html } from "layercake";
	import { scaleBand } from "d3-scale";
	import { timeParse, timeFormat } from "d3-time-format";
	import _ from "lodash";

	const startDate = new Date(2024, 0, 1);
	const dateTicks = [startDate, new Date(2024, 6, 2), new Date(2024, 11, 31)];
	const allDates = Array.from({ length: 366 }, (_, i) => {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		return date;
	});

	export let data = [];
	export let title;
	export let subtitle;
	export let xKey = "birthday";
	export let xDomain = allDates;
	export let xTicks = dateTicks;
	export let formatTick = (d) => timeFormat("%b %d")(d);
	export let showMatches = true;

	const yKey = "id";
	const parseDate = (d) => timeParse("%Y-%m-%d")(d);

	$: data = data.map((d) => ({
		...d,
		birthday: parseDate(d.birthday),
		hasMatch: !!data.find((m) => m.birthday === d.birthday && m.id !== d.id)
	}));
</script>

<div class="histogram">
	{#if title}<div class="title">{title}</div>{/if}
	{#if subtitle}<div class="subtitle">{subtitle}</div>{/if}

	<div class="chart-container">
		<LayerCake
			padding={{ top: 0, right: 25, bottom: 50, left: 25 }}
			x={xKey}
			y={yKey}
			xScale={scaleBand().paddingInner(0.02)}
			{xDomain}
			yDomain={[0, null]}
			{data}
		>
			<Html>
				<AxisX
					ticks={xTicks}
					tickMarks={true}
					gridlines={false}
					format={formatTick}
					baseline={true}
				/>
				{#if data.length > 0}
					<People {showMatches} />
				{/if}
			</Html>
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
		margin-bottom: 1rem;
	}
</style>
