import { useEffect, useState } from "react";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { startCheckout } from "../lib/checkout";

const imagesTop = [
  "/abraza-1.webp",
  "/abraza-2.webp",
  "/abraza-3.webp",
  "/abraza-4.webp",
  "/abraza-5.webp",
  "/abraza-7.webp",
];

const reviews = [
  {
    name: "Clara K.",
    text: "Recomiendo al 100%, me está encantando el libro. No tengo dinero para pagar un psicólogo pero entre este libro y el psicólogo de la seguridad social me están ayudando muchísimo tanto a superar mis traumas de la infancia como para saber lo que no quiero para mí hijo y así poder ser un poco mejor madre.",
  },
  {
    name: "María D.",
    text: "Superar miedos, ansiedad, situaciones de la vida, hay que cambiar nuestra manera de ver las cosas. Por lo menos yo, querer volver a ser la niña que fui sin miedos, sin angustias. Ojalá sentirme siempre así, para eso hay que trabajar diariamente.",
  },
  {
    name: "Ismael R.",
    text: "Súper recomendable, un libro que le puede cambiar a cualquier persona la vida. Lo recomiendo al 100%. La autora lo explica todo muy bien.",
  },
  {
    name: "Noemí P.",
    text: "Libro recomendadísimo!! Tanto para público general como para terapeutas. Explica con detalle pero de una forma fresca y cercana qué es el trauma, cómo identificarlo y cómo empezar esa introspección sobre tu niña interior.",
  },
  {
    name: "Brenda U.",
    text: "Me ayudó a detectar y analizar algunos traumas. Me ha permitido sobrellevar de una mejor manera algunas situaciones donde perdía el control y me lastimaba a mí y a los que tengo alrededor.",
  },
  {
    name: "Claudia H.",
    text: "Me llenó de alegría poder haber leído este libro. Logré entender más sobre mí y cómo abrazar a mi niña interior.",
  },
  {
    name: "Silvia F.",
    text: "Excelente libro. Es tal el choque emocional que recibí después de leer unas hojas, que caí en cuenta de muchas cosas. Te explica cómo debería haber sido, cómo te ha afectado y también te da herramientas para seguir.",
  },
  {
    name: "Beatriz Z.",
    text: "Este libro me parece una obra fantástica para todas aquellas personas que lidiamos día a día con heridas de la infancia, rechazo, abandono o sensación de no ser suficiente. Me ha removido muchísimo, pero también me ha sanado un montón.",
  },
  {
    name: "Viviana L.",
    text: "Como terapeuta, me parece un material muy valioso, claro y profundo. Lo recomiendo para quienes quieran empezar un camino de sanación personal.",
  },
];

