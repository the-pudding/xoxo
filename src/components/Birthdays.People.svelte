<script>
	import _ from "lodash";
	import { base } from "$app/paths";

	export let birthdays = [];
	export let hats = false;

	const colors = ["red", "green", "purple", "yellow", "blue"];
</script>

<div class="people">
	{#each birthdays as { first_name }}
		{@const color = _.sample(colors)}
		<div class="person-group">
			<div>{first_name.length > 10 ? first_name.slice(0,10).concat("...") : first_name}</div>
			<div
				class="person"
				class:hat={hats}
				style:background-image={`url(${base}/assets/demo/${color}.png)`}
			/>
		</div>
	{/each}
</div>

<style>
	.people {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
	.person-group {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.person {
		background-position: 0px 0;
		width: 32px;
		height: 70px;
		background-size: 128px 210px;
		background-repeat: no-repeat;
	}
	.hat {
		background-position: -32px 0;
	}
</style>
