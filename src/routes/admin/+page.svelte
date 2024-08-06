<script>
	import Demo from "$routes/demo/+page.svelte";
	import User from "$components/Index.svelte";
	import Toggle from "$components/helpers/Toggle.svelte";
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	import { load, update } from "$utils/supabase.js";
	import { onMount } from "svelte";

	let userView;
	let showResults;

	const viewOptions = [
		{ label: "Gather votes", value: "guesses" },
		{ label: "Gather birthdays", value: "birthdays" },
		{ label: "Simulations", value: "simulation" }
	];
	const toggleOptions = [
		{ value: true, text: "on" },
		{ value: false, text: "off" }
	];

	const updateUserView = async () => {
		if (!userView) return;
		await update({
			table: "view",
			column: "user_view",
			value: userView
		});

		showResults = false;
		await update({
			table: "view",
			column: "show_results",
			value: false
		});
	};
	const updateShowResults = async () => {
		await update({
			table: "view",
			column: "show_results",
			value: showResults
		});
	};
	$: userView, updateUserView();
	$: showResults, updateShowResults();

	onMount(async () => {
		const view = await load({ table: "view" });
		userView = view[0]?.user_view;
		showResults = view[0]?.show_results;
	});
</script>

<ButtonSet
	legend={"Set User View"}
	options={viewOptions}
	bind:value={userView}
/>
<Toggle
	label="Show results"
	style="inner"
	options={toggleOptions}
	bind:value={showResults}
/>

<hr />

<h3>On people's phones</h3>
<div class="box">
	<User />
</div>
<h3>On the big screen</h3>
<div class="box">
	<Demo />
</div>

<style>
	.box {
		width: 100%;
		padding: 1rem;
		border: 3px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3rem;
	}
	hr {
		width: 100%;
		border: 1px solid var(--color-gray-400);
		margin: 5rem 0;
	}
</style>
