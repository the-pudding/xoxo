<script>
	import People from "$components/Birthdays.People.svelte";

	export let birthdays;

	$: christmas = birthdays.filter(({ birthday }) => birthday === "2024-12-25");

	$: halloween = birthdays.filter(({ birthday }) => birthday === "2024-10-31");

	$: newyears = birthdays.filter(({ birthday }) => birthday === "2024-01-01");

	$: vday = birthdays.filter(({ birthday }) => birthday === "2024-02-14");
</script>

<div class="title">Holiday babies</div>
<div id="holidays">
	{#if newyears.length > 0}
		<div class="holiday" id="newyears">
			<h2>
				🪩 <strong>{newyears.length}</strong> <strong>New Year&rsquo;s</strong>
				{newyears.length == 1 ? "baby" : "babies"}
			</h2>
			<div class="people-wrapper">
				<People birthdays={newyears} />
			</div>
		</div>
	{/if}

	{#if vday.length > 0}
		<div class="holiday" id="vday">
			<h2>
				💘 <strong>{vday.length}</strong> <strong>Valentine&rsquo;s Day</strong>
				{vday.length == 1 ? "baby" : "babies"}
			</h2>
			<div class="people-wrapper">
				<People birthdays={vday} />
			</div>
		</div>
	{/if}

	{#if halloween.length > 0}
		<div class="holiday" id="halloween">
			<h2>
				🎃 <strong>{halloween.length}</strong> <strong>Halloween</strong>
				{halloween.length == 1 ? "baby" : "babies"}
			</h2>
			<div class="people-wrapper">
				<People birthdays={halloween} />
			</div>
		</div>
	{/if}

	{#if christmas.length > 0}
		<div class="holiday" id="christmas">
			<h2>
				🎄 <strong>{christmas.length}</strong> <strong>Christmas</strong>
				{christmas.length == 1 ? "baby" : "babies"}
			</h2>
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

	.title {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
	}

	.holiday h2 {
		font-size: 20px;
		padding: 0 20px;
		text-align: center;
	}

	.holiday {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
