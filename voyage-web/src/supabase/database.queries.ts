import { QueryData } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

const voyagesQuery = supabase.from("voyages").select();
type Voyages = QueryData<typeof voyagesQuery>

export { voyagesQuery, type Voyages };

