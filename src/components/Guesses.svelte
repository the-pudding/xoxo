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
	<h2>Should Matt take the bet?</h2>
	<h4>
		If we ask 50 people for their birthdays, how likely are we to get a match?
	</h4>
	<h4>Your Guess: <span>{guess}%</span></h4>
	<div class="range">
		<Range
			min={0}
			max={100}
			step={1}
			ticks={[0, 50, 100]}
			formatTick={(d) => `${d}%`}
			bind:value={guess}
		/>
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
	h2,
	h3,
	h4 {
		text-align: center;
	}
</style>
