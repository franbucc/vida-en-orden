import avatar1 from "../assets/testimonial-1.webp";
import avatar2 from "../assets/testimonial-2.png";
import avatar3 from "../assets/testimonial-3.webp";
import avatar4 from "../assets/testimonial-4.png";
import avatar5 from "../assets/testimonial-5.png";

const testimonials = [
  {
    title: "La plantilla definitiva",
    text: "Antes compré muchas plantillas de finanzas personales, pero en todas había alguna función que les faltaba. En cambio esta plantilla ya tenía todo lo que necesitaba, ¡es súper completa!",
    name: "Veronica M.",
    date: "01/04/26",
    avatar: avatar1,
  },
  {
    title: "Moderna y funcional",
    text: "Moderna, clara y muy funcional. Me ahorra tiempo y ya no necesito andar buscando otras plantillas.",
    name: "Sebastian V.",
    date: "10/04/26",
    avatar: avatar2,
  },
  {
    title: "Diseño espectacular",
    text: "Esta plantilla está muy bien diseñada, todo se ve muy moderno y ordenado. Me gustó mucho que pueda personalizarla a los colores que más me gustan.",
    name: "Angela F.",
    date: "07/04/26",
    avatar: avatar3,
  },
  {
    title: "Muy fácil de usar",
    text: "Me encantó el diseño y la facilidad de uso. Se nota que está pensada para personas reales con problemas reales.",
    name: "Nicolas A.",
    date: "11/04/26",
    avatar: avatar4,
  },
  {
    title: "Completa para todo",
    text: "Por fin una plantilla que tiene todo lo que necesito. Ordené mis finanzas en un día. Vale totalmente la pena invertir en mejorar y ordenar mis finanzas.",
    name: "Adrian P.",
    date: "08/04/26",
    avatar: avatar5,
  },
];

function Testimonials() {
  return (
    <section className="w-full bg-[#efefef] px-5 py-16 font-['Montserrat',sans-serif] md:px-8 md:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-[1.15rem] font-medium uppercase tracking-[0.03em] text-[#18bf74] md:text-[1.25rem]">
            TESTIMONIOS
          </p>

          <h2 className="mx-auto max-w-[950px] text-[2.8rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#0f1728] sm:text-[3.5rem] md:text-[4.2rem]">
            Mira lo que nuestros clientes dicen
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={`${item.name}-${item.date}`}
              className="min-h-[285px] rounded-[20px] border border-[#dcebe3] bg-[#f8f8f8] px-7 py-7 shadow-[0_2px_10px_rgba(15,23,40,0.04)]"
            >
              <h3 className="mb-4 text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0f1728]">
                {item.title}
              </h3>

              <p className="mb-5 text-[1.12rem] font-normal leading-[1.75] tracking-[-0.01em] text-[#667085]">
                {item.text}
              </p>

              <div className="mb-5 text-[1.45rem] leading-none tracking-[0.12em] text-[#f4bf2a]">
                ★★★★★
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-[50px] w-[50px] rounded-full object-cover"
                />

                <div className="flex flex-col leading-none">
                  <strong className="text-[1.1rem] font-semibold tracking-[-0.02em] text-[#0f1728]">
                    {item.name}
                  </strong>
                  <span className="mt-2 text-[1rem] font-normal text-[#667085]">
                    {item.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-[20px] border border-[#dfe4e1] bg-[#f7f7f7] px-7 py-10 text-center md:px-12 md:py-12">
          <h3 className="mb-4 text-[1.6rem] font-semibold tracking-[-0.03em] text-[#0f1728] md:text-[1.8rem]">
            Aviso importante sobre este producto
          </h3>

          <p className="mx-auto max-w-[920px] text-[1.12rem] leading-[1.65] tracking-[-0.01em] text-[#667085] md:text-[1.2rem]">
            Este sitio{" "}
            <strong className="font-semibold text-[#556070]">
              no ofrece cuentas de ahorro, préstamos, oportunidades de inversión
              ni asesoría financiera
            </strong>
            . Solo vendemos una{" "}
            <strong className="font-semibold text-[#556070]">
              plantilla de finanzas personales en formato hoja de cálculo
              (archivo digital editable)
            </strong>{" "}
            para que tú mismo registres y organices tus ingresos, gastos,
            ahorros y pagos.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;