<script>
	import Demo from "$components/Index.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import { load, update, insert, clear } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";
	import { onMount } from "svelte";
	import { utcFormat } from "d3-time-format";
	import articleData from "$data/article.json";
	import names from "$data/names.json";
	import _ from "lodash";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view;
	let groupBy;
	let birthdays;
	let demoChannel;
	let demoChannelConnected = false;
	let usingArticleData = false;

	const viewOptions = [
		{ label: "Gather birthdays", value: "birthdays" },
		{ label: "Simulations", value: "simulation" }
	];
	const groupOptions = [
		{ label: "Default", value: "default" },
		{ label: "Distribution", value: "distribution" },
		{ label: "Astrological sign", value: "astrology" },
		{ label: "Holidays", value: "holidays" },
		{ label: "Names", value: "names" },
		{ label: "Bad actor", value: "bad" },
		{ label: "This weekend bdays", value: "today" }
	];
	const thisWeekend = ["2024-08-22", "2024-08-23", "2024-08-24", "2024-08-25"];

	const handleBirthdayChange = (payload) => {
		if (payload.eventType === "INSERT") {
			birthdays = [...birthdays, payload.new];
		} else if (payload.eventType === "UPDATE") {
			birthdays = [
				...birthdays.filter((d) => d.id !== payload.new.id),
				payload.new
			];
		} else if (payload.eventType === "DELETE") {
			birthdays = birthdays.filter((d) => d.id !== payload.old.id);
		}
	};
	const sendBroadcast = ({ channel, event, payload }) => {
		if (channel === demoChannel && !demoChannelConnected) return null;

		channel.send({
			type: "broadcast",
			event: event,
			payload: payload
		});
	};
	const updateView = async () => {
		if (!demoChannel) return;

		sendBroadcast({
			channel: demoChannel,
			event: "view",
			payload: view
		});

		await update({ table: "state", column: "view", value: view, id: 1 });
	};
	const updateGroupBy = async () => {
		if (!demoChannel) return;

		sendBroadcast({
			channel: demoChannel,
			event: "groupBy",
			payload: groupBy
		});
		await update({
			table: "state",
			column: "groupBy",
			value: groupBy,
			id: 1
		});
	};
	const runSimulation = (n, speed) => {
		if (!demoChannel) return;

		let simulationData;
		if (speed === "slow" && !usingArticleData) {
			let sample;
			let isMatch = false;

			while (!isMatch) {
				sample = _.sampleSize(
					birthdays.filter((d) => d.id !== 1 && d.id !== 2),
					n - 2
				);
				isMatch =
					sample.filter((d) =>
						sample.some((m) => m.birthday === d.birthday && m.id !== d.id)
					).length > 0;
			}

			simulationData = [
				...birthdays.filter((d) => d.id === 1 || d.id === 2),
				...sample
			];
		} else {
			simulationData = _.sampleSize(birthdays, n);
		}

		sendBroadcast({
			channel: demoChannel,
			event: "simulation-n",
			payload: { birthdays: simulationData, speed: speed }
		});
	};
	const clearDb = async () => {
		await clear({ table: "birthdays" });
		await insert({
			table: "birthdays",
			data: [
				{ id: 1, first_name: "matt", birthday: new Date("2024-01-31") },
				{ id: 2, first_name: "michelle", birthday: new Date("2024-06-13") }
			]
		});
	};
	const populateRandom = async (n) => {
		const toInsert = _.times(n, (i) => {
			const start = new Date(2024, 0, 1);
			const end = new Date(2024, 11, 31);
			const date = new Date(
				start.getTime() + Math.random() * (end.getTime() - start.getTime())
			);
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			const randomBirthday = `2024-${month}-${day}`;

			return {
				first_name: names[i % names.length],
				birthday: new Date(randomBirthday)
			};
		});
		console.log({ toInsert });
		await insert({ table: "birthdays", data: toInsert });
	};
	const useArticleData = () => {
		if (usingArticleData) return;

		usingArticleData = true;
		birthdays = articleData;
		sendBroadcast({
			channel: demoChannel,
			event: "new-data-source",
			payload: articleData
		});
	};

	onMount(async () => {
		demoChannel = supabase.channel("demo");
		demoChannel.subscribe((status) => {
			if (status !== "SUBSCRIBED") return null;
			else demoChannelConnected = true;
		});

		birthdays = await load({ table: "birthdays" });
		supabase
			.channel("birthdays")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "birthdays" },
				handleBirthdayChange
			)
			.on(
				"postgres_changes",
				{ event: "UPDATE", schema: "public", table: "birthdays" },
				handleBirthdayChange
			)
			.on(
				"postgres_changes",
				{ event: "DELETE", schema: "public", table: "birthdays" },
				handleBirthdayChange
			)
			.subscribe();

		const dbView = await load({ table: "state" });
		if (dbView && dbView.length) {
			view = dbView[0].view;
			groupBy = dbView[0].groupBy;
		}
	});

	$: view, updateView();
	$: groupBy, updateGroupBy();
	$: birthdaysThisWeekend = birthdays
		? birthdays.filter((d) => thisWeekend.includes(d.birthday))
		: [];
	$: counts = _.countBy(birthdays, "first_name");
	$: mostCommonNames = _.keys(counts)
		.filter((d) => counts[d] > 1)
		.sort((a, b) => counts[b] - counts[a])
		.slice(0, 3);
	$: holidayBabies = birthdays
		? birthdays.filter(
				({ birthday }) =>
					birthday === "2024-01-01" ||
					birthday === "2024-02-14" ||
					birthday === "2024-10-31" ||
					birthday === "2024-12-25"
			)
		: [];
	$: badActors = birthdays ? birthdays.filter((d) => d.bad) : [];
