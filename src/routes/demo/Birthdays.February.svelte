<script>
	import People from "$routes/demo/Birthdays.People.svelte";

	export let birthdays;

	$: feb29Birthdays = birthdays.filter(
		({ birthday }) => birthday === "2024-02-29"
	);
</script>

<div id="february">
	<h2>
		<strong>{feb29Birthdays.length}</strong>
		{feb29Birthdays.length > 1 ? "people have" : "person has"} a birthday of
		<strong>February 29</strong>
	</h2>
	<People birthdays={feb29Birthdays} />
</div>

<style>
	#february {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
