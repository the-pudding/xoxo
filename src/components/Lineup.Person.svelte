<script>
	import { onMount } from "svelte";
	import { base } from "$app/paths";

	export let i;
	export let id;
	export let name;
	export let left;
	export let color;
	export let isMatch;
	export let walkDuration;

	const frameRate = 100;

	let frame;
	let frameI = 0;
	let delay = 0;
	const standingFrame = { x: 0, y: 0 };
	const matchFrame = { x: -32, y: 0 };
	const walkingFrames = [
		{ x: 0, y: -140 },
		{ x: -32, y: -140 },
		{ x: -64, y: -140 },
		{ x: -96, y: -140 }
	];

	let entered = false;
	let done = false;

	onMount(() => {
		frame = standingFrame;
		setTimeout(() => {
			entered = true;
		}, 100);

		if (walkDuration === 5000) {
			delay = Math.random() * 850;
		} else if (walkDuration === 10000) {
			delay = Math.random() * 6000;
		}

		const interval = setInterval(() => {
			frameI = (frameI + 1) % walkingFrames.length;
			frame = walkingFrames[frameI];
		}, frameRate);

		setTimeout(() => {
			clearInterval(interval);

			if (isMatch) frame = matchFrame;
			else frame = standingFrame;

			done = true;
		}, walkDuration + delay);
	});
</script>

<div
	class="group"
	class:entered
	class:done
	class:fade={done && !isMatch}
	style={`--left: ${left}; --walk-dur: ${walkDuration}ms; --walk-delay: ${delay}ms;`}
>
	<div class="label">{name}</div>
	<div
		class="person"
		style={`background-position: ${frame ? frame.x : 0}px ${frame ? frame.y : 0}px;--img: url(${base}/assets/demo/${color}.png)`}
	/>
</div>

<style>
	.group {
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		left: -100px;
		transform: translate(-16px, 0);
		transition:
			left var(--walk-dur) var(--walk-delay) ease-in-out,
			opacity 0.5s;
	}
	.entered {
		left: var(--left);
	}
	.fade {
		opacity: 0.1;
	}
	.done .label {
		opacity: 0;
	}
	.person {
		width: 32px; /* Half the original width of one sprite */
		height: 70px; /* Half the original height of one sprite */
		background-size: 128px 210px; /* Scale down the entire image by 50% */
		background-repeat: no-repeat;
		background-image: var(--img);
	}
	.label {
		transition: opacity 0.5s;
		font-size: 0.75rem;
	}
</style>
