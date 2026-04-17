import { useState } from "react";

const faqItems = [
  {
    question: "¿Cómo recibiré la plantilla?",
    answer:
      "Una vez realizada la compra, recibirás acceso inmediato a la plantilla digital junto con las instrucciones para comenzar a usarla.",
  },
  {
    question: "¿Es compatible con Mac?",
    answer:
      "Sí. Puedes usarla sin problema en Mac, siempre que accedas a Google Sheets desde tu navegador o cuenta de Google.",
  },
  {
    question: "¿Tienen tutoriales de uso y soporte?",
    answer:
      "Sí, la compra incluye tutoriales para que puedas entender cómo usar la plantilla y además contarás con soporte para resolver dudas.",
  },
  {
    question: "¿Necesito conocimientos de Excel para usar?",
    answer:
      "No. La plantilla está pensada para que cualquier persona pueda usarla de forma simple, incluso sin experiencia previa en Excel o Google Sheets.",
  },
  {
    question: "¿En dónde lo podré utilizar?",
    answer:
      "Podrás utilizarla en computadora, notebook, tablet o celular. Al estar en Google Sheets, puedes acceder desde cualquier dispositivo compatible.",
  },
  {
    question: "¿Es compatible con Windows?",
    answer:
      "Sí. Funciona perfectamente en Windows a través de Google Sheets desde el navegador.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-[#efefef] px-5 py-16 font-['Montserrat',sans-serif] md:px-8 md:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[980px]">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-[1rem] font-medium uppercase tracking-[0.03em] text-[#18bf74] md:text-[1.1rem]">
            PREGUNTAS FRECUENTES
          </p>

          <h2 className="text-[2.4rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#0f1728] sm:text-[3rem] md:text-[4rem]">
            ¿Tienes preguntas? Nosotros
            <br />
            tenemos las respuestas
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-[22px] border transition-all duration-300 ${
                  isOpen
                    ? "border-[#18bf74] bg-white shadow-[0_10px_30px_rgba(24,191,116,0.08)]"
                    : "border-[#dfe4e1] bg-[#f8f8f8]"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
                  onClick={() => toggleItem(index)}
                  type="button"
                >
                  <span className="text-[1.08rem] font-semibold leading-[1.35] tracking-[-0.02em] text-[#0f1728] md:text-[1.2rem]">
                    {item.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 min-w-[36px] items-center justify-center rounded-full text-[1.1rem] font-bold transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#18bf74] text-white"
                        : "bg-[#e9f8f1] text-[#18bf74]"
                    }`}
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#e8eeeb] px-6 pb-6 pt-1 md:px-8">
                    <p className="max-w-[800px] text-[1rem] leading-[1.7] text-[#667085] md:text-[1.08rem]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;