<script>
	import wordmark from "$svg/wordmark-shadow.svg";
	import xoxo from "$svg/xoxo.svg";
</script>

<header>
	<div class="logos">
		<div class="wordmark">
			<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
				>{@html wordmark}</a
			>
		</div>

		<span>+</span>

		<div class="xoxo">
			{@html xoxo}
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		margin: 1rem 0;
	}

	.logos {
		display: flex;
		align-items: center;
	}

	.wordmark {
		max-width: 13em;
		transform: translate(0, 7px);
	}

	.xoxo {
		width: 4rem;
		height: 4rem;
	}

	span {
		font-size: 2rem;
		margin: 0 1rem;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}
</style>
