<script>
	import People from "$components/Birthdays.People.svelte";

	export let birthdays;

	$: badActors = birthdays.filter((d) => d.bad);
</script>

<div id="bad">
	<h2>
		We have a feeling {badActors.length > 1 ? "these aren't" : "this isn't"} your
		real name{badActors.length > 1 ? "s" : ""}...
	</h2>
	<People birthdays={badActors} />
</div>

<style>
	#bad {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
