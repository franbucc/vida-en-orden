import { Link } from "react-router-dom";
import type { Ebook } from "../lib/ebooks";

function formatCurrency(value: number, currency: "ARS") {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

type Props = {
  ebook: Ebook;
};

function EbookCard({ ebook }: Props) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#e5e7eb] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition hover:-translate-y-1">
      <div className="aspect-[4/5] w-full overflow-hidden bg-[#f4f4f5]">
        <img
          src={ebook.cover}
          alt={ebook.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <p className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#18bf74]">
          Ebook digital
        </p>

        <h3 className="mt-2 text-[1.5rem] font-bold tracking-[-0.03em] text-[#0f1728]">
          {ebook.title}
        </h3>

        <p className="mt-3 text-[1rem] leading-[1.65] text-[#667085]">
          {ebook.shortDescription}
        </p>

        <div className="mt-5 flex items-end gap-3">
          {ebook.oldPrice && (
            <span className="text-[1rem] font-semibold text-[#98a2b3] line-through">
              {formatCurrency(ebook.oldPrice, ebook.currency)}
            </span>
          )}

          <span className="text-[1.7rem] font-extrabold tracking-[-0.04em] text-[#18bf74]">
            {formatCurrency(ebook.price, ebook.currency)}
          </span>
        </div>

        <Link
          to={`/ebooks/${ebook.slug}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-[18px] bg-[#0f1728] px-6 py-4 text-center text-[0.98rem] font-bold uppercase tracking-[0.03em] text-white transition hover:bg-[#1b2437]"
        >
          Ver ebook
        </Link>
      </div>
    </article>
  );
}

export default EbookCard;