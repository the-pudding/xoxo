<script>
	import Lineup from "$components//Lineup.svelte";
	import _ from "lodash";
	import { utcFormat } from "d3-time-format";

	export let data;

	let successes = 0;
	let numSimulations = 0;
	const timeFormatter = utcFormat("%B %d");

	$: data, trackRound();

	const trackRound = () => {
		if (!data) return;
		if (data.some((d) => d.hasMatch)) {
			successes += 1;
		}
		numSimulations += 1;
	};

	$: matches = data
		? _.groupBy(
				data.filter((d) => d.hasMatch),
				"birthday"
			)
		: {};
	$: numMatches = matches ? Object.keys(matches).length : 0;
</script>

<div class="title">
	{#if numMatches > 0}
		<h2>{numMatches} {numMatches > 1 ? "matches" : "match"}!</h2>
		<div class="matches">
			{#each Object.keys(matches) as date}
				{@const people = matches[date]}
				<div class="match">
					<div class="date">{timeFormatter(new Date(date))}</div>
					{#each people as { first_name }}
						<div class="name">{first_name}</div>
					{/each}
				</div>
			{/each}
		</div>
	{:else}
		<h2>No matches 😔</h2>
	{/if}
</div>

<Lineup
	title={`${data?.length} random XOXO attendees`}
	subtitle={"Will there be a birthday match?"}
	{data}
/>

<style>
	.title {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
		background: var(--color-gray-100);
		margin-bottom: 1rem;
		padding: 0.5rem;
	}
	.matches {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.match {
		display: flex;
		flex-direction: column;
	}
	.date {
		border-bottom: 2px solid black;
	}
	h2 {
		white-space: nowrap;
		margin-right: 1rem;
		color: var(--color-red);
		font-weight: bold;
	}
</style>
