<script>
	import People from "$routes/demo/Birthdays.People.svelte";

	export let birthdays;

	const today = new Date();
	const todayString =
		"2024-" +
		(today.getMonth() + 1).toString().padStart(2, "0") +
		"-" +
		today.getDate().toString().padStart(2, "0");

	$: todaysBirthdays = birthdays.filter(
		({ birthday }) => birthday === todayString
	);
</script>

<div id="today">
	<h2>Also, happy birthday to:</h2>
	<People birthdays={todaysBirthdays} hats={true} />
</div>

<style>
	#today {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
