import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { RecentWork } from "@/components/landing/recent-work"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Pricing } from "@/components/landing/pricing"
import { BeforeAfter } from "@/components/landing/before-after"
import { Footer } from "@/components/landing/footer"

export default function Page() {
  return (
    <div className="bg-background text-foreground scroll-smooth">
      <Header />
      <main>
        <Hero />
        <RecentWork />
        <HowItWorks />
        <Pricing />
        <BeforeAfter />
      </main>
      <Footer />
    </div>
  )
}


