<script>
	import { onMount } from "svelte";
	import { load } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";
	import Birthdays from "$routes/demo/Birthdays.svelte";
	import Simulation from "$routes/demo/Simulation.svelte";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

	onMount(async () => {
		const userChannel = supabase.channel("demo");
		userChannel
			.on("broadcast", { event: "view" }, (payload) => receiveMessage(payload))
			.on("broadcast", { event: "simulation-n" }, (payload) =>
				receiveMessage(payload)
			)
			.on("broadcast", { event: "groupBy" }, (payload) =>
				receiveMessage(payload)
			)
			.subscribe();

		const dbView = await load({ table: "state" });
		view = dbView[0].view;
		groupBy = dbView[0].groupBy;
	});
</script>

{#if view === "birthdays"}
	<Birthdays {groupBy} />
{:else if view === "simulation"}
	<Simulation data={simulationData} />
{/if}
