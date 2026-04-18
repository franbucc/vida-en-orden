import { useState } from "react";
import { startCheckout } from "../lib/checkout";

function Navbar() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await startCheckout("vida-en-orden", "navbar");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al iniciar la compra.");
      setLoading(false);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-gradient-to-r from-[#dfe7b9]/95 to-[#8fdccc]/95 px-4 py-5 font-['Montserrat',sans-serif] backdrop-blur-md md:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-gradient-to-b from-[#1ed889] to-[#14c974] text-[1.9rem] font-semibold text-white shadow-[0_12px_24px_rgba(20,201,116,0.22)]">
            $
          </div>

          <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-[#0f172a] md:text-[3rem]">
            Vida en Orden
          </h1>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-[22px] bg-gradient-to-r from-[#17c97e] to-[#20d5a0] px-10 py-5 text-[1rem] font-bold tracking-[-0.02em] text-white shadow-[0_18px_35px_rgba(32,213,160,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_45px_rgba(32,213,160,0.24)] disabled:cursor-not-allowed disabled:opacity-70 md:min-w-[250px] md:text-[1.5rem]"
        >
          {loading ? "Redirigiendo..." : "Obtener Ahora"}
        </button>
      </div>
    </header>
  );
}

export default Navbar;