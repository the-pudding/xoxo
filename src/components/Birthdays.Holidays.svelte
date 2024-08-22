<script>
	import People from "$components/Birthdays.People.svelte";

	export let birthdays;

	$: christmas = birthdays.filter(({ birthday }) => birthday === "2024-12-25");

	$: halloween = birthdays.filter(({ birthday }) => birthday === "2024-10-31");

	$: newyears = birthdays.filter(({ birthday }) => birthday === "2024-01-01");

	$: vday = birthdays.filter(({ birthday }) => birthday === "2024-02-14");
</script>

<h2 class="title">Holiday babies</h2>
<div id="holidays">
	{#if newyears.length > 0}
		<div class="holiday" id="newyears">
			<h3>
				🪩 <strong>{newyears.length}</strong> <strong>New Year&rsquo;s</strong>
				{newyears.length == 1 ? "baby" : "babies"}
			</h3>
			<div class="people-wrapper">
				<People birthdays={newyears} />
			</div>
		</div>
	{/if}

	{#if vday.length > 0}
		<div class="holiday" id="vday">
			<h3>
				💘 <strong>{vday.length}</strong> <strong>Valentine&rsquo;s Day</strong>
				{vday.length == 1 ? "baby" : "babies"}
			</h3>
			<div class="people-wrapper">
				<People birthdays={vday} />
			</div>
		</div>
	{/if}

	{#if halloween.length > 0}
		<div class="holiday" id="halloween">
			<h3>
				🎃 <strong>{halloween.length}</strong> <strong>Halloween</strong>
				{halloween.length == 1 ? "baby" : "babies"}
			</h3>
			<div class="people-wrapper">
				<People birthdays={halloween} />
			</div>
		</div>
	{/if}

	{#if christmas.length > 0}
		<div class="holiday" id="christmas">
			<h3>
				🎄 <strong>{christmas.length}</strong> <strong>Christmas</strong>
				{christmas.length == 1 ? "baby" : "babies"}
			</h3>
			<div class="people-wrapper">
				<People birthdays={christmas} />
			</div>
		</div>
	{/if}
</div>

<style>
	#holidays {
		display: flex;
		justify-content: space-evenly;
	}

	h2 {
		font-weight: bold;
		text-align: center;
	}

	h3 {
		padding: 0 20px;
		text-align: center;
	}

	.holiday {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
