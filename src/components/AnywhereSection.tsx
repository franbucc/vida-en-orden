import mobilePreview from "../assets/iphone.webp";

function AnywhereSection() {
  return (
    <section className="w-full bg-[#ededed] px-5 py-0 font-['Montserrat',sans-serif] sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1450px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* IMAGE */}
        <div className="flex justify-center pt-10 sm:pt-14 lg:pt-0">
          <img
            src={mobilePreview}
            alt="Vista de la plantilla en celular"
            className="h-auto w-full max-w-[640px] object-contain"
          />
        </div>

        {/* CONTENT */}
        <div className="mx-auto w-full max-w-[640px] pb-16 pt-6 lg:pb-0 lg:pt-0">
          <p className="mb-4 text-[1rem] font-semibold uppercase tracking-[-0.02em] text-[#18c37e] sm:text-[1.15rem]">
            UTILÍZALO EN
          </p>

          <h2 className="mb-8 text-[3rem] font-extrabold uppercase leading-[0.92] tracking-[-0.05em] text-[#0d1420] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.2rem]">
            CUALQUIER PARTE
          </h2>

          <div className="space-y-8">
            <p className="text-[1.15rem] font-bold leading-[1.7] tracking-[-0.02em] text-[#667085] sm:text-[1.35rem] md:text-[1.55rem]">
              La plantilla desarrollada en Google Sheets es perfecta para
              utilizarla en cualquier dispositivo, ya sea un smartphone, una
              tablet, laptop o cualquier otro.
            </p>

            <p className="text-[1.15rem] font-bold leading-[1.7] tracking-[-0.02em] text-[#667085] sm:text-[1.35rem] md:text-[1.55rem]">
              Todo lo tendrás de fácil acceso para utilizarlo en cualquier
              momento de tu día.
            </p>

            <p className="text-[1.15rem] font-bold leading-[1.7] tracking-[-0.02em] text-[#667085] sm:text-[1.35rem] md:text-[1.55rem]">
              Además podrás sincronizar todo automáticamente en la nube.
            </p>
          </div>

          <a
            href="https://mpago.la/2YhtS1x"
            className="mt-12 inline-flex h-[74px] items-center justify-center gap-4 rounded-[18px] bg-[#18c37e] px-10 text-[1.25rem] font-semibold uppercase tracking-[-0.02em] text-white shadow-[0_18px_35px_rgba(24,195,126,0.18)] transition hover:scale-[1.01]"
          >
            COMPRAR AHORA
            <span className="text-[1.6rem] leading-none">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default AnywhereSection;