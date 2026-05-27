import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function Gracias() {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  // Evita disparar Purchase más de una vez
  const purchaseTracked = useRef(false);
  const emailSent = useRef(false);

  useEffect(() => {
    async function load() {
      if (!paymentId) {
        setLoading(false);
        return;
      }

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

  // Evento Purchase del Pixel
  useEffect(() => {
    if (
      paymentData?.approved &&
      paymentData?.product_id &&
      !purchaseTracked.current &&
      typeof window.fbq === "function"
    ) {
      const value =
        Number(paymentData.amount) ||
        Number(paymentData.transaction_amount) ||
        0;

      window.fbq("track", "Purchase", {
        content_ids: [paymentData.product_id],
        content_name: paymentData.product_name || paymentData.product_id,
        content_type: "product",
        currency: "ARS",
        value,
        num_items: 1,
      });

      purchaseTracked.current = true;
      console.log("Pixel Purchase enviado");
    }
  }, [paymentData]);

  // Enviar email automático con los archivos
useEffect(() => {
  async function sendPdfEmail() {
    if (!paymentData?.approved || !paymentId || emailSent.current) return;

    try {
      const res = await fetch("/api/send-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error enviando email:", data);
        return;
      }

      emailSent.current = true;
      console.log("Email enviado correctamente");
    } catch (error) {
      console.error("Error enviando email:", error);
    }
  }

  sendPdfEmail();
}, [paymentData, paymentId]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Verificando pago...
      </div>
    );
  }

  if (!paymentData?.approved) {
    return (
      <div className="p-10 text-center text-red-500 text-lg font-semibold">
        Pago no aprobado.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f5f5f7] px-6 py-14">
      <div className="mx-auto max-w-[900px] rounded-[30px] bg-white p-8 text-center shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#18bf74]">
          Pago confirmado
        </p>

        <h1 className="mt-3 text-5xl font-bold text-[#0f1728]">
          ¡Gracias por tu compra!
        </h1>

        <p className="mt-5 text-lg text-[#667085]">
  Tu pago fue aprobado correctamente.
</p>

<p className="mt-3 text-[0.95rem] text-[#98a2b3]">
  También te enviamos el acceso a tu email. Si no lo encontrás,
  revisá la carpeta de <span className="font-medium text-[#0f1728]">spam o promociones</span>.
</p>

        <div className="mt-10 flex flex-col items-center gap-4">
          {paymentData.product_id === "vida-en-orden" && (
            <a
              href={`/api/download-file?payment_id=${paymentId}&file=main`}
              className="rounded-[18px] bg-[#18bf74] px-8 py-5 font-bold text-white transition hover:opacity-90"
            >
              Descargar Vida en Orden
            </a>
          )}

          {paymentData.product_id === "ebook-calma" && (
            <>
              <a
                href={`/api/download-file?payment_id=${paymentId}&file=main`}
                className="rounded-[18px] bg-[#18bf74] px-8 py-5 font-bold text-white transition hover:opacity-90"
              >
                Descargar Ebook PDF
              </a>

              <a
                href={`/api/download-file?payment_id=${paymentId}&file=bonus`}
                className="rounded-[18px] bg-[#0f1728] px-8 py-5 font-bold text-white transition hover:opacity-90"
              >
                Descargar Bonus ZIP
              </a>
            </>
          )}

          {paymentData.product_id === "ebook-amor-propio" && (
  <a
    href={`/api/download-file?payment_id=${paymentId}&file=main`}
    className="rounded-[18px] bg-[#18bf74] px-8 py-5 font-bold text-white transition hover:opacity-90"
  >
    Descargar Ebook Amor Propio
  </a>
)}
        </div>

        {/* WHATSAPP SOPORTE */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-[1rem] text-[#667085]">
            Ante cualquier imprevisto o inconveniente con tu compra,
            comunicate con nosotros por WhatsApp.
          </p>

          <a
            href="https://wa.me/5491124716725?text=Hola,%20tuve%20un%20inconveniente%20con%20mi%20compra."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-[18px] bg-[#25D366] px-8 py-5 font-bold text-white transition hover:opacity-90"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}