<script>
	import Birthdays from "$components/Birthdays.svelte";
	import Guesses from "$components/Guesses.svelte";
	import { load } from "$utils/supabase.js";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let userView;

	const receiveMessage = (payload) => {
		console.log("user message received", payload);
	};

	onMount(async () => {
		const userChannel = supabase.channel("user");
		userChannel
			.on("broadcast", { event: "view" }, (payload) => receiveMessage(payload))
			.subscribe();
	});
</script>

{#if userView === "birthdays"}
	<Birthdays />
{:else if userView === "guesses"}
	<Guesses />
{:else if userView === "simulation"}
	<p>Nothing to see here</p>
	<p>Maybe light up people's phone's who are birthday matches?</p>
{/if}