function EbookAbraza() {
    const faqs = [
  {
    question: "¿Qué voy a aprender exactamente con este ebook?",
    answer:
      "Este libro nació para ayudarte en el proceso de sanar y comenzar a amarte sin culpa.",
  },
  {
    question: "¿Qué formato tiene el material?",
    answer:
      "Vas a recibir un ebook en PDF descargable, compatible con cualquier dispositivo: celular, computadora o tablet.",
  },
  {
    question: "¿Qué pasa después de comprar?",
    answer:
      "Al finalizar la compra, recibirás inmediatamente un enlace de descarga en tu correo para acceder al ebook y a todos los bonus incluidos.",
  },
  {
    question: "¿Esto reemplaza la terapia psicológica?",
    answer:
      "No. Es una herramienta complementaria que te ayuda a gestionar tus pensamientos y emociones en el día a día. Si estás en un tratamiento, esto puede potenciar tus resultados.",
  },
  {
    question: "¿Es apto para cualquier edad?",
    answer:
      "Está recomendado para jóvenes y adultos a partir de los 16 años. Si querés regalarlo, puede ser un excelente apoyo para alguien que esté pasando por ansiedad o depresión leve.",
  },
  {
    question: "¿Ofrecen garantía?",
    answer:
      "Sí. Si sentís que este material no te ayudó en absoluto dentro de los primeros 7 días, podés solicitar la devolución del 100% de tu dinero. Tu bienestar es nuestra prioridad.",
  },
];
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

const toggleFaq = (index: number) => {
  setOpenFaqs((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 15 * 60;
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const currentDay = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
  });

  const handleCheckout = async () => {
    try {
      await startCheckout("ebook-abraza" as any, "ebook_detail");
    } catch (error) {
      console.error(error);
      alert("No se pudo iniciar la compra.");
    }
  };

  return (
    <section className="min-h-screen bg-white font-['Montserrat',sans-serif]">
      <div className="w-full">
        {imagesTop.map((image, index) => (
          <section key={image} className="w-full">
            <img
              src={image}
              alt={`Abraza imagen ${index + 1}`}
              className="block h-auto w-full"
            />

            {index === 1 && (
              <div className="bg-white px-5 py-10 text-center">
                <button
                  onClick={handleCheckout}
                  className="w-full max-w-[660px] rounded-full bg-[#00d10a] px-8 py-6 text-center text-[1rem] font-medium uppercase tracking-[0.12em] text-white shadow-[0_18px_35px_rgba(0,209,10,0.35)] transition hover:scale-[1.02] hover:opacity-95 md:text-[1.25rem]"
                >
                  Quiero acceder ahora $15.499 ARS
                  <br />
                  <span className="normal-case tracking-[0.08em]">
                    + 4 ebooks de regalo 🎁
                  </span>
                </button>

                <p className="mt-6 text-[1rem] tracking-[0.08em] text-[#4b5563] md:text-[1.2rem]">
                  🎁 Ver detalles del BONUS al final.
                </p>
              </div>
            )}

            {index === 4 && (
              <section className="bg-white px-5 py-14 md:px-10">
                <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.7fr_0.8fr] lg:items-start">
                  <div className="overflow-hidden rounded-[18px] bg-[#f8d8e5]">
                    <img
                      src="/abraza-6.webp"
                      alt="Abraza a la niña que fuiste"
                      className="block h-auto w-full"
                    />
                  </div>

                  <div>
                    <p className="text-[0.75rem] uppercase tracking-[0.25em] text-[#8a8a8a]">
                      +5790 descargas
                    </p>

                    <h2 className="mt-3 text-[2.4rem] font-light leading-[1.2] tracking-[0.02em] text-[#151515] md:text-[3.4rem]">
                      Sana las heridas del pasado y reconecta con tu interior.
                    </h2>

                    <div className="mt-7 flex items-center gap-2 text-[1.1rem]">
                      <span className="text-[#f4b400]">★★★★★</span>
                      <span className="text-[#667085]">(23)</span>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-5">
                      <span className="text-[1.05rem] text-[#777] line-through">
                        $31.000,00 ARS
                      </span>

                      <span className="text-[1.15rem] tracking-[0.08em] text-[#151515]">
                        $15.499,00 ARS
                      </span>
                    </div>

                    <span className="mt-3 inline-flex rounded-full bg-black px-4 py-2 text-[0.85rem] font-semibold text-white">
                      🎁 50% off hasta agotar cupos
                    </span>

                    <div className="mt-8 flex items-center justify-between border-y border-[#e7e7e7] py-5 text-[1rem] text-[#4b5563]">
                      <span>↩️ 🔐 Garantía “Cero Ansiedad al Comprar”</span>
                      <span>⌄</span>
                    </div>

                    <div className="mt-5 rounded-[22px] bg-[#1d1d1d] px-6 py-9 text-center text-white">
                      <h3 className="text-[2.3rem] font-extrabold uppercase leading-[1.25] tracking-[0.02em] md:text-[3rem]">
                        Oferta hoy
                        <br />
                        {currentDay}
                      </h3>

                      <p className="mx-auto mt-6 max-w-[420px] text-[1rem] leading-[1.6] text-white/90">
                        Tu lugar estará reservado durante 15 minutos. En caso
                        de no acceder, se cederá el cupo a otra persona.
                      </p>

                      <div className="mt-9 flex items-end justify-center gap-6">
                        <div>
                          <div className="text-[4.2rem] font-extrabold leading-none md:text-[5rem]">
                            {minutes}
                          </div>
                          <div className="mt-2 text-[1rem] uppercase tracking-[0.12em]">
                            MIN
                          </div>
                        </div>

                        <div className="pb-5 text-[3rem] font-bold">:</div>

                        <div>
                          <div className="text-[4.2rem] font-extrabold leading-none md:text-[5rem]">
                            {seconds}
                          </div>
                          <div className="mt-2 text-[1rem] uppercase tracking-[0.12em]">
                            SEG
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-7 text-[1rem] tracking-[0.04em] text-[#667085]">
                      ⚡ Quedan solo{" "}
                      <span className="font-bold text-[#151515]">3 Cupos</span>{" "}
                      en Oferta
                    </p>

                    <button
                      onClick={handleCheckout}
                      className="mt-8 w-full rounded-full bg-[#00d10a] px-8 py-5 text-[1rem] font-semibold tracking-[0.08em] text-white shadow-[0_12px_25px_rgba(0,209,10,0.35)] transition hover:scale-[1.02] hover:opacity-95"
                    >
                      Comprar hoy
                    </button>
                  </div>
                </div>
              </section>
            )}

            {index === 5 && (
              <section className="bg-white px-5 py-16 md:px-8 lg:px-10">
                <div className="mx-auto max-w-[1280px]">
                  <div className="mb-8 flex items-center justify-between gap-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="text-[2rem] leading-none text-[#f4b400] md:text-[2.7rem]">
                        ★★★★★
                      </div>

                      <div className="flex items-center gap-2 text-[1.15rem] font-medium text-[#202020] md:text-[1.35rem]">
                        <span>23 Reseñas</span>
                      </div>
                    </div>
                  </div>

                  <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
                    {reviews.map((review) => (
                      <article
                        key={review.name}
                        className="mb-5 break-inside-avoid rounded-[14px] border border-[#e8e8e8] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                      >
                        <div className="mb-4 flex items-center gap-2">
                          <h3 className="text-[1.05rem] font-bold text-[#151515] md:text-[1.15rem]">
                            {review.name}
                          </h3>

                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-[0.6rem] font-bold text-white">
                            ✓
                          </span>

                          <span className="text-[0.95rem] text-[#424242]">
                            Verificada
                          </span>
                        </div>

                        <div className="mb-3 text-[1.25rem] leading-none text-[#f4b400]">
                          ★★★★★
                        </div>

                        <p className="text-[1.05rem] leading-[1.45] text-[#252525] md:text-[1.12rem]">
                          {review.text}
                        </p>
                      </article>
                    ))}
                  </div>
                  <div className="mt-20 border-t border-[#e8e8e8] pt-16">
  <h2 className="mb-16 text-center text-[2.4rem] font-light tracking-[0.04em] text-[#1f1f1f] md:text-[3rem]">
    Preguntas Frecuentes
  </h2>

  <div className="mx-auto max-w-[1180px]">
    {faqs.map((faq, index) => {
      const isOpen = openFaqs[index];

      return (
        <div
          key={faq.question}
          className="border-b border-[#e8e8e8] py-7"
        >
          <button
            type="button"
            onClick={() => toggleFaq(index)}
            className="flex w-full items-center justify-between gap-5 text-left"
          >
            <div className="flex items-center gap-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#1f1f1f] text-[1.15rem] leading-none text-[#1f1f1f]">
                ✓
              </span>

              <h3 className="text-[1.15rem] font-normal tracking-[0.04em] text-[#222] md:text-[1.35rem]">
                {faq.question}
              </h3>
            </div>

            <span className="shrink-0 text-[1.5rem] font-light text-[#333]">
              {isOpen ? "⌃" : "⌄"}
            </span>
          </button>

          {isOpen && (
            <p className="mt-7 max-w-[1050px] pl-0 text-[1.15rem] font-light leading-[1.9] tracking-[0.04em] text-[#6f6f6f] md:pl-[52px] md:text-[1.35rem]">
              {faq.answer}
            </p>
          )}
        </div>
      );
    })}
  </div>
</div>
                </div>
              </section>
            )}
          </section>
        ))}
      </div>

      <WhatsAppFloat message="Hola! Quiero más información sobre el Ebook Abraza a tu niña interior." />
    </section>
  );
}

export default EbookAbraza;