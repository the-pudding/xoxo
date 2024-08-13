<script>
	import AxisX from "$components/layercake/AxisX.html.svelte";
	import People from "$routes/demo/Birthdays.People.svelte";
	import { LayerCake, Svg, Html } from "layercake";
	import { scaleBand, scaleLinear } from "d3-scale";
	import { timeFormat, timeParse } from "d3-time-format";
	import _ from "lodash";
	import getAstrologicalSign from "$routes/demo/getAstrologicalSign.js";

	export let data = [];
	export let title;
	export let subtitle;
	export let xKey;
	export let xDomain;
	export let xTicks = [];
	export let formatTick = (d) => d;
	export let showMatches = true;

	const yKey = "id";
	const parseDate = (d) => timeParse("%Y-%m-%d")(d);

	$: data = data.map((d) => ({
		...d,
		birthday: parseDate(d.birthday),
		hasMatch: !!data.find((m) => m.birthday === d.birthday && m.id !== d.id),
		astrologicalSign: getAstrologicalSign(d.birthday)
	}));

	$: console.log(data);
</script>

{#if data.length > 0}
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
						gridlines={false}
						format={formatTick}
						baseline={true}
					/>
					<People {showMatches} />
				</Html>
			</LayerCake>
		</div>
	</div>
{/if}

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
