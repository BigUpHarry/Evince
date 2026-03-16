"use client"

import Link from "next/link"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal"

export function AgentPlansSection() {
  const customisations = [
    {
      title: "Listing Volume",
      description: "Number of properties you list per month",
    },
    {
      title: "Turnaround",
      description: "Timeline requirements for your workflow",
    },
    {
      title: "Marketing Strategy",
      description: "How you present and promote properties",
    },
  ]

  return (
    <section className="py-24 md:py-40 px-6 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Feature Blocks */}
          <div className="order-2 md:order-1">
            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {customisations.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="bg-card rounded-2xl p-6 md:p-8 border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2">
            <ScrollReveal direction="right">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                For Agents
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} direction="right">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1]">
                Custom Plans for Agents
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
                Every agent markets property differently. Evince plans can be tailored 
                depending on how often you list and how you want your properties presented.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                We work with agents to create flexible plans that fit naturally into 
                their listing workflow while maintaining a consistent cinematic presentation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} direction="right">
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90"
                >
                  Customise Your Plan
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
