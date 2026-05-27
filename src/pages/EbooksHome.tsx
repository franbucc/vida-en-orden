import EbookCard from "../components/EbookCard";
import { EBOOKS } from "../lib/ebooks";
import WhatsAppFloat from "../components/WhatsAppFloat";

function EbooksHome() {
  return (
    <section className="min-h-screen bg-[#f5f5f7] font-['Montserrat',sans-serif]">
      {/* HERO IMAGE */}
      <div className="w-full">
        <img
          src="/ebook-hero.png"
          alt="Hero ebooks"
          className="h-auto w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="px-5 py-14 md:px-8 md:py-16 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-[#18bf74]">
              Biblioteca digital
            </p>

            <h1 className="mt-3 text-[2.6rem] font-extrabold leading-[0.95] tracking-[-0.06em] text-[#0f1728] sm:text-[3.5rem] md:text-[4.5rem]">
              Elegí el ebook ideal para vos
            </h1>

            <p className="mx-auto mt-5 max-w-[680px] text-[1.05rem] leading-[1.75] text-[#667085] md:text-[1.12rem]">
              Descubrí una colección de ebooks pensados para acompañarte con
              herramientas prácticas, ejercicios y contenido claro para aplicar
              en tu día a día.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {EBOOKS.map((ebook) => (
              <EbookCard key={ebook.id} ebook={ebook} />
            ))}
          </div>
        </div>
      </div>
<WhatsAppFloat message="Hola! Quiero más información sobre los ebooks disponibles." />
    </section>
  );
}


export default EbooksHome;