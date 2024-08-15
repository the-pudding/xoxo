<script>
	import { utcFormat, timeParse } from "d3-time-format";
	import { base } from "$app/paths";
	import _ from "lodash";

	export let birthdays;

	const parseDate = timeParse("%Y-%m-%d");
	const formatDate = utcFormat("%B %-d");
	const colors = ["red", "green", "purple", "yellow", "blue"];

	let mostCommon;
	let people = [];

	$: birthdays, findCommon();

	const findCommon = () => {
		if (birthdays && birthdays.length > 0) {
			const birthdayCounts = birthdays.reduce((acc, { birthday }) => {
				const dateKey = parseDate(birthday);
				const dateStr = formatDate(dateKey);
				acc[dateStr] = (acc[dateStr] || 0) + 1;
				return acc;
			}, {});

			mostCommon = Object.keys(birthdayCounts).reduce((a, b) => {
				return birthdayCounts[a] > birthdayCounts[b] ? a : b;
			});
			people = birthdays.filter(
				(b) => formatDate(parseDate(b.birthday)) === mostCommon
			);
		}
	};
</script>

<div id="common">
	<h2>The most common birthday is <strong>{mostCommon}</strong></h2>
	<h4>{people.length} people have that birthday</h4>
	<div class="people">
		{#each people as { first_name }}
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
	#common {
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
		background-position: 0 0;
		width: 32px;
		height: 70px;
		background-size: 128px 210px;
		background-repeat: no-repeat;
	}
</style>