</script>

<div class="page">
	<h2>Admin</h2>

	<div>
		Broacast Channel: {demoChannelConnected
			? "Connected ✅"
			: "Not connected 🚫"}
	</div>

	<ButtonSet legend={"Set View"} options={viewOptions} bind:value={view} />

	<div>
		<strong>Database</strong>
		<button on:click={clearDb}>Clear DB</button>
		<button on:click={() => populateRandom(600)}>Add 600 to DB</button>
		<button on:click={useArticleData} class="red">Use article data</button>
	</div>

	{#if view === "birthdays"}
		<ButtonSet
			legend={"Group by"}
			options={groupOptions}
			bind:value={groupBy}
		/>

		<p>
			{holidayBabies.length} holiday babies. {holidayBabies.length > 0
				? "✅"
				: "❌"}
		</p>
		<p>
			{mostCommonNames.length} common names. {mostCommonNames.length > 0
				? "✅"
				: "❌"}
		</p>
		<p>
			{badActors.length} bad actors. {badActors.length > 0 ? "✅" : "❌"}
		</p>
		<p>
			{birthdaysThisWeekend.length} birthdays this weekend. {birthdaysThisWeekend.length >
			0
				? "✅"
				: "❌"}
		</p>
	{/if}

	{#if view === "simulation"}
		<div>
			<strong>Run simulation</strong>
			<button on:click={() => runSimulation(50, "slow")}>50 slow</button>
			<button on:click={() => runSimulation(50, "fast")}>50</button>
			<button on:click={() => runSimulation(25, "fast")}>25</button>
		</div>
	{/if}

	<hr />

	<h3>On the big screen</h3>
	<div class="box">
		<Demo />
	</div>
</div>

<style>
	.page {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.box {
		width: 100%;
		padding: 1rem;
		border: 3px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3rem;
	}
	div {
		margin: 1rem 0;
	}
	p {
		margin: 0.5rem 0;
	}
	hr {
		width: 100%;
		border: 1px solid var(--color-gray-400);
		margin: 5rem 0;
	}
	.input {
		text-align: center;
	}
	input {
		width: 5rem;
	}
	.red {
		background-color: #e45546;
	}
	.red:hover {
		background-color: var(--color-red);
	}
</style>
