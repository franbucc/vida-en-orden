import heroImage from "/assets/hero-finanzas.webp";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="hero-top-text">
          ¿Sientes que el dinero desaparece cada mes?
        </p>

        <h1 className="hero-title">
          Plantilla de
          <br />
          Finanzas Personales
        </h1>

        <p className="hero-description">
          La forma más <span>simple</span> de controlar tus ingresos y gastos,
          <br />
          usada por miles de personas.
        </p>

        <div className="hero-image-wrap">
          <img
            src={heroImage}
            alt="Plantilla de finanzas personales"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;