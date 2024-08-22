<script>
	import People from "$components/Birthdays.People.svelte";
	import _ from "lodash";

	export let birthdays;

	$: counts = _.countBy(birthdays, "first_name");
	$: mostCommonNames = _.keys(counts)
		.sort((a, b) => counts[b] - counts[a])
		.slice(0, 3);
</script>

<div id="names">
	<h2 class="title">Most common names</h2>
	{#each mostCommonNames as name}
		{@const nameBirthdays = birthdays.filter(
			({ first_name }) => first_name === name
		)}
		<div class="people-wrapper">
			<People birthdays={nameBirthdays} />
		</div>
	{/each}
</div>

<style>
	#names {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.title {
		font-weight: bold;
		text-align: center;
	}
	.people-wrapper {
		margin: 1rem 0;
	}
</style>
