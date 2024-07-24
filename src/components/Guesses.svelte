<script>
	import Range from "$components/helpers/Range.svelte";
	import { insert } from "$utils/supabase.js";

	let guess;

	const submit = async () => {
		if (guess <= 0) return;

		const { success, error } = await insert({
			data: { guess },
			table: "guesses"
		});

		if (error) {
			console.error("Error inserting row:", error);
		} else if (success) {
			console.log("Row inserted.");
		}
	};
</script>

<section>
	<h2>How many people would it take to get a birthday match?</h2>
	<h4>Your Guess: <span>{guess}</span></h4>
	<div class="range">
		<Range min={0} max={1000} step={1} showTicks={false} bind:value={guess} />
	</div>
	<button on:click={submit}>Submit</button>
</section>

<style>
	section {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.range {
		width: 100%;
	}
	button {
		margin: 1rem 0;
	}
	h2 {
		text-align: center;
	}
</style>
