<script>
	import People from "$routes/demo/Birthdays.People.svelte";
	import badWords from "$data/bad_words.json";

	export let birthdays;

	// TODO: make a better regex for this
	$: badActors = birthdays.filter((d) => {
		if (d.first_name === "michelle") return false;
		const name = d.first_name;
		const singleBad = badWords.filter((b) => b.split(" ").length === 1);
		return singleBad.some((badWord) => name.includes(badWord));
	});
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
