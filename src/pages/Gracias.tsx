import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Gracias() {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!paymentId) return;

      try {
        const res = await fetch(
          `/api/verify-payment?payment_id=${paymentId}`
        );
        const data = await res.json();
        setPaymentData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [paymentId]);

  if (loading) {
    return <div className="p-10 text-center">Verificando pago...</div>;
  }

  if (!paymentData?.approved) {
    return (
      <div className="p-10 text-center text-red-500">
        Pago no aprobado.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f5f7] px-6 py-14">
      <div className="mx-auto max-w-[900px] rounded-[30px] bg-white p-8 shadow-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18bf74]">
          Pago confirmado
        </p>

        <h1 className="mt-3 text-5xl font-bold text-[#0f1728]">
          ¡Gracias por tu compra!
        </h1>

        <p className="mt-5 text-lg text-[#667085]">
          Tu pago fue aprobado correctamente.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          {paymentData.product_id === "vida-en-orden" && (
            <a
              href={`/api/download-file?payment_id=${paymentId}&file=main`}
              className="rounded-[18px] bg-[#18bf74] px-8 py-5 font-bold text-white"
            >
              Descargar Vida en Orden
            </a>
          )}

          {paymentData.product_id === "ebook-calma" && (
            <>
              <a
                href={`/api/download-file?payment_id=${paymentId}&file=main`}
                className="rounded-[18px] bg-[#18bf74] px-8 py-5 font-bold text-white"
              >
                Descargar Ebook PDF
              </a>

              <a
                href={`/api/download-file?payment_id=${paymentId}&file=bonus`}
                className="rounded-[18px] bg-[#0f1728] px-8 py-5 font-bold text-white"
              >
                Descargar Bonus ZIP
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}