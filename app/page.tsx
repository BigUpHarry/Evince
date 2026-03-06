import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { RecentWork } from "@/components/landing/recent-work"
import { HowItWorks } from "@/components/landing/how-it-works"
import { BeforeAfter } from "@/components/landing/before-after"
import { SocialMediaReady } from "@/components/landing/social-media-ready"
import { WhyEvince } from "@/components/landing/why-evince"
import { Pricing } from "@/components/landing/pricing"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <div className="bg-background text-foreground scroll-smooth">
      <Header />
      <main>
        <Hero />
        <RecentWork />
        <HowItWorks />
        <BeforeAfter />
        <SocialMediaReady />
        <WhyEvince />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

