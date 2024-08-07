<script>
	import { insert } from "$utils/supabase.js";

	let name;
	let month;
	let day;
	let submitted = false;
	let errorMessage;

	const submit = async () => {
		errorMessage = undefined;

		try {
			await insert({
				data: {
					first_name: name.toLowerCase(),
					birthday: `1990-${month}-${day}`
				},
				table: "birthdays"
			});

			submitted = true;
		} catch (error) {
			console.log(error);
			errorMessage = error;
		}
	};
</script>

<form on:submit|preventDefault={submit}>
	<label for="first-name">First Name</label>
	<input
		id="first-name"
		type="text"
		bind:value={name}
		required
		maxlength="10"
		disabled={submitted}
	/>

	<label for="birthday">Month</label>
	<input
		id="birth-month"
		type="text"
		placeholder="MM"
		bind:value={month}
		required
		maxlength="2"
		disabled={submitted}
	/>

	<label for="birthday">Day</label>
	<input
		id="birth-day"
		type="text"
		placeholder="DD"
		bind:value={day}
		required
		maxlength="2"
		disabled={submitted}
	/>

	<button type="submit" disabled={submitted}>Submit</button>

	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{:else if submitted}
		<div class="success">Submitted!</div>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
	button {
		margin: 1rem 0;
	}
	.error {
		background: var(--color-red);
		color: white;
	}
	.success {
		background: var(--color-green);
	}
	.error,
	.success {
		padding: 0 4px;
		width: fit-content;
	}
</style>
