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
import EbooksHome from "./pages/EbooksHome";
import EbookCalma from "./pages/EbookCalma";
import EbookAmor from "./pages/EbookAmor";
import EbookAbraza from "./pages/EbookAbraza";
import ScrollToTop from "./components/ScrollToTop";


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
    <ScrollToTop />
    <MetaPageView />
    <RouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ebooks" element={<EbooksHome />} />
<Route path="/ebooks/ebook-calma" element={<EbookCalma />} />
<Route path="/ebooks/ebook-amor-propio" element={<EbookAmor />} />
<Route path="/ebooks/ebook-abraza" element={<EbookAbraza />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;