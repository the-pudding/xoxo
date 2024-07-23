import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const load = async ({ table }) => {
	const { data } = await supabase.from(table).select();
	return data ?? [];
};

export const insert = async ({ table, data }) => {
	const response = await supabase.from(table).insert(data);
	if (response.error) {
		console.log(response.error);
		throw new Error("insert failed");
	}
	return true;
};

export const update = async ({ table, column, value, id }) => {
	console.log({ table, column, value });
	const response = await supabase
		.from(table)
		.update({ [column]: value })
		.eq("id", 1)
		.select();

	console.log({ response });

	if (response.error) {
		console.log(response.error);
		throw new Error("update failed");
	} else if (response.data) return response.data;
	return undefined;
};
