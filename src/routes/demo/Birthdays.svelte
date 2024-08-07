<script>
	import Histogram from "$routes/demo/Birthdays.Histogram.svelte";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import { load } from "$utils/supabase.js";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let birthdays = [];

	const handleBirthdayInsert = (payload) => {
		if (payload.eventType === "INSERT") {
			birthdays = [...birthdays, payload.new];
		}
	};

	onMount(async () => {
		birthdays = await load({ table: "birthdays" });
		supabase
			.channel("birthdays")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "birthdays" },
				handleBirthdayInsert
			)
			.subscribe();
	});
</script>

<Histogram
	title={"XOXO 2024's birthdays"}
	subtitle={"Will there be a birthday match?"}
	data={birthdays}
/>
