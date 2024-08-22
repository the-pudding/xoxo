<script>
	import _ from "lodash";
	import { base } from "$app/paths";
	import { utcFormat } from "d3-time-format";

	export let birthdays = [];
	export let hats = false;
	export let showDates = false;

	const colors = ["red", "green", "purple", "yellow", "blue"];
	const formatDate = (d) => {
		if (d === "2024-08-23") return "today!";
		else return utcFormat("%A%_m/%d")(new Date(d)).toLowerCase();
	};
</script>

<div class="people">
	{#each birthdays as { first_name, birthday }}
		{@const color = _.sample(colors)}
		<div class="person-group">
			<div>{first_name}</div>
			<div
				class="person"
				class:hat={hats}
				style:background-image={`url(${base}/assets/demo/${color}.png)`}
			/>

			{#if showDates}
				<div class="date" class:today={birthday === "2024-08-23"}>
					{formatDate(birthday)}
				</div>
			{/if}
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
	.date {
		font-size: 0.8rem;
		margin-top: 0.5rem;
	}
	.today {
		font-weight: bold;
	}
</style>
