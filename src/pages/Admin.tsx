import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "Danienorden2026";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ok = localStorage.getItem("veo_admin_auth") === "true";
    setAuthorized(ok);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("veo_admin_auth", "true");
      setAuthorized(true);
      setError("");
      return;
    }
    setError("Contraseña incorrecta");
  };

  const logout = () => {
    localStorage.removeItem("veo_admin_auth");
    setAuthorized(false);
    setPassword("");
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18bf74]">Panel privado</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-[#0b132b]">Ingresar</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mt-6 w-full rounded-2xl border border-gray-200 px-4 py-4 text-lg outline-none focus:border-black"
          />
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <button className="mt-5 w-full rounded-2xl bg-black py-4 text-white font-semibold hover:opacity-90 transition">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18bf74]">Panel de administración</p>
            <h1 className="text-5xl font-bold tracking-[-0.04em] text-[#0b132b] mt-2">Métricas de Vida en Orden</h1>
          </div>
          <button onClick={logout} className="rounded-2xl border px-5 py-3 font-semibold">Salir</button>
        </div>
        {/* Pegá acá tu dashboard actual de visitas / ventas / facturación */}
      </div>
    </div>
  );
}
