<script>
	export let birthdays;

	const today = new Date();
	const todayString =
		"1990-" +
		(today.getMonth() + 1).toString().padStart(2, "0") +
		"-" +
		today.getDate().toString().padStart(2, "0");

	$: todaysBirthdays = birthdays.filter(
		({ birthday }) => birthday === todayString
	);

	$: console.log(todaysBirthdays);
</script>

<div id="today">
	<h2>Also, happy birthday to:</h2>
	<ul>
		{#each todaysBirthdays as { first_name }}
			<li>{first_name}</li>
		{/each}
	</ul>
</div>

<style>
	#today {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
