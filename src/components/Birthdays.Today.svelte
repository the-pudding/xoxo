<script>
	import People from "$components/Birthdays.People.svelte";
	import _ from "lodash";

	export let birthdays;

	const thisWeekend = ["2024-08-22", "2024-08-23", "2024-08-24", "2024-08-25"];

	$: featured = _.orderBy(
		birthdays.filter(({ birthday }) => thisWeekend.includes(birthday)),
		"birthday"
	);
</script>

<div id="today">
	<h2>Also, happy birthday to...</h2>
	<People birthdays={featured} hats={true} showDates={true} />
	<h4>...who all have birthdays this weekend!</h4>
</div>

<style>
	#today {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
