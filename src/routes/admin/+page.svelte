<script>
	import Birthdays from "$routes/admin/Birthdays.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import { load, update } from "$utils/supabase.js";
	import { onMount } from "svelte";

	let view;
	const options = [
		{ label: "Gather guesses", value: "guesses" },
		{ label: "Gather birthdays", value: "birthdays" },
		{ label: "Show people", value: "people" }
	];

	const updateUserView = async () => {
		if (!view) return;
		await update({
			table: "user_view",
			column: "view",
			value: view
		});
	};

	$: view, updateUserView();

	onMount(async () => {
		const userView = await load({ table: "user_view" });
		view = userView[0]?.view;
	});
</script>

<div class="admin">
	<h2>Admin</h2>
	<ButtonSet legend={"Set User View"} {options} bind:value={view} />
	<Birthdays />
</div>

<style>
	.admin {
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
