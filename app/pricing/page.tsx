import { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { PricingHero } from "@/components/landing/pricing-hero"
import { SingleListingSection } from "@/components/landing/single-listing-section"
import { AgentPlansSection } from "@/components/landing/agent-plans-section"
import { AgencyPartnershipsSection } from "@/components/landing/agency-partnerships-section"

export const metadata: Metadata = {
  title: "Pricing | Evince",
  description:
    "Flexible pricing options for cinematic property videos. Start with a single listing or scale with agent and agency plans.",
}

export default function PricingPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <PricingHero />
        <SingleListingSection />
        <AgentPlansSection />
        <AgencyPartnershipsSection />
      </main>
      <Footer />
    </div>
  )
}

