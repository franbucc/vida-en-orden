export default async function handler(req: any, res: any) {
  try {
    return res.status(200).json({
      hasSupabaseUrl: Boolean(process.env.SUPABASE_URL),
      hasSupabaseServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      nodeEnv: process.env.NODE_ENV || null,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || "Error desconocido",
    });
  }
}