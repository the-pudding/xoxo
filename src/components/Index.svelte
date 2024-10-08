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
	let simulationSpeed;

	const receiveMessage = (msg) => {
		if (msg.event === "view") {
			view = msg.payload;
		} else if (msg.event === "simulation-n") {
			simulationSpeed = msg.payload.speed;
			simulationData = msg.payload.birthdays;
			simulationData = simulationData.map((d) => ({
				...d,
				hasMatch: !!simulationData.find(
					(m) => m.birthday === d.birthday && m.id !== d.id
				)
			}));
		} else if (msg.event === "groupBy") {
			groupBy = msg.payload;
		} else if (msg.event === "new-data-source") {
			birthdays = msg.payload;
		}
	};
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
			.on("broadcast", { event: "new-data-source" }, (payload) =>
				receiveMessage(payload)
			)
			.subscribe();

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
</script>

<div class="page">
	{#if view === "birthdays"}
		<Birthdays {birthdays} {groupBy} />
	{:else if view === "simulation"}
		<Simulation data={simulationData} speed={simulationSpeed} />
	{/if}
</div>

<style>
	.page {
		width: 100%;
		padding: 1rem 3rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
