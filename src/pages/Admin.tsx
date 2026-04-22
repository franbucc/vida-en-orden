import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "Danienorden2026";

type Stats = {
  visits: number;
  sales: number;
  revenue: number;
  conversionRate: number;
};

type Sale = {
  id: number;
  created_at: string;
  payment_id: string;
  product_id: string;
  product_title: string;
  amount: number;
  currency: string;
  status: string;
  source: string;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [stats, setStats] = useState<Stats | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem("veo_admin_auth") === "true";
    setAuthorized(ok);
  }, []);

  useEffect(() => {
    if (!authorized) return;

    const load = async () => {
      try {
        setLoading(true);

        const [statsRes, salesRes] = await Promise.all([
          fetch("/api/admin-stats"),
          fetch("/api/admin-sales"),
        ]);

        const statsData = await statsRes.json();
        const salesData = await salesRes.json();

        if (statsRes.ok) {
          setStats(statsData);
        } else {
          console.error("Error admin-stats:", statsData);
        }

        if (salesRes.ok) {
          setSales(salesData.sales || []);
        } else {
          console.error("Error admin-sales:", salesData);
        }
      } catch (err) {
        console.error("Error cargando admin:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [authorized]);

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
    setStats(null);
    setSales([]);
  };

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-black/5 bg-white p-8 shadow-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18bf74]">
            Panel privado
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-[#0b132b]">
            Ingresar
          </h1>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mt-6 w-full rounded-2xl border border-gray-200 px-4 py-4 text-lg outline-none focus:border-black"
          />

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          <button className="mt-5 w-full rounded-2xl bg-black py-4 font-semibold text-white transition hover:opacity-90">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#efefef] px-5 py-10 font-['Montserrat',sans-serif] md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[#18bf74]">
              Panel de administración
            </p>
            <h1 className="mt-2 text-[2.4rem] font-extrabold tracking-[-0.05em] text-[#0f1728] md:text-[3.2rem]">
              Métricas de Vida en Orden
            </h1>
          </div>

          <button
            onClick={logout}
            className="rounded-2xl border border-[#d0d5dd] bg-white px-5 py-3 font-semibold text-[#0f1728]"
          >
            Salir
          </button>
        </div>

        {loading && (
          <p className="text-[1rem] text-[#667085]">Cargando estadísticas...</p>
        )}

        {!loading && stats && (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                <p className="text-[0.9rem] font-semibold uppercase text-[#667085]">
                  Visitas
                </p>
                <p className="mt-3 text-[2.3rem] font-extrabold text-[#0f1728]">
                  {stats.visits}
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                <p className="text-[0.9rem] font-semibold uppercase text-[#667085]">
                  Ventas
                </p>
                <p className="mt-3 text-[2.3rem] font-extrabold text-[#0f1728]">
                  {stats.sales}
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                <p className="text-[0.9rem] font-semibold uppercase text-[#667085]">
                  Facturación
                </p>
                <p className="mt-3 text-[2.3rem] font-extrabold text-[#18bf74]">
                  {formatCurrency(stats.revenue)}
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
                <p className="text-[0.9rem] font-semibold uppercase text-[#667085]">
                  Conversión
                </p>
                <p className="mt-3 text-[2.3rem] font-extrabold text-[#0f1728]">
                  {stats.conversionRate}%
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] md:p-8">
              <h2 className="text-[1.5rem] font-bold tracking-[-0.03em] text-[#0f1728]">
                Últimas ventas
              </h2>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-[0.85rem] uppercase text-[#667085]">
                        Fecha
                      </th>
                      <th className="px-4 py-3 text-left text-[0.85rem] uppercase text-[#667085]">
                        Producto
                      </th>
                      <th className="px-4 py-3 text-left text-[0.85rem] uppercase text-[#667085]">
                        Monto
                      </th>
                      <th className="px-4 py-3 text-left text-[0.85rem] uppercase text-[#667085]">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left text-[0.85rem] uppercase text-[#667085]">
                        Origen
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id} className="bg-[#f8f8f8]">
                        <td className="px-4 py-4 text-[#0f1728]">
                          {new Date(sale.created_at).toLocaleString("es-AR")}
                        </td>
                        <td className="px-4 py-4 text-[#0f1728]">
                          {sale.product_title}
                        </td>
                        <td className="px-4 py-4 font-semibold text-[#18bf74]">
                          {formatCurrency(Number(sale.amount))}
                        </td>
                        <td className="px-4 py-4 text-[#0f1728]">
                          {sale.status}
                        </td>
                        <td className="px-4 py-4 text-[#0f1728]">
                          {sale.source || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {sales.length === 0 && (
                  <p className="mt-4 text-[#667085]">Todavía no hay ventas.</p>
                )}
              </div>
            </div>
          </>
        )}

        {!loading && !stats && (
          <p className="text-[1rem] text-[#dc2626]">
            No se pudieron cargar las estadísticas.
          </p>
        )}
      </div>
    </section>
  );
}