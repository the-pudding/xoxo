<script>
	import { LayerCake, Svg } from "layercake";
	import { scaleBand } from "d3-scale";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import Bar from "$components/layercake/Bar.svelte";
	import { dateToSign } from "$utils/astrology.js";
	import _ from "lodash";

	export let birthdays;

	const xKey = "count";
	const yKey = "sign";
	const format = (d) => {
		if (d === "Capricorn") return "Capricorn 🏔️";
		if (d === "Aquarius") return "Aquarius 🧠";
		if (d === "Pisces") return "Pisces 🎏";
		if (d === "Aries") return "Aries 🐏";
		if (d === "Taurus") return "Taurus 🌷";
		if (d === "Gemini") return "Gemini 🎭";
		if (d === "Cancer") return "Cancer 🌊";
		if (d === "Leo") return "Leo 🦁";
		if (d === "Virgo") return "Virgo 📚";
		if (d === "Libra") return "Libra ⚖️";
		if (d === "Scorpio") return "Scorpio 🦂";
		if (d === "Sagittarius") return "Sagittarius 🏹";
	};

	let counts;

	$: {
		const signCounts = new Map();

		birthdays.forEach(({ birthday }) => {
			const { name: sign } = dateToSign(birthday);
			if (signCounts.has(sign)) {
				signCounts.set(sign, signCounts.get(sign) + 1);
			} else {
				signCounts.set(sign, 1);
			}
		});

		counts = _.orderBy(
			Array.from(signCounts, ([sign, count]) => ({ sign, count })),
			"count",
			"desc"
		);
	}
</script>

{#if counts.length > 0}
	<div id="astrology">
		<div class="title">What's your sign?</div>
		<div class="subtitle">XOXO birthdays, grouped by astrological sign</div>
		<div class="chart-container">
			<LayerCake
				padding={{ left: 130, bottom: 20 }}
				x={xKey}
				y={yKey}
				yScale={scaleBand().paddingInner(0.05)}
				yDomain={counts.map(({ sign }) => sign)}
				xDomain={[0, null]}
				data={counts}
			>
				<Svg>
					<AxisX tickMarks baseline snapLabels ticks={4} />
					<AxisY tickMarks gridlines={false} {format} />
					<Bar fill="var(--color-green)" />
				</Svg>
			</LayerCake>
		</div>
	</div>
{/if}

<style>
	.chart-container {
		width: 100%;
		height: 400px;
	}
	:global(#astrology .tick) {
		font-size: 14px;
	}
	.title {
		font-size: 1.75rem;
		font-weight: bold;
	}
	.subtitle {
		color: var(--color-gray-800);
		margin: 0.5rem 0;
		margin-bottom: 1rem;
	}
</style>
