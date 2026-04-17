import { useState } from "react";
import emailjs from "@emailjs/browser";

function Gracias() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const pdfUrl = "/vida-en-orden.pdf";

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Ingresá tu email para recibir el producto.");
      return;
    }

    try {
      setSending(true);

      await emailjs.send(
        "service_d566ldb",
        "template_mrhwduo",
        {
          user_email: email,
          product_name: "Vida en Orden",
          download_link: `${window.location.origin}${pdfUrl}`,
        },
        "D1cmLoQVin-KTX9lW"
      );

      setSent(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar el email. Probá nuevamente.");
    } finally {
      setSending(false);
    }
  };

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
            Ya podés descargar tu plantilla digital <strong>Vida en Orden</strong>
            . Además, si querés, te la enviamos también por email para que la
            tengas guardada.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={pdfUrl}
            download
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
            Ingresá tu correo y te mandamos el acceso directo al producto.
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
              {sending ? "Enviando..." : "Enviar acceso"}
            </button>
          </form>

          {sent && (
            <p className="mt-4 text-[0.98rem] font-medium text-[#18bf74]">
              Listo. Te enviamos el acceso a tu email.
            </p>
          )}

          {error && (
            <p className="mt-4 text-[0.98rem] font-medium text-[#dc2626]">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gracias;