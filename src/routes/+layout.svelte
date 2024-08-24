<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
</script>

<!-- 
<Header /> -->

<main id="content">
	<div class="page">
		<slot />
	</div>
</main>

<style>
	main {
		margin-top: 2rem;
	}
</style>
