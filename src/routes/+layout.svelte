<script>
	import { page } from "$app/stores";
	import "$styles/app.css";
	import Header from "$components/Header.svelte";

	const correctPassword = import.meta.env.VITE_PASSWORD;
	let password = "";
	let loggedIn = false;

	const requirePassword = ["Demo", "Admin", "User"];

	const submit = () => {
		if (password === correctPassword) {
			loggedIn = true;
		} else {
			alert("Incorrect password");
		}
	};
</script>

<Header />

<main id="content">
	<div class="page">
		{#if loggedIn || !requirePassword.includes($page.data.title)}
			<slot />
		{:else}
			<h2>Protected Page</h2>
			<input
				type="password"
				bind:value={password}
				placeholder="Enter password"
			/>
			<button on:click={submit}>Submit</button>
		{/if}
	</div>
</main>

<style>
	.page {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	button {
		margin-top: 1rem;
	}
</style>
