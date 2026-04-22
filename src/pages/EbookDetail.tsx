import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEbookBySlug } from "../lib/ebooks";
import { startCheckout } from "../lib/checkout";

function formatCurrency(value: number, currency: "ARS") {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function EbookDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const ebook = useMemo(() => getEbookBySlug(slug || ""), [slug]);

  const handleCheckout = async () => {
    if (!ebook) return;

    try {
      await startCheckout(ebook.productId as any, "ebook_detail");
    } catch (error) {
      console.error(error);
      alert("No se pudo iniciar la compra.");
    }
  };

  if (!ebook) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-5 py-16 font-['Montserrat',sans-serif]">
        <div className="text-center">
          <h1 className="text-[2.2rem] font-bold tracking-[-0.04em] text-[#0f1728]">
            Ebook no encontrado
          </h1>

          <button
            onClick={() => navigate("/ebooks")}
            className="mt-6 rounded-[18px] bg-[#0f1728] px-6 py-4 font-bold uppercase tracking-[0.03em] text-white"
          >
            Volver a ebooks
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f5f7] px-5 py-14 font-['Montserrat',sans-serif] md:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-[1240px]">
        <button
          onClick={() => navigate("/ebooks")}
          className="mb-8 text-[0.95rem] font-semibold text-[#0f1728] underline underline-offset-4"
        >
          Volver a la biblioteca
        </button>

        <div className="grid gap-10 lg:grid-cols-[520px_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[30px] border border-[#e5e7eb] bg-white shadow-[0_16px_45px_rgba(0,0,0,0.05)]">
            <img
              src={ebook.cover}
              alt={ebook.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[#18bf74]">
              Ebook digital
            </p>

            <h1 className="mt-3 text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.06em] text-[#0f1728] sm:text-[3.4rem] md:text-[4.3rem]">
              {ebook.title}
            </h1>

            <p className="mt-5 max-w-[720px] text-[1.05rem] leading-[1.8] text-[#667085] md:text-[1.12rem]">
              {ebook.longDescription}
            </p>

            <div className="mt-8 rounded-[26px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
              <p className="text-[1rem] font-semibold uppercase tracking-[0.06em] text-[#667085]">
                Incluye
              </p>

              <ul className="mt-4 space-y-3">
                {ebook.benefits.map((item) => (
                  <li
                    key={item}
                    className="text-[1rem] leading-[1.7] text-[#0f1728]"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-end gap-4">
              {ebook.oldPrice && (
                <span className="text-[1.2rem] font-semibold text-[#98a2b3] line-through">
                  {formatCurrency(ebook.oldPrice, ebook.currency)}
                </span>
              )}

              <span className="text-[2.5rem] font-extrabold tracking-[-0.05em] text-[#18bf74] md:text-[3.2rem]">
                {formatCurrency(ebook.price, ebook.currency)}
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleCheckout}
                className="inline-flex items-center justify-center rounded-[18px] bg-gradient-to-r from-[#18b97a] to-[#21d19a] px-8 py-5 text-center text-[1rem] font-extrabold uppercase tracking-[0.03em] text-white shadow-[0_16px_35px_rgba(24,191,116,0.22)] transition hover:scale-[1.01]"
              >
                Comprar ahora
              </button>

              <button
                onClick={() => navigate("/ebooks")}
                className="inline-flex items-center justify-center rounded-[18px] border border-[#d0d5dd] bg-white px-8 py-5 text-center text-[1rem] font-bold uppercase tracking-[0.03em] text-[#0f1728]"
              >
                Ver otros ebooks
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EbookDetail;