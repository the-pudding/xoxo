<script>
	import _ from "lodash";
	import { base } from "$app/paths";

	export let birthdays;

	const colors = ["red", "green", "purple", "yellow", "blue"];
	const today = new Date();
	const todayString =
		"1990-" +
		(today.getMonth() + 1).toString().padStart(2, "0") +
		"-" +
		today.getDate().toString().padStart(2, "0");

	$: todaysBirthdays = birthdays.filter(
		({ birthday }) => birthday === todayString
	);
</script>

<div id="today">
	<h2>Also, happy birthday to:</h2>
	<div class="people">
		{#each todaysBirthdays as { first_name }}
			{@const color = _.sample(colors)}
			<div class="person-group">
				<div>{first_name}</div>
				<div
					class="person"
					style:background-image={`url(${base}/assets/demo/${color}.png)`}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	#today {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
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
		background-position: -32px 0;
		width: 32px;
		height: 70px;
		background-size: 128px 210px;
		background-repeat: no-repeat;
	}
</style>
