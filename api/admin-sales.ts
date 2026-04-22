import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Falta SUPABASE_URL");
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const supabase = getSupabase();

    const result = await supabase
      .from("sales")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (result.error) {
      return res.status(500).json({
        error: "Error leyendo sales",
        detail: result.error.message,
      });
    }

    return res.status(200).json({
      sales: result.data || [],
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Fallo interno en admin-sales",
      detail: error?.message || "Error desconocido",
    });
  }
}