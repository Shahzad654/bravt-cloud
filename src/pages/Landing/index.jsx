import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Locations from "./Locations";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";

const Landing = () => {
  return (
    <div className="tailwind-layout">
      <Header />
      <Hero />
      <Locations />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Landing;
