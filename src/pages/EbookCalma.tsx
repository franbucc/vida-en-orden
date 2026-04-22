import { useEffect, useState } from "react";
import { startCheckout } from "../lib/checkout";

const imagesTop = [
  "/calma-imagen-2.webp",
  "/calma-imagen-3.webp",
  "/calma-imagen-4.webp",
];

const imagesBottom = [
  "/calma-imagen-5.webp",
  "/calma-imagen-6.webp",
  "/calma-imagen-7.webp",
  "/calma-imagen-8.webp",
  "/calma-imagen-9.webp",
  "/calma-imagen-10.webp",
];

function EbookCalma() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const handleCheckout = async () => {
    try {
      await startCheckout("ebook-calma" as any, "ebook_detail");
    } catch (error) {
      console.error(error);
      alert("No se pudo iniciar la compra.");
    }
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <section className="min-h-screen bg-white font-['Montserrat',sans-serif]">
      <img src="/calma-imagen-1.webp" alt="" className="block w-full h-auto" />

      {/* HERO */}
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[#18bf74]">
              Ebook digital
            </p>

            <h1 className="mt-3 text-[2.8rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#0f1728] md:text-[4rem]">
              Ebook Calma Interior
            </h1>

            <p className="mt-5 max-w-[620px] text-[1.08rem] leading-[1.8] text-[#667085]">
              Una guía práctica para bajar el estrés, ordenar tu mente y volver
              a conectar con vos misma desde hábitos simples.
            </p>

            <button
              onClick={handleCheckout}
              className="mt-8 rounded-[18px] bg-[#0f1728] px-8 py-5 font-bold uppercase tracking-[0.03em] text-white transition hover:opacity-90"
            >
              Comprar ahora
            </button>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_45px_rgba(0,0,0,0.08)]">
            <img
              src="/ebook-calma.png"
              alt="Ebook Calma"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* IMÁGENES HASTA LA 4 */}
      <div className="w-full">
        {imagesTop.map((image, index) => (
          <section key={index} className="w-full">
            <img
              src={image}
              alt={`Calma imagen ${index + 2}`}
              className="block h-auto w-full"
            />
          </section>
        ))}
      </div>

      {/* SECCIÓN OFERTA */}
<div className="bg-[#f3f3f1] px-5 py-8 md:px-8">
  <div className="mx-auto max-w-[760px]">
    <div className="overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.06)] md:p-6">
      <div className="overflow-hidden rounded-[22px] bg-[#eef2e8]">
        <img
          src="/ebook-calma.png"
          alt="Ebook Calma portada"
          className="block h-auto w-full"
        />
      </div>

      <p className="mt-5 text-[0.85rem] uppercase tracking-[0.14em] text-[#7b7b7b]">
        +5790 DESCARGAS
      </p>

      <h2 className="mt-3 text-[2rem] leading-[1.15] tracking-[-0.04em] text-[#0f1728] md:text-[2.6rem]">
        Cómo Dejar de Pensar Demasiado: Una Guía para Vivir sin Transtornos
        de Ansiedad
      </h2>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-[1.05rem] text-[#8a8a8a] line-through">
          $31.000,00 ARS
        </span>

        <span className="text-[1.5rem] font-semibold text-[#0f1728]">
          $14.900 ARS
        </span>

        <span className="rounded-full bg-black px-4 py-2 text-[0.95rem] font-semibold text-white">
          🎁 50% off hasta agotar cupos
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#e7e7e7] py-4 text-[1.05rem] text-[#0f1728]">
        <span>🔐 Garantía “Cero Ansiedad al Comprar”</span>
        <span>⌄</span>
      </div>

      <div className="mt-3 rounded-[28px] bg-[#151515] px-5 py-8 text-center text-white md:px-8">
        <h3 className="text-[2rem] font-extrabold uppercase tracking-[-0.04em] md:text-[2.6rem]">
          Oferta hoy miércoles
        </h3>

        <p className="mx-auto mt-4 max-w-[560px] text-[1.05rem] leading-[1.7] text-white/85">
          Tu lugar estará reservado durante 15 minutos. En caso de no
          acceder, se cederá el cupo a otra persona.
        </p>

        <div className="mt-6 flex items-end justify-center gap-4 md:gap-8">
          <div className="text-center">
            <div className="text-[4rem] font-extrabold leading-none md:text-[5rem]">
              {minutes}
            </div>
            <div className="mt-2 text-[1.2rem] uppercase tracking-[0.12em] text-white/90">
              MIN
            </div>
          </div>

          <div className="pb-4 text-[3rem] font-bold md:text-[4rem]">:</div>

          <div className="text-center">
            <div className="text-[4rem] font-extrabold leading-none md:text-[5rem]">
              {seconds}
            </div>
            <div className="mt-2 text-[1.2rem] uppercase tracking-[0.12em] text-white/90">
              SEG
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[1.05rem] text-[#4b5563]">
        ⚡ Últimos <span className="font-bold">3 Cupos</span> en Oferta
      </p>

      {/* BOTÓN CENTRADO VERDE */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleCheckout}
          className="w-full max-w-[420px] rounded-full bg-[#19d500] px-8 py-5 text-center text-[1.1rem] font-bold uppercase tracking-[0.03em] text-white shadow-[0_12px_30px_rgba(25,213,0,0.28)] transition hover:scale-[1.02] hover:opacity-95"
        >
          Comprar ahora
        </button>
      </div>
    </div>
  </div>
</div>

      {/* RESTO DE IMÁGENES */}
      <div className="w-full">
        {imagesBottom.map((image, index) => (
          <section key={index} className="w-full">
            <img
              src={image}
              alt={`Calma imagen ${index + 5}`}
              className="block h-auto w-full"
            />
          </section>
        ))}
      </div>

      {/* CTA FINAL */}
      <div className="bg-[#0f1728] px-6 py-14 text-center md:px-10">
        <h3 className="text-[2rem] font-bold tracking-[-0.04em] text-white md:text-[2.8rem]">
          Empezá hoy tu cambio
        </h3>

        <p className="mx-auto mt-4 max-w-[680px] text-[1rem] leading-[1.8] text-white/75 md:text-[1.08rem]">
          Accedé al ebook ahora mismo y empezá a construir más calma, claridad y
          bienestar en tu vida.
        </p>

        <button
          onClick={handleCheckout}
          className="mt-7 rounded-[18px] bg-white px-8 py-5 font-bold uppercase tracking-[0.03em] text-[#0f1728] transition hover:scale-[1.02]"
        >
          Comprar ahora
        </button>
      </div>
    </section>
  );
}

export default EbookCalma;