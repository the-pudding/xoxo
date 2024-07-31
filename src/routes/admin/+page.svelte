<script>
	import Birthdays from "$routes/admin/Birthdays.svelte";
	import Guesses from "$routes/admin/Guesses.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import { load, update } from "$utils/supabase.js";
	import { onMount } from "svelte";

	let view;
	const options = [
		{ label: "Gather guesses", value: "guesses" },
		{ label: "Gather birthdays", value: "birthdays" },
		{ label: "Visualize", value: "viz" }
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

<ButtonSet legend={"Set User View"} {options} bind:value={view} />
<Guesses />
<Birthdays />
