import { supabase } from "./lib/supabase";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const { count: visitsCount, error: visitsError } = await supabase
      .from("visits")
      .select("*", { count: "exact", head: true });

    const { data: salesRows, error: salesError } = await supabase
      .from("sales")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (visitsError) {
      return res.status(500).json({
        error: visitsError.message,
      });
    }

    if (salesError) {
      return res.status(500).json({
        error: salesError.message,
      });
    }

    const sales = salesRows ?? [];
    const approvedSales = sales.length;

    const revenue = sales.reduce((acc, sale) => {
      return acc + Number(sale.amount || 0);
    }, 0);

    const conversionRate =
      visitsCount && visitsCount > 0
        ? Number(((approvedSales / visitsCount) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      visits: visitsCount || 0,
      sales: approvedSales,
      revenue,
      conversionRate,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || "No se pudieron obtener estadísticas",
    });
  }
}