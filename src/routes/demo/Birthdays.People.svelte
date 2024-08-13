<script>
	import Person from "$routes/demo/Birthdays.Person.svelte";
	import { getContext } from "svelte";

	export let showMatches;

	const { data, xGet } = getContext("LayerCake");

	const colors = ["blue", "green", "purple", "red", "yellow"];
</script>

{#each $data as d, i (d.id + "-" + i)}
	{@const name = d.first_name}
	{@const left = $xGet(d) + "px"}
	{@const color = colors[i % colors.length]}
	{@const isMatch = showMatches && d.hasMatch}
	<Person {name} {left} {color} {isMatch} />
{/each}
