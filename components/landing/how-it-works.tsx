import { Camera, Clapperboard, Share2 } from "lucide-react"
import { HowItWorksAnimation } from "./how-it-works-animation"

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Send Your Assets",
    description:
      "Contact us and share your listing photos and floor plan. We handle the rest.",
  },
  {
    number: "02",
    icon: Clapperboard,
    title: "We Create the Magic",
    description:
      "We transform your assets into a cinematic walkthrough experience that evokes emotion.",
  },
  {
    number: "03",
    icon: Share2,
    title: "Publish & Impress",
    description:
      "Receive a premium marketing video ready for social media, listing pages, and paid ads.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 bg-card px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Process
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-card-foreground text-balance">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative group"
            >
              <div className="bg-background rounded-3xl p-8 md:p-10 h-full transition-all hover:shadow-lg">
                {/* Step number */}
                <span className="text-6xl font-serif text-border font-bold">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mt-6 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <step.icon size={24} className="text-primary" />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-card-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated visual */}
        <HowItWorksAnimation />
      </div>
    </section>
  )
}
