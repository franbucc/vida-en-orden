import { useState } from "react";
import heroImage from "/assets/hero-finanzas.webp";
import { startCheckout } from "../lib/checkout";

function Hero() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await startCheckout("vida-en-orden", "hero");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al iniciar la compra.");
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#dfe8b7] to-[#95e0cf] px-4 pb-30 pt-44 font-['Montserrat',sans-serif] md:px-6 md:pt-32 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center">
        <p className="mb-4 w-full text-center text-base font-medium text-slate-700 md:text-[1.2rem]">
          ¿Sientes que el dinero desaparece cada mes?
        </p>

        <h1 className="mb-6 w-full max-w-[1100px] text-center text-[3.6rem] font-extrabold leading-[0.88] tracking-[-0.05em] text-slate-950 sm:text-[4.8rem] md:text-[6.5rem] lg:text-[7.5rem]">
          Plantilla de
          <br />
          Finanzas Personales
        </h1>

        <p className="mb-10 w-full max-w-[900px] text-center text-lg font-medium leading-[1.45] text-slate-700 md:text-[2rem]">
          La forma más{" "}
          <span className="inline-block rounded-xl bg-[#f4bf24] px-3 py-0.5 font-bold text-slate-900 md:px-4">
            simple
          </span>{" "}
          de controlar tus ingresos y gastos,
          <br className="hidden md:block" />
          usada por miles de personas.
        </p>

        <div className="flex w-full justify-center">
          <img
            src={heroImage}
            alt="Plantilla de finanzas personales"
            className="h-auto w-full max-w-[1050px] object-contain"
          />
        </div>

        <div className="mt-8 flex w-full justify-center md:mt-10">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="inline-flex w-full max-w-[720px] items-center justify-center gap-4 rounded-[24px] bg-gradient-to-r from-[#15c978] to-[#1fd6a3] px-8 py-6 text-center text-[1.2rem] font-bold text-white shadow-[0_18px_45px_rgba(31,214,163,0.22)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(31,214,163,0.28)] disabled:cursor-not-allowed disabled:opacity-70 md:px-12 md:py-7 md:text-[2.2rem]"
          >
            <span>{loading ? "REDIRIGIENDO..." : "QUIERO LA PLANTILLA"}</span>
            <span className="text-[2rem] leading-none md:text-[2.6rem]">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;