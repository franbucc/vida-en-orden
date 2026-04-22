import { supabase } from "./lib/supabase";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const { path, referrer, sessionId } = req.body || {};

    const userAgent = req.headers["user-agent"] || null;

    const { error } = await supabase.from("visits").insert({
      path: path || "/",
      referrer: referrer || null,
      user_agent: userAgent,
      session_id: sessionId || null,
    });

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(200).json({
      ok: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message || "No se pudo registrar la visita",
    });
  }
}