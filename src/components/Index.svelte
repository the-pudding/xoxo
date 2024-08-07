<script>
	import Birthdays from "$components/Birthdays.svelte";
	import Guesses from "$components/Guesses.svelte";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let view = "guesses"; // TODO: remove

	const receiveMessage = (msg) => {
		if (msg.event === "view") {
			view = msg.payload;
		}
	};

	onMount(async () => {
		// TODO: ask for the most recent view
		const userChannel = supabase.channel("user");
		userChannel
			.on("broadcast", { event: "view" }, (msg) => receiveMessage(msg))
			.subscribe();
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
