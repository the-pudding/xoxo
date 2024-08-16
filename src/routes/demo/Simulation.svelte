<script>
	import Lineup from "$routes/demo/Lineup.svelte";

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
	<h2>Hit a birthday match: {successes} / {numSimulations}</h2>
{/if}

<Lineup
	title={`Simulation of size ${data?.length}`}
	subtitle={"Will there be a birthday match?"}
	{data}
/>
