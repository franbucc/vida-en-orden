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

const MESSAGE_DURATION = 15000;
const TRANSITION_DURATION = 700;

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
    <div className="pointer-events-none fixed bottom-4 left-4 z-[9998] w-[calc(100%-2rem)] max-w-[470px] sm:bottom-5 sm:left-5">
      <div
        className={`transform rounded-[24px] border border-white/70 bg-white/95 p-5 shadow-[0_18px_45px_rgba(15,23,40,0.16)] backdrop-blur-xl transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e9fbf3]">
            <div className="h-4 w-4 rounded-full bg-[#18bf74]" />
          </div>

          <div className="min-w-0">
            <p className="text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[#18bf74]">
              Compra reciente
            </p>

            <p className="mt-1.5 text-[1.18rem] font-bold leading-[1.4] tracking-[-0.02em] text-[#0f1728]">
              {currentMessage}
            </p>

            <p className="mt-2 text-[1rem] font-medium text-[#6b7280]">
              Oferta activa por tiempo limitado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentPurchasesToast;