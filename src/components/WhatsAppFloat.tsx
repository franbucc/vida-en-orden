import { FaWhatsapp } from "react-icons/fa";

function WhatsAppFloat() {
  const phone = "5491158781815";
  const message =
    "Hola! Quiero más información sobre la plantilla Vida en Orden.";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_rgba(37,211,102,0.35)] transition duration-300 hover:scale-110 hover:shadow-[0_20px_45px_rgba(37,211,102,0.45)] md:bottom-7 md:right-7 md:h-24 md:w-24"
    >
      <FaWhatsapp className="text-[2.6rem] md:text-[3rem]" />
    </a>
  );
}

export default WhatsAppFloat;