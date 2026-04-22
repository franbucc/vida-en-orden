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

    const visitsResult = await supabase
      .from("visits")
      .select("*", { count: "exact", head: true });

    if (visitsResult.error) {
      return res.status(500).json({
        error: "Error leyendo visits",
        detail: visitsResult.error.message,
      });
    }

    const salesResult = await supabase
      .from("sales")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (salesResult.error) {
      return res.status(500).json({
        error: "Error leyendo sales",
        detail: salesResult.error.message,
      });
    }

    const visitsCount = visitsResult.count || 0;
    const sales = salesResult.data ?? [];
    const approvedSales = sales.length;

    const revenue = sales.reduce((acc, sale) => {
      return acc + Number(sale.amount || 0);
    }, 0);

    const conversionRate =
      visitsCount > 0
        ? Number(((approvedSales / visitsCount) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      visits: visitsCount,
      sales: approvedSales,
      revenue,
      conversionRate,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Fallo interno en admin-stats",
      detail: error?.message || "Error desconocido",
    });
  }
}