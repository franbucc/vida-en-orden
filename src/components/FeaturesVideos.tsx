import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

function FeaturesVideos() {
  return (
    <section className="w-full bg-[#f3f3f3] px-4 py-20 font-['Montserrat',sans-serif] md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-12 text-center md:mb-14">
          <p className="mb-3 text-[1.05rem] font-medium text-[#18bf74] md:text-[1.2rem]">
            Descubre
          </p>

          <h2 className="mb-5 text-[2.2rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#111827] sm:text-[3rem] md:text-[4.2rem] lg:text-[5rem]">
            TODAS LAS FUNCIONES de la
            <br />
            plantilla de Finanzas
          </h2>

          <p className="text-[1.6rem] font-medium md:text-[2rem]">👇 👇 👇</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
            <video
              className="block h-full w-full"
              src={video1}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>

          <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
            <video
              className="block h-full w-full"
              src={video2}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesVideos;