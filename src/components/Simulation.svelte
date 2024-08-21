<script>
	import Lineup from "$components//Lineup.svelte";
	import _ from "lodash";
	import { utcFormat } from "d3-time-format";

	export let data;
	export let speed;

	const timeFormatter = utcFormat("%B %d");

	let showBanner = false;

	const reset = () => {
		if (!data || !data.length) return;

		showBanner = false;
		setTimeout(() => {
			setTimeout(() => {
				showBanner = true;
			}, walkDuration + 1000);
		}, 100);
	};

	$: data, reset();
	$: matches = data
		? _.groupBy(
				data.filter((d) => d.hasMatch),
				"birthday"
			)
		: {};
	$: sortedMatchDates = Object.keys(matches).sort(
		(a, b) => Date.parse(a) - Date.parse(b)
	);
	$: numMatches = matches ? Object.keys(matches).length : 0;
	$: walkDuration = speed === "fast" ? 5000 : 10000;
</script>

<div class="banner" class:visible={showBanner && data.length}>
	{#if numMatches > 0}
		<h2>{numMatches} {numMatches > 1 ? "matches" : "match"}!</h2>
		<div class="matches">
			{#each sortedMatchDates as date}
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
	{walkDuration}
/>

<style>
	.banner {
		display: flex;
		opacity: 0;
		width: 100%;
		justify-content: space-evenly;
		background: var(--color-gray-100);
		margin-bottom: 1rem;
		padding: 0.5rem;
		transition: opacity 0s;
	}
	.banner.visible {
		transition: opacity 0.5s;
		opacity: 1;
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
