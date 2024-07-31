<script>
	import { page } from "$app/stores";
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
</script>

<Header />
<main id="content">
	<div class="page">
		<h2>{$page.data.title}</h2>
		<slot />
	</div>
</main>

<style>
	.page {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
