<script>
	import Birthdays from "$components/Birthdays.svelte";
	import Guesses from "$components/Guesses.svelte";
	import { onMount } from "svelte";
	import { load } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view;

	const receiveMessage = (msg) => {
		if (msg.event === "view") {
			view = msg.payload;
		}
	};

	onMount(async () => {
		const userChannel = supabase.channel("user");
		userChannel
			.on("broadcast", { event: "view" }, (msg) => receiveMessage(msg))
			.subscribe();

		const dbView = await load({ table: "view" });
		view = dbView[0].view;
	});
</script>

{#if view === "birthdays"}
	<Birthdays />
{:else if view === "guesses"}
	<Guesses />
{:else if view === "simulation"}
	<p>Nothing to see here</p>
	<p>Maybe light up people's phone's who are birthday matches?</p>
{/if}
