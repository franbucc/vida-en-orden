import { useEffect, useState } from "react";

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

function Admin() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, salesRes] = await Promise.all([
          fetch("/api/admin-stats"),
          fetch("/api/admin-sales"),
        ]);

        const statsData = await statsRes.json();
        const salesData = await salesRes.json();

        if (statsRes.ok) {
          setStats(statsData);
        }

        if (salesRes.ok) {
          setSales(salesData.sales || []);
        }
      } catch (error) {
        console.error("Error cargando admin:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="min-h-screen bg-[#efefef] px-5 py-10 font-['Montserrat',sans-serif] md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <p className="text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[#18bf74]">
            Panel de administración
          </p>
          <h1 className="mt-2 text-[2.4rem] font-extrabold tracking-[-0.05em] text-[#0f1728] md:text-[3.2rem]">
            Métricas de Vida en Orden
          </h1>
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

export default Admin;