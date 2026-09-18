import "./landing.css";
import { LandingHeader } from "./LandingHeader";
import { Hero } from "./Hero";
import { FounderLetter } from "./FounderLetter";
import { DemoSection } from "./DemoSection";
import { ProblemSection } from "./ProblemSection";
import { HowItWorks } from "./HowItWorks";
import { LookInside } from "./LookInside";
import { OurStandard } from "./OurStandard";
import { WhoItsFor } from "./WhoItsFor";
import { ClosingCta } from "./ClosingCta";
import { LandingFooter } from "./LandingFooter";

export function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-glow" aria-hidden="true" />
      <LandingHeader />
      <main>
        <Hero />
        <FounderLetter />
        <DemoSection />
        <ProblemSection />
        <HowItWorks />
        <LookInside />
        <OurStandard />
        <WhoItsFor />
        <ClosingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
