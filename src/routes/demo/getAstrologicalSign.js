export const signs = [
	{
		name: "Capricorn",
		start: { month: 12, day: 22 },
		end: { month: 1, day: 19 },
		i: 0
	},
	{
		name: "Aquarius",
		start: { month: 1, day: 20 },
		end: { month: 2, day: 18 },
		i: 1
	},
	{
		name: "Pisces",
		start: { month: 2, day: 19 },
		end: { month: 3, day: 20 },
		i: 2
	},
	{
		name: "Aries",
		start: { month: 3, day: 21 },
		end: { month: 4, day: 19 },
		i: 3
	},
	{
		name: "Taurus",
		start: { month: 4, day: 20 },
		end: { month: 5, day: 20 },
		i: 4
	},
	{
		name: "Gemini",
		start: { month: 5, day: 21 },
		end: { month: 6, day: 20 },
		i: 5
	},
	{
		name: "Cancer",
		start: { month: 6, day: 21 },
		end: { month: 7, day: 22 },
		i: 6
	},
	{
		name: "Leo",
		start: { month: 7, day: 23 },
		end: { month: 8, day: 22 },
		i: 7
	},
	{
		name: "Virgo",
		start: { month: 8, day: 23 },
		end: { month: 9, day: 22 },
		i: 8
	},
	{
		name: "Libra",
		start: { month: 9, day: 23 },
		end: { month: 10, day: 22 },
		i: 9
	},
	{
		name: "Scorpio",
		start: { month: 10, day: 23 },
		end: { month: 11, day: 21 },
		i: 10
	},
	{
		name: "Sagittarius",
		start: { month: 11, day: 22 },
		end: { month: 12, day: 21 },
		i: 11
	}
];

export const dateToSign = (dateStr) => {
	const date = new Date(dateStr);
	const month = date.getUTCMonth() + 1; // getUTCMonth is zero-based
	const day = date.getUTCDate();

	for (let sign of signs) {
		if (
			(month === sign.start.month && day >= sign.start.day) ||
			(month === sign.end.month && day <= sign.end.day) ||
			(month > sign.start.month && month < sign.end.month)
		) {
			return { name: sign.name, i: sign.i };
		}
	}

	// Special case for Capricorn, which spans the end of one year and the start of the next
	return { name: "Capricorn", i: 0 };
};
