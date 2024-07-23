<script>
	import { onMount } from "svelte";
	import { load } from "$utils/supabase.js";
	import { createClient } from "@supabase/supabase-js";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let birthdays = [];

	const handleInserts = (payload) => {
		if (payload.eventType === "INSERT") {
			birthdays = [...birthdays, payload.new];
		}
	};

	onMount(async () => {
		// load + subscribe to birthdays
		birthdays = await load({ table: "birthdays" });
		supabase
			.channel("birthdays")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "birthdays" },
				handleInserts
			)
			.subscribe();
	});
</script>

<h4>Birthdays 🎈</h4>

<table>
	<tr>
		<th>id</th>
		<th>created_at</th>
		<th>first_name</th>
		<th>birthday</th>
	</tr>
	{#each birthdays as { id, created_at, first_name, birthday }}
		<tr>
			<td>{id}</td>
			<td>{created_at}</td>
			<td>{first_name}</td>
			<td>{birthday}</td>
		</tr>
	{/each}
</table>

<style>
	tr:nth-child(even) {
		background-color: var(--color-gray-100);
	}
	th {
		font-weight: bold;
		background-color: var(--color-gray-800);
		color: white;
	}
	td,
	th {
		padding: 0.5rem;
	}
</style>
