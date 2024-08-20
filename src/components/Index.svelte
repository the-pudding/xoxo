<script>
	import { onMount } from "svelte";
	import { load } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";
	import Birthdays from "$components/Birthdays.svelte";
	import Simulation from "$components/Simulation.svelte";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let birthdays = [];
	let view;
	let groupBy;
	let simulationData;

	const receiveMessage = (msg) => {
		if (msg.event === "view") {
			view = msg.payload;
		} else if (msg.event === "simulation-n") {
			simulationData = msg.payload.birthdays;
			simulationData = simulationData.map((d) => ({
				...d,
				hasMatch: !!simulationData.find(
					(m) => m.birthday === d.birthday && m.id !== d.id
				)
			}));
		} else if (msg.event === "groupBy") {
			groupBy = msg.payload;
		}
	};
	const handleBirthdayInsert = (payload) => {
		if (payload.eventType === "INSERT") {
			birthdays = [...birthdays, payload.new];
		}
	};

	onMount(async () => {
		const demoChannel = supabase.channel("demo");
		demoChannel
			.on("broadcast", { event: "view" }, (payload) => receiveMessage(payload))
			.on("broadcast", { event: "simulation-n" }, (payload) =>
				receiveMessage(payload)
			)
			.on("broadcast", { event: "groupBy" }, (payload) =>
				receiveMessage(payload)
			)
			.subscribe();

		birthdays = await load({ table: "birthdays" });
		supabase
			.channel("birthdays")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "birthdays" },
				handleBirthdayInsert
			)
			.subscribe();

		const dbView = await load({ table: "state" });
		view = dbView[0].view;
		groupBy = dbView[0].groupBy;
	});
</script>

<div class="page">
	{#if view === "birthdays"}
		<Birthdays {birthdays} {groupBy} />
	{:else if view === "simulation"}
		<Simulation data={simulationData} />
	{/if}
</div>

<style>
	.page {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
