import { useEffect, useMemo, useState } from "react";

const messages = [
  "Josefina acaba de comprar plantilla financiera",
  "Sergio acaba de comprar plantilla financiera",
  "Camila acaba de comprar plantilla financiera",
  "Luciano acaba de comprar plantilla financiera",
  "Martina acaba de comprar plantilla financiera",
  "Valentina acaba de comprar plantilla financiera",
  "Agustín acaba de comprar plantilla financiera",
  "Brenda acaba de comprar plantilla financiera",
  "Federico acaba de comprar plantilla financiera",
];

const MESSAGE_DURATION = 5000;
const TRANSITION_DURATION = 1500;

function RecentPurchasesToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const currentMessage = useMemo(() => messages[index], [index]);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      setVisible(true);
    }, 1800);

    return () => window.clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const interval = window.setInterval(() => {
      setVisible(false);

      window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, TRANSITION_DURATION);
    }, MESSAGE_DURATION);

    return () => window.clearInterval(interval);
  }, [visible]);

  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-[9998] w-[calc(100%-1.5rem)] max-w-[470px] sm:bottom-5 sm:left-5 sm:w-[calc(100%-2rem)]">
      <div
        className={`transform rounded-[20px] border border-white/70 bg-white/95 p-4 sm:rounded-[24px] sm:p-5 shadow-[0_18px_45px_rgba(15,23,40,0.16)] backdrop-blur-xl transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e9fbf3] sm:h-14 sm:w-14">
            <div className="h-3 w-3 rounded-full bg-[#18bf74] sm:h-4 sm:w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#18bf74] sm:text-[0.95rem]">
              Compra reciente
            </p>

            <p className="mt-1 text-[0.92rem] font-bold leading-[1.35] tracking-[-0.02em] text-[#0f1728] sm:mt-1.5 sm:text-[1.18rem]">
              {currentMessage}
            </p>

            <p className="mt-1.5 text-[0.82rem] font-medium text-[#6b7280] sm:mt-2 sm:text-[1rem]">
              Oferta activa por tiempo limitado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentPurchasesToast;