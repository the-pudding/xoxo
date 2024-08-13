<script>
	import Histogram from "$routes/demo/Birthdays.Histogram.svelte";
	import { onMount } from "svelte";
	import { createClient } from "@supabase/supabase-js";
	import { load } from "$utils/supabase.js";
	import { timeFormat, timeParse } from "d3-time-format";
	import _ from "lodash";

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	let birthdays = [];

	const handleBirthdayInsert = (payload) => {
		if (payload.eventType === "INSERT") {
			birthdays = [...birthdays, payload.new];
		}
	};

	const startDate = new Date(1990, 0, 1);
	const formatDate = (d) => timeFormat("%b %d")(d);
	const dateTicks = [startDate, new Date(1990, 6, 2), new Date(1990, 11, 31)];

	const allDates = Array.from({ length: 366 }, (_, i) => {
		const date = new Date(startDate);
		date.setDate(startDate.getDate() + i);
		return date;
	});

	onMount(async () => {
		birthdays = await load({ table: "birthdays" });
		supabase
			.channel("birthdays")
			.on(
				"postgres_changes",
				{ event: "INSERT", schema: "public", table: "birthdays" },
				handleBirthdayInsert
			)
			.subscribe();
	});
</script>

<!-- <Histogram
	title={"XOXO 2024's birthdays"}
	subtitle={"Sorted by astrological sign"}
	data={birthdays}
	xKey={(d) => d.astrologicalSign.i}
	xDomain={_.range(0, 11)}
	xTicks={_.range(0, 11)}
	showMatches={false}
/> -->

<Histogram
	title={"XOXO 2024's birthdays"}
	subtitle={"Will there be a birthday match?"}
	data={birthdays}
	xKey={"birthday"}
	xDomain={allDates}
	xTicks={dateTicks}
	formatTick={(d) => formatDate(d)}
	showMatches={true}
/>
