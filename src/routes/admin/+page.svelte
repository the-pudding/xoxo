<script>
	import Demo from "$routes/demo/+page.svelte";
	import User from "$components/Index.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import { load, update } from "$utils/supabase.js";
	import { onMount } from "svelte";

	let view;
	const options = [
		{ label: "Gather guesses", value: "guesses" },
		{ label: "Gather birthdays", value: "birthdays" },
		{ label: "Simulation", value: "simulation" }
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

<h3>On people's phones</h3>
<div class="box">
	<User />
</div>
<h3>On the big screen</h3>
<div class="box">
	<Demo />
</div>

<style>
	h3 {
		margin-top: 3rem;
	}
	.box {
		width: 100%;
		padding: 1rem;
		border: 3px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
