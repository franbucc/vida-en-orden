import { startCheckout } from "../lib/checkout";

function EbookAmor() {
  const handleCheckout = async () => {
    try {
      await startCheckout("ebook-amor-propio" as any, "ebook_detail");
    } catch (error) {
      console.error(error);
      alert("No se pudo iniciar la compra.");
    }
  };

  return (
    <section className="min-h-screen bg-[#fffaf8] px-5 py-14 font-['Montserrat',sans-serif] md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="text-[3rem] font-extrabold text-[#0f1728]">
          Ebook Amor Propio
        </h1>

        <p className="mt-4 max-w-[700px] text-[1.1rem] leading-[1.8] text-[#667085]">
          Esta es la página personalizada del ebook Amor Propio.
        </p>

        <button
          onClick={handleCheckout}
          className="mt-8 rounded-[18px] bg-[#d97757] px-8 py-5 font-bold uppercase text-white"
        >
          Comprar ahora
        </button>
      </div>
    </section>
  );
}

export default EbookAmor;