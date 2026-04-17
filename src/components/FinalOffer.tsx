import finalOfferImage from "../assets/plantillas.webp";

const perks = [
  "UN SOLO PAGO",
  "ENTREGA INMEDIATA",
  "ACCESO DE POR VIDA",
  "ACTUALIZACIONES GRATIS",
  "SOPORTE PRIORITARIO",
];

function FinalOffer() {
  return (
    <section className="w-full bg-[#efefef] px-5 py-16 font-['Montserrat',sans-serif] md:px-8 md:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1360px]">
        <p className="mb-4 text-center text-[1.05rem] font-normal uppercase tracking-[-0.02em] text-[#6d778c] md:text-[1.2rem]">
          LA PLANTILLA DE FINANZAS PERSONALES DEFINITIVA
        </p>

        <h2 className="mb-8 text-center text-[3.2rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#101827] sm:text-[4.2rem] md:text-[5.2rem] lg:text-[5.7rem]">
          ¡Obtenla ahora mismo!
        </h2>

        <div className="mx-auto mb-12 flex max-w-[1320px] flex-wrap items-center justify-center gap-x-8 gap-y-5 md:mb-14 lg:gap-x-10">
          {perks.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-center"
            >
              <span className="flex h-[30px] w-[30px] min-w-[30px] items-center justify-center rounded-full bg-[#18bf74] text-[0.95rem] font-bold text-white">
                ✓
              </span>

              <span className="text-[0.95rem] font-semibold uppercase tracking-[-0.02em] text-[#101827] md:text-[1.05rem] lg:text-[1.1rem]">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <img
            src={finalOfferImage}
            alt="Plantilla de finanzas personales en múltiples dispositivos"
            className="h-auto w-full max-w-[1180px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default FinalOffer;