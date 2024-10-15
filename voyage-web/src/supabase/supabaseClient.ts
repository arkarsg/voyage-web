import { Database } from "@/supabase/database.types"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_PROJECT_URL
const supabaseAnonKey = import.meta.env.VITE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)