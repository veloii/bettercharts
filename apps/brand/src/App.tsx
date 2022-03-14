import React from "react";
import HeroSection from "./components/HeroSection";
import HomeworkCardSection from "./components/HomeworkCardSection";
import LogoCloudSection from "./components/LogoCloudSection";
import CTASection from "./components/CTASection";
import FooterSection from "./components/FooterSection";
import ScrollAnimation from "react-animate-on-scroll";

function App() {
  return (
    <div>
      <div className="bg-white">
        <main>
          <ScrollAnimation animateIn="fadeInUp">
            <HeroSection />
          </ScrollAnimation>

          <HomeworkCardSection />
          <LogoCloudSection />
          
          <ScrollAnimation animateIn="fadeInUp">
            <CTASection />
          </ScrollAnimation>
        </main>
        <FooterSection />
      </div>
    </div>
  );
}

export default App;
