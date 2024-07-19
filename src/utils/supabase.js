import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);



export const load = async () => {
	const { data } = await supabase.from("birthdays").select();
	return {
		birthdays: data ?? []
	};
};

export const insert = async ({ table, data }) => {
	const response = await supabase.from(table).insert(data);
	if (response.error) {
		console.log(response.error);
		throw new Error("insert failed");
	}
	return true;
};
