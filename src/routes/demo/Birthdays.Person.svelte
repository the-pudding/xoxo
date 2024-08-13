<script>
	import { onMount } from "svelte";

	export let name;
	export let left;
	export let color;
	export let isMatch;

	const frameRate = 100;
	const walkDuration = 4000;

	let frame;
	let frameI = 0;
	let delay;
	const standingFrame = { x: 0, y: 0 };
	const matchFrame = { x: -32, y: 0 };
	const walkingFrames = [
		{ x: 0, y: -140 },
		{ x: -32, y: -140 },
		{ x: -64, y: -140 },
		{ x: -96, y: -140 }
	];

	let entered = false;

	onMount(() => {
		setTimeout(() => {
			entered = true;
		}, 100);

		delay = Math.random() * 500;

		const interval = setInterval(() => {
			frameI = (frameI + 1) % walkingFrames.length;
			frame = walkingFrames[frameI];
		}, frameRate);

		setTimeout(() => {
			clearInterval(interval);

			if (isMatch) frame = matchFrame;
			else frame = standingFrame;
		}, walkDuration + delay);
	});
</script>

<div
	class="group"
	class:entered
	style:left
	style={`--walk-dur: ${walkDuration}ms; --walk-delay: ${delay}ms;`}
>
	<div class="label">{name}</div>
	<div
		class="person"
		style={`background-position: ${frame ? frame.x : 0}px ${frame ? frame.y : 0}px;--img: url(/assets/demo/${color}.png)`}
	/>
</div>

<style>
	.group {
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translate(-100vw, 0);
		transition: transform var(--walk-dur) var(--walk-delay) ease-in-out;
	}
	.entered {
		transform: translate(0, 0);
	}
	.person {
		width: 32px; /* Half the original width of one sprite */
		height: 70px; /* Half the original height of one sprite */
		background-size: 128px 210px; /* Scale down the entire image by 50% */
		background-repeat: no-repeat;
		background-image: var(--img);
	}
	.label {
		font-size: 0.75rem;
	}
</style>
