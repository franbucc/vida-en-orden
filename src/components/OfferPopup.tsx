import { useEffect, useMemo, useState } from "react";
import { startCheckout } from "../lib/checkout";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const POPUP_DELAY = 5000;
const COUNTDOWN_MINUTES = 15;

const STORAGE_KEYS = {
  endTime: "popupOfferEndTime",
  dismissed: "popupOfferDismissed",
  shownSession: "popupOfferShownSession",
};

function OfferPopup() {
  const initialTime = COUNTDOWN_MINUTES * 60;

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const trackEvent = (
    eventName: string,
    payload?: Record<string, string | number | boolean>
  ) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, payload || {});
    }
  };

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEYS.dismissed);
    const alreadyShown = sessionStorage.getItem(STORAGE_KEYS.shownSession);

    if (dismissed === "true" || alreadyShown === "true") return;

    const timer = window.setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(STORAGE_KEYS.shownSession, "true");

      trackEvent("PopupOfferViewed", {
        popup_name: "vida_en_orden_offer",
        location: "global",
      });
    }, POPUP_DELAY);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const now = Date.now();
    const savedEndTime = localStorage.getItem(STORAGE_KEYS.endTime);

    let endTime: number;

    if (savedEndTime && Number(savedEndTime) > now) {
      endTime = Number(savedEndTime);
    } else {
      endTime = now + initialTime * 1000;
      localStorage.setItem(STORAGE_KEYS.endTime, String(endTime));
    }

    const interval = window.setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        window.clearInterval(interval);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [initialTime]);

  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEYS.dismissed, "true");

    trackEvent("PopupOfferClosed", {
      popup_name: "vida_en_orden_offer",
    });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      trackEvent("InitiateCheckout", {
        content_name: "Vida en Orden",
        source: "popup_offer",
      });

      trackEvent("PopupOfferClicked", {
        popup_name: "vida_en_orden_offer",
        cta: "comprar_ahora",
      });

      await startCheckout("vida-en-orden", "popup_offer");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al iniciar la compra.");
      setLoading(false);
    }
  };

  const timeParts = useMemo(() => {
    const days = Math.floor(timeLeft / (60 * 60 * 24));
    const hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    const format = (value: number) => String(value).padStart(2, "0");

    return [
      { value: format(days), label: "DÍAS" },
      { value: format(hours), label: "HORAS" },
      { value: format(minutes), label: "MIN" },
      { value: format(seconds), label: "SEG" },
    ];
  }, [timeLeft]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b1020]/60 px-4 backdrop-blur-[6px]">
      <div className="relative w-full max-w-[760px] overflow-hidden rounded-[30px] border border-white/60 bg-white shadow-[0_25px_80px_rgba(15,23,40,0.28)]">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar popup"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe3ea] bg-white text-[1.3rem] font-medium text-[#0f1728] transition hover:scale-[1.04]"
        >
          ×
        </button>

        <div className="bg-gradient-to-r from-[#18b97a] to-[#21d19a] px-6 pb-10 pt-12 text-center md:px-10 md:pb-12 md:pt-14">
          <p className="mb-3 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-white/90 md:text-[1rem]">
            Oferta exclusiva por tiempo limitado
          </p>

          <h2 className="mx-auto max-w-[580px] text-[2.2rem] font-extrabold leading-[0.95] tracking-[-0.06em] text-white sm:text-[2.7rem] md:text-[4rem]">
            Ordená tus finanzas con un precio irrepetible
          </h2>

          <p className="mx-auto mt-5 max-w-[560px] text-[1rem] font-medium leading-[1.55] text-white/90 md:text-[1.12rem]">
            Accedé hoy a la plantilla completa de Vida en Orden con dashboard,
            calculadoras, seguimiento de gastos y sistema de presupuesto listo
            para usar.
          </p>
        </div>

        <div className="px-4 py-6 md:px-8 md:py-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-[#f3f4f6] px-5 py-6 text-center md:px-6">
              <p className="text-[0.95rem] font-bold uppercase tracking-[0.06em] text-[#7a8599]">
                Precio normal
              </p>

              <p className="mt-4 text-[2.2rem] font-extrabold tracking-[-0.05em] text-[#7b8494] line-through md:text-[2.8rem]">
                $94.500
              </p>

              <p className="mt-2 text-[0.98rem] font-medium text-[#7a8599]">
                Valor completo del sistema
              </p>
            </div>

            <div className="relative rounded-[24px] border-2 border-[#18bf74] bg-[#f3fbf7] px-5 py-6 text-center md:px-6">
              <span className="absolute right-4 top-4 rounded-full bg-[#f6cd4b] px-3 py-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.05em] text-[#263143] md:text-[0.84rem]">
                80% OFF
              </span>

              <p className="text-[0.95rem] font-bold uppercase tracking-[0.06em] text-[#18bf74]">
                Precio hoy
              </p>

              <p className="mt-4 text-[2.6rem] font-extrabold leading-none tracking-[-0.06em] text-[#18bf74] md:text-[3.5rem]">
                $18.900
              </p>

              <p className="mt-2 text-[0.98rem] font-medium text-[#18bf74]">
                Pago único • Acceso de por vida
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] bg-[#f6f7f8] px-4 py-5 text-center md:px-6 md:py-6">
            <p className="mb-5 text-[1.08rem] font-bold tracking-[-0.03em] text-[#0f1728] md:text-[1.25rem]">
              Esta oportunidad desaparece en:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
              {timeParts.map((item, index) => (
                <div key={item.label} className="flex items-center gap-2.5 md:gap-3">
                  <div className="flex h-[78px] w-[76px] flex-col items-center justify-center rounded-[18px] bg-[#0d1525] text-white md:h-[88px] md:w-[84px]">
                    <span className="text-[1.85rem] font-extrabold leading-none md:text-[2.1rem]">
                      {item.value}
                    </span>

                    <span className="mt-1.5 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[#d2d8e2] md:text-[0.78rem]">
                      {item.label}
                    </span>
                  </div>

                  {index < timeParts.length - 1 && (
                    <span className="text-[1.7rem] font-bold text-[#0f1728] md:text-[2rem]">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="inline-flex min-w-[280px] flex-col items-center justify-center rounded-[18px] bg-gradient-to-r from-[#18b97a] to-[#21d19a] px-8 py-5 text-center text-white shadow-[0_16px_34px_rgba(24,191,116,0.22)] transition hover:scale-[1.015] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="text-[1.05rem] font-extrabold uppercase tracking-[-0.03em] md:text-[1.18rem]">
                {loading ? "REDIRIGIENDO..." : "QUIERO APROVECHAR LA OFERTA"}
              </span>

              <small className="mt-1 text-[0.92rem] font-medium md:text-[0.98rem]">
                Comprar ahora con acceso inmediato
              </small>
            </button>
          </div>

          <div className="mt-5 text-center">
            <p className="text-[0.94rem] font-medium text-[#6b768b] md:text-[1rem]">
              Compra segura • Entrega inmediata • Plantilla completa lista para usar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferPopup;