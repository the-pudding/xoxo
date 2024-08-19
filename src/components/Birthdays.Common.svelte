<script>
	import People from "$components/Birthdays.People.svelte";
	import { utcFormat, timeParse } from "d3-time-format";

	export let birthdays;

	const parseDate = timeParse("%Y-%m-%d");
	const formatDate = utcFormat("%B %-d");

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
	<People birthdays={people} />
</div>

<style>
	#common {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
