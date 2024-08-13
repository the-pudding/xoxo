<script>
	import { getContext } from "svelte";

	const { data, xGet, yScale, width } = getContext("LayerCake");

	const colors = ["blue", "green", "purple", "red", "yellow"];
</script>

{#each $data as d, i}
	{@const left = $xGet(d) + "px"}
	<div class="group" style:left>
		<div class="label">{d.first_name}</div>
		<div
			class="person"
			style={`--img: url(/assets/demo/${colors[i % colors.length]}.png)`}
		/>
	</div>
{/each}

<style>
	.group {
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.person {
		width: 32px; /* Half the original width of one sprite */
		height: 70px; /* Half the original height of one sprite */
		background-size: 128px 210px; /* Scale down the entire image by 50% */
		background-position: 0 0; /* Top left corner of the image (first sprite) */
		background-repeat: no-repeat;
		background-image: var(--img);
	}
	.label {
		font-size: 0.75rem;
	}
</style>
