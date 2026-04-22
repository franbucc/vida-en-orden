import { supabase } from "./lib/supabase";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(200).json({
      sales: data || [],
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || "No se pudieron obtener las ventas",
    });
  }
}