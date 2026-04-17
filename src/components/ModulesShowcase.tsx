import deudasImage from "../assets/bola-de-nieve.webp";
import ahorrosImage from "../assets/fondo-de-ahorro.webp";

function ModulesShowcase() {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#07111f_0%,#050d18_100%)] px-4 py-20 font-['Montserrat',sans-serif] md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="hidden justify-center lg:flex lg:justify-start">
            <h2 className="max-w-[560px] text-center text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.6rem] md:text-[3.4rem] lg:text-left lg:text-[4rem]">
              Pago de Deudas | Bola de Nieve
            </h2>
          </div>

          <div className="relative">
            <div className="absolute right-[-12px] top-[-12px] h-full w-full rounded-[28px] bg-[#1c2433]/50" />
            <div className="relative overflow-hidden rounded-[28px] bg-[#151515] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <img
                src={deudasImage}
                alt="Módulo de pago de deudas bola de nieve"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="absolute right-[-12px] top-[-12px] h-full w-full rounded-[28px] bg-[#1c2433]/50" />
            <div className="relative overflow-hidden rounded-[28px] bg-[#151515] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <img
                src={ahorrosImage}
                alt="Módulo de fondo de ahorros"
                className="block h-auto w-full"
              />
            </div>
          </div>

          <div className="order-1 hidden justify-center lg:order-2 lg:flex lg:justify-end">
            <h2 className="max-w-[560px] text-center text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.6rem] md:text-[3.4rem] lg:text-right lg:text-[4rem]">
              Fondo de Ahorros
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModulesShowcase;