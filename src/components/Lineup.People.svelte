<script>
	import Person from "$components//Lineup.Person.svelte";
	import { getContext } from "svelte";

	export let showMatches;
	export let walkDuration;

	const { data, xGet } = getContext("LayerCake");

	const colors = ["blue", "green", "purple", "red", "yellow"];
</script>

{#each $data as d, i (d.id + "-" + i)}
	{@const name = d.first_name}
	{@const left = $xGet(d) + "px"}
	{@const color = colors[i % colors.length]}
	{@const isMatch = showMatches && d.hasMatch}
	<Person {i} id={d.id} {name} {left} {color} {isMatch} {walkDuration} />
{/each}
