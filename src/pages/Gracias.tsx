import { useEffect, useMemo, useRef, useState } from "react";

function Gracias() {
  const [email, setEmail] = useState("");
  const [checkingPayment, setCheckingPayment] = useState(true);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const purchaseTracked = useRef(false);

  const paymentId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("payment_id");
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setError("");

        if (!paymentId) {
          setError("No encontramos el identificador del pago.");
          return;
        }

        const response = await fetch(
          `/api/verify-payment?payment_id=${encodeURIComponent(paymentId)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "No se pudo verificar el pago");
        }

        setPaymentStatus(data.status || "");

        if (data.approved) {
          setPaymentApproved(true);

          await fetch("/api/record-sale", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payment_id: data.payment_id,
              product_id: data.product_id,
              product_title: data.product_title,
              amount: data.value,
              currency: data.currency,
              status: data.status,
              source: data.source,
              external_reference: data.external_reference,
            }),
          });

          if (
            typeof window !== "undefined" &&
            (window as any).fbq &&
            !purchaseTracked.current
          ) {
            (window as any).fbq("track", "Purchase", {
              value: data.value || 18900,
              currency: data.currency || "ARS",
              content_ids: [data.product_id || "vida-en-orden"],
              content_type: "product",
            });

            purchaseTracked.current = true;
          }
        }
      } catch (err: any) {
        setError(err?.message || "No pudimos validar tu pago.");
      } finally {
        setCheckingPayment(false);
      }
    };

    verifyPayment();
  }, [paymentId]);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSent(false);

    if (!paymentApproved) {
      setError("Tu pago todavía no está aprobado.");
      return;
    }

    if (!email) {
      setError("Ingresá tu email para recibir el producto.");
      return;
    }

    try {
      setSending(true);

      const response = await fetch("/api/send-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "No se pudo enviar el email");
      }

      setSent(true);
      setEmail("");
    } catch (err: any) {
      setError(err?.message || "No se pudo enviar el email.");
    } finally {
      setSending(false);
    }
  };

  const downloadUrl = paymentId
    ? `/api/download-pdf?payment_id=${encodeURIComponent(paymentId)}`
    : "#";

  return (
    <section className="w-full bg-[#efefef] px-5 py-16 font-['Montserrat',sans-serif] md:px-8 md:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[900px] rounded-[28px] border border-[#dce9e3] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] md:p-12">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#18bf74] text-[2rem] font-bold text-white shadow-[0_12px_30px_rgba(24,191,116,0.25)]">
            ✓
          </div>

          <p className="mb-3 text-[1rem] font-semibold uppercase tracking-[0.04em] text-[#18bf74]">
            COMPRA EXITOSA
          </p>

          <h1 className="mb-4 text-[2.4rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#0f1728] sm:text-[3rem] md:text-[4rem]">
            ¡Gracias por tu compra!
          </h1>

          <p className="mx-auto max-w-[680px] text-[1.05rem] leading-[1.7] text-[#667085] md:text-[1.15rem]">
            Estamos verificando tu pago para habilitar el acceso a tu producto
            digital.
          </p>
        </div>

        {checkingPayment && (
          <p className="mt-10 text-center text-[#667085]">
            Verificando pago...
          </p>
        )}

        {!checkingPayment && paymentApproved && (
          <>
            <div className="mt-10 flex justify-center">
              <a
                href={downloadUrl}
                className="inline-flex items-center justify-center rounded-[18px] bg-gradient-to-r from-[#18b97a] to-[#21d19a] px-8 py-5 text-center text-[1.05rem] font-extrabold uppercase tracking-[-0.02em] text-white shadow-[0_15px_35px_rgba(24,191,116,0.22)] transition hover:scale-[1.02]"
              >
                Descargar PDF
              </a>
            </div>

            <div className="mt-12 rounded-[24px] border border-[#e5ece8] bg-[#f8f8f8] p-6 md:p-8">
              <h2 className="mb-3 text-[1.5rem] font-bold tracking-[-0.03em] text-[#0f1728]">
                Recibir también por email
              </h2>

              <p className="mb-6 text-[1rem] leading-[1.7] text-[#667085]">
                Ingresá tu correo y te mandamos el PDF adjunto.
              </p>

              <form
                onSubmit={handleSendEmail}
                className="flex flex-col gap-4 md:flex-row"
              >
                <input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[58px] flex-1 rounded-[16px] border border-[#d7e2dc] bg-white px-5 text-[1rem] text-[#0f1728] outline-none transition focus:border-[#18bf74]"
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="h-[58px] rounded-[16px] bg-[#0f1728] px-6 text-[0.98rem] font-bold uppercase tracking-[0.02em] text-white transition hover:bg-[#1a2438] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Enviando..." : "Enviar PDF"}
                </button>
              </form>

              {sent && (
                <p className="mt-4 text-[0.98rem] font-medium text-[#18bf74]">
                  Listo. Te enviamos el PDF a tu email.
                </p>
              )}
            </div>
          </>
        )}

        {!checkingPayment && !paymentApproved && !error && (
          <p className="mt-10 text-center text-[#667085]">
            Estado actual del pago: {paymentStatus || "desconocido"}.
          </p>
        )}

        {error && (
          <p className="mt-8 text-center text-[0.98rem] font-medium text-[#dc2626]">
            {error}
          </p>
        )}

        <div className="mt-10 text-center">
          <a
            href="/"
            className="text-[0.95rem] font-semibold text-[#0f1728] underline underline-offset-4"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </section>
  );
}

export default Gracias;