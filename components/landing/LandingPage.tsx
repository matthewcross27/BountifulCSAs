import "./landing.css";
// TEMPORARY: visual-direction explorer; see directions.css for how to remove.
import "./directions.css";
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
import { DirectionSwitcher } from "./DirectionSwitcher";
import type { Direction } from "./directions";

export function LandingPage({ direction = null }: { direction?: Direction | null }) {
  return (
    <div className="landing" data-ui={direction ?? undefined}>
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
      <DirectionSwitcher active={direction} />
    </div>
  );
}
