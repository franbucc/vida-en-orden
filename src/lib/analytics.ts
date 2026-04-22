function getSessionId() {
  const key = "veo_session_id";
  const existing = sessionStorage.getItem(key);

  if (existing) return existing;

  const newId = crypto.randomUUID();
  sessionStorage.setItem(key, newId);
  return newId;
}

export async function trackVisit(path: string) {
  try {
    await fetch("/api/track-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null,
        sessionId: getSessionId(),
      }),
    });
  } catch (error) {
    console.error("Error registrando visita", error);
  }
}