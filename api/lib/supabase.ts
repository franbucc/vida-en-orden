import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Falta SUPABASE_URL en variables de entorno");
}

if (!supabaseServiceRoleKey) {
  throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en variables de entorno");
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);