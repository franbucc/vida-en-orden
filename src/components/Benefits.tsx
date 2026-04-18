import { useState } from "react";
import presupuestoMensual from "../assets/presupuesto-mensual.png";
import { startCheckout } from "../lib/checkout";

function Benefits() {
  const [loading, setLoading] = useState(false);

  const benefits = [
    "Ingresos",
    "Gastos",
    "Ahorros",
    "Deudas",
    "Inversiones",
    "Seguimiento de gastos",
    "Cálculos automáticos",
    "Gráficos interactivos",
    "Regla 50/30/20",
    "Panel anual y mensual",
  ];

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await startCheckout("vida-en-orden", "benefits");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al iniciar la compra.");
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#f3f3f3] px-4 py-20 font-['Montserrat',sans-serif] md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-14 text-center md:mb-16">
          <p className="mb-4 text-[1.05rem] font-medium text-[#7a8191] md:text-[1.2rem]">
            La plantilla de finanzas personales definitiva
          </p>

          <h2 className="mx-auto mb-5 max-w-[1250px] text-[3.3rem] font-semibold leading-[0.98] tracking-[-0.04em] text-[#111827] sm:text-[3rem] md:text-[4.3rem] lg:text-[5.2rem]">
            ¿Cuáles son los beneficios de esta plantilla?
          </h2>

          <p className="mx-auto max-w-[1050px] text-[1.5rem] font-normal leading-[1.5] text-[#7a8191] sm:text-[1.15rem] md:text-[1.5rem]">
            De esta manera nos diferenciamos de todas las plantillas que hay en
            el mercado
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="order-1">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-[22px] bg-[#efefef] px-5 py-6 md:px-6 md:py-7"
                >
                  <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-[#19c987] text-[1.1rem] font-semibold text-white md:h-11 md:w-11 md:min-w-11">
                    ✓
                  </div>

                  <span className="text-[1.2rem] font-normal leading-[1.25] text-[#111827] md:text-[1.45rem]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-2 overflow-hidden rounded-[26px]">
            <img
              src={presupuestoMensual}
              alt="Vista de presupuesto mensual"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full justify-center md:mt-10">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="inline-flex w-full max-w-[720px] items-center justify-center gap-4 rounded-[24px] bg-gradient-to-r from-[#15c978] to-[#1fd6a3] px-8 py-6 text-center text-[1.2rem] font-bold text-white shadow-[0_18px_45px_rgba(31,214,163,0.22)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(31,214,163,0.28)] disabled:cursor-not-allowed disabled:opacity-70 md:px-12 md:py-7 md:text-[2.2rem]"
        >
          <span>
            {loading ? "REDIRIGIENDO..." : "QUIERO LA PLANTILLA"}
          </span>
          <span className="text-[2rem] leading-none md:text-[2.6rem]">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}

export default Benefits;