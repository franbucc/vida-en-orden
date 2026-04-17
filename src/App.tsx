import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import ModulesShowcase from "./components/ModulesShowcase";
import FeaturesVideos from "./components/FeaturesVideos";
import AnywhereSection from "./components/AnywhereSection";
import Testimonials from "./components/Testimonials";
import FinalOffer from "./components/FinalOffer";
import OfferSection from "./components/OfferSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Benefits />
      <ModulesShowcase />
      <FeaturesVideos />
      <AnywhereSection />
      <Testimonials />
      <FinalOffer />
      <OfferSection />
      <FaqSection />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;