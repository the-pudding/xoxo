<script>
	import Histogram from "$routes/demo/Birthdays.Histogram.svelte";

	export let data;

	let successes = 0;
	let numSimulations = 0;

	$: data, trackRound();

	const trackRound = () => {
		if (!data) return;
		if (data.some((d) => d.hasMatch)) {
			successes += 1;
		}
		numSimulations += 1;
	};
</script>

{#if numSimulations > 0}
	<h2>Success rate: {successes} / {numSimulations}</h2>
{/if}

<Histogram
	title={`Simulation of size ${data?.length}`}
	subtitle={"Will there be a birthday match?"}
	{data}
/>
