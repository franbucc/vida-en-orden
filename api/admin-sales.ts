import { getSupabase } from "./lib/supabase";

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