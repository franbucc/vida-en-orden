function Footer() {
  return (
    <footer className="w-full bg-[#0f1728] px-5 py-12 font-['Montserrat',sans-serif] md:px-8 md:py-14 lg:px-12">
      <div className="mx-auto max-w-[1100px]">
        {/* WARNING */}
        <div className="rounded-[22px] border border-white/10 bg-white/5 px-6 py-6 md:px-8 md:py-7">
          <p className="text-[0.98rem] leading-[1.75] text-[#d7deea] md:text-[1.05rem]">
            <strong className="font-semibold text-white">
              Aviso importante sobre este producto:
            </strong>{" "}
            Este sitio no ofrece cuentas de ahorro, préstamos, oportunidades de
            inversión ni asesoría financiera. Solo vendemos una{" "}
            <strong className="font-semibold text-white">
              plantilla de finanzas personales en formato hoja de cálculo
              (archivo digital editable)
            </strong>{" "}
            para que tú mismo registres y organices tus ingresos, gastos,
            ahorros y pagos.
          </p>
        </div>

        {/* MIDDLE */}
        <div className="mt-8 flex flex-col items-center justify-between gap-5 border-b border-white/10 pb-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#18b97a] to-[#21d19a] text-[1.35rem] font-extrabold text-white shadow-[0_8px_20px_rgba(24,191,116,0.25)]">
              $
            </div>

            <span className="text-[1.3rem] font-bold tracking-[-0.03em] text-white md:text-[1.45rem]">
              Vida en Orden
            </span>
          </div>

          <a
            href="mailto:info@vidaenorden.com"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[1rem] font-medium text-[#d7deea] transition hover:bg-white/10 hover:text-white"
          >
            ✉ info@vidaenorden.com
          </a>
        </div>

        {/* BOTTOM */}
        <div className="pt-6 text-center text-[0.95rem] font-medium text-[#94a3b8] md:text-[1rem]">
          © 2026 Vida en Orden. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;