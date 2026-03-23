import { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PricingHero } from "@/components/landing/pricing-hero"
import { PricingIntro } from "@/components/landing/pricing-intro"
import { AgentPlansSection } from "@/components/landing/agent-plans-section"
import { AgencyPartnershipsSection } from "@/components/landing/agency-partnerships-section"

export const metadata: Metadata = {
  title: "Pricing | Evince",
  description:
    "Cinematic property videos created from your listing photos. Custom plans for agents and agency partnerships.",
}

export default function PricingPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <PricingHero />
        <PricingIntro />
        <AgentPlansSection />
        <AgencyPartnershipsSection />
      </main>
      <Footer />
    </div>
  )
}
