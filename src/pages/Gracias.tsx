import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Gracias() {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");

  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      if (!paymentId) return;

      try {
        const res = await fetch(`/api/verify-payment?payment_id=${paymentId}`);
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

  const sendFiles = async () => {
    if (!email) {
      setMessage("Ingresá tu email.");
      return;
    }

    try {
      setSending(true);
      setMessage("");

      const res = await fetch("/api/send-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_id: paymentId,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "No se pudo enviar.");
        return;
      }

      setSent(true);
      setMessage("¡Te enviamos los archivos a tu email!");
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error.");
    } finally {
      setSending(false);
    }
  };

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

        {/* DESCARGA DIRECTA */}
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

        {/* EMAIL */}
        <div className="mt-12 border-t pt-10">
          <h2 className="text-2xl font-bold text-[#0f1728]">
            Recibilo también por email
          </h2>

          <p className="mt-3 text-[#667085]">
            Dejanos tu correo y te enviamos los archivos automáticamente.
          </p>

          <div className="mx-auto mt-6 flex max-w-[520px] flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="tuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[58px] flex-1 rounded-[16px] border border-gray-200 px-4 outline-none focus:border-black"
            />

            <button
              onClick={sendFiles}
              disabled={sending || sent}
              className="h-[58px] rounded-[16px] bg-[#18bf74] px-6 font-bold text-white disabled:opacity-60"
            >
              {sending ? "Enviando..." : sent ? "Enviado ✔" : "Enviar"}
            </button>
          </div>

          {message && (
            <p className="mt-4 text-sm text-[#0f1728]">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}