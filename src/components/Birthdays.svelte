<script>
	import { insert } from "$utils/supabase.js";

	let name;
	let month;
	let day;

	const submit = async () => {
		const { success, error } = await insert({
			data: { first_name: name, birthday: `1990-${month}-${day}` },
			table: "birthdays"
		});

		if (error) {
			console.error("Error inserting row:", error);
		} else if (success) {
			console.log("Row inserted.");
		}
	};
</script>

<form on:submit|preventDefault={submit}>
	<label for="first-name">First Name</label>
	<input id="first-name" type="text" bind:value={name} required />

	<label for="birthday">Month</label>
	<input
		id="birth-month"
		type="text"
		placeholder="MM"
		bind:value={month}
		required
	/>

	<label for="birthday">Day</label>
	<input
		id="birth-day"
		type="text"
		placeholder="DD"
		bind:value={day}
		required
	/>

	<button type="submit">Submit</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
	button {
		margin: 1rem 0;
	}
</style>
