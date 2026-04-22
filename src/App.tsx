import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Gracias from "./pages/Gracias";
import MetaPageView from "./components/MetaPageView";
import RecentPurchasesToast from "./components/RecentPurchasesToast";
import Admin from "./pages/Admin";
import RouteTracker from "./components/RouteTracker";


function Home() {
  return (
    <>
      <RecentPurchasesToast />
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

function App() {
  return (
    <BrowserRouter>
    <MetaPageView />
    <RouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;