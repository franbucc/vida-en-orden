import { useEffect, useState } from "react";

const includes = [
  "Plantilla completa de finanzas personales",
  "Calculadora de pago de deudas",
  "Dashboard con todos tus indicadores",
  "Tutoriales en video incluidos",
  "Sistema de presupuesto mensual automático",
  "Fondo de ahorros con metas visuales",
  "Compatible con todos los dispositivos",
  "Actualizaciones de por vida",
];

function OfferSection() {
  const INITIAL_TIME = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    const savedEndTime = localStorage.getItem("offerEndTime");
    const now = Date.now();

    let endTime: number;

    if (savedEndTime && Number(savedEndTime) > now) {
      endTime = Number(savedEndTime);
    } else {
      endTime = now + INITIAL_TIME * 1000;
      localStorage.setItem("offerEndTime", String(endTime));
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <section className="w-full bg-[#efefef] px-3 py-6 font-['Montserrat',sans-serif] md:px-6 md:py-10">
      <div className="mx-auto max-w-[980px] overflow-hidden rounded-[28px] border border-[#bfe7d8] bg-[#f7f7f7] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="bg-gradient-to-r from-[#18b97a] to-[#21d19a] px-6 py-8 text-center md:px-10 md:py-10">
          <p className="mb-3 text-[1rem] font-semibold uppercase tracking-[-0.02em] text-white md:text-[1.2rem]">
            🎉 OFERTA ESPECIAL POR TIEMPO LIMITADO
          </p>

          <h2 className="text-[2.3rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-white sm:text-[2.8rem] md:text-[4rem]">
            ¡Aprovecha el 80% de Descuento!
          </h2>
        </div>

        <div className="px-4 py-8 md:px-10 md:py-11">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[22px] bg-[#efefef] px-6 py-8 text-center md:px-8">
              <h3 className="text-[1.25rem] font-bold uppercase text-[#69758b] md:text-[1.35rem]">
                PRECIO NORMAL
              </h3>

              <p className="mt-3 text-[1rem] text-[#6c768b] md:text-[1.1rem]">
                Sin la oferta
              </p>

              <p className="mt-5 text-[2.6rem] font-extrabold tracking-[-0.05em] text-[#667085] line-through md:text-[3.2rem]">
                $94.500
              </p>

              <p className="mt-3 text-[1rem] font-medium text-[#6c768b] md:text-[1.08rem]">
                Precio regular
              </p>
            </div>

            <div className="relative rounded-[22px] border-2 border-[#18bf74] bg-[#f3fbf7] px-6 py-8 text-center md:px-8">
              <span className="absolute right-4 top-4 rounded-full bg-[#f5c542] px-4 py-2 text-[0.95rem] font-extrabold uppercase text-[#3a4356] md:right-5 md:top-5">
                80% OFF
              </span>

              <h3 className="text-[1.35rem] font-bold uppercase text-[#18bf74] md:text-[1.45rem]">
                PRECIO HOY
              </h3>

              <p className="mt-3 text-[1rem] text-[#6c768b] line-through md:text-[1.08rem]">
                $94.500 (plantilla completa)
              </p>

              <p className="mt-3 text-[3.2rem] font-extrabold leading-none tracking-[-0.06em] text-[#18bf74] md:text-[4.4rem]">
                $18.900
              </p>

              <p className="mt-3 text-[1rem] font-medium text-[#18bf74] md:text-[1.08rem]">
                ¡Todo incluido!
              </p>
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <a
              href="#"
              className="inline-flex min-w-[290px] flex-col items-center justify-center rounded-[16px] bg-gradient-to-r from-[#18b97a] to-[#21d19a] px-8 py-5 text-center text-white shadow-[0_14px_30px_rgba(24,191,116,0.18)] transition hover:scale-[1.015]"
            >
              <span className="text-[1.15rem] font-extrabold uppercase tracking-[-0.02em] md:text-[1.3rem]">
                ✨ OBTENER ESTA OFERTA →
              </span>
              <small className="mt-1 text-[0.95rem] font-medium md:text-[1rem]">
                click aquí
              </small>
            </a>
          </div>

          <div className="mt-10">
            <h3 className="mb-6 flex items-center gap-3 text-[1.45rem] font-extrabold tracking-[-0.03em] text-[#0f1728]">
              <span className="text-[#18bf74]">✓</span>
              Lo que incluye tu compra:
            </h3>

            <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
              {includes.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 min-w-[28px] items-center justify-center rounded-full bg-[#18bf74] text-[0.9rem] font-bold text-white">
                    ✓
                  </span>

                  <span className="text-[1.05rem] font-medium leading-[1.5] text-[#5f6980] md:text-[1.1rem]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {["UN SOLO PAGO", "ENTREGA INMEDIATA", "ACCESO DE POR VIDA"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#18bf74] text-sm font-bold text-white">
                    ✓
                  </span>
                  <p className="text-[1rem] font-semibold uppercase text-[#0f1728] md:text-[1.05rem]">
                    {item}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="mt-10 rounded-[22px] bg-[#f1f1f1] px-5 py-7 text-center md:px-8 md:py-8">
            <p className="mb-6 text-[1.35rem] font-bold tracking-[-0.03em] text-[#0f1728] md:text-[1.45rem]">
              ⏰ Oferta por tiempo limitado
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {[
                { value: formatTime(days), label: "DÍAS" },
                { value: formatTime(hours), label: "HORAS" },
                { value: formatTime(minutes), label: "MIN" },
                { value: formatTime(seconds), label: "SEG" },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-[86px] w-[84px] flex-col items-center justify-center rounded-[16px] bg-[#0c1524] text-white md:h-[92px] md:w-[88px]">
                    <span className="text-[2.1rem] font-extrabold leading-none">
                      {item.value}
                    </span>
                    <span className="mt-2 text-[0.82rem] font-medium uppercase tracking-[0.04em] text-[#d2d8e2]">
                      {item.label}
                    </span>
                  </div>

                  {index < 3 && (
                    <span className="text-[2rem] font-bold text-[#0f1728]">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#dce9e3] px-6 py-5 text-center">
          <p className="text-[1rem] font-medium text-[#6c768b] md:text-[1.05rem]">
            🛡️ Compra 100% segura • Entrega inmediata • Garantía de satisfacción
          </p>
        </div>
      </div>
    </section>
  );
}

export default OfferSection;