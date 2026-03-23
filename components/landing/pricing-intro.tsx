"use client"

import { ScrollReveal } from "./scroll-reveal"

export function PricingIntro() {
  return (
    <section className="py-24 md:py-32 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* Main content */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1]">
              Cinematic property videos.
              <br />
              <span className="text-primary">No filming required.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-10 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We turn your listing photos into high-converting video content — fast. 
              Built for agents who want consistent, high-quality marketing without 
              the delays or production costs.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              From single listings to full agency rollouts, Evince adapts to your workflow.
            </p>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif text-foreground">24hr</p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Average turnaround
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif text-foreground">100%</p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Created from your photos
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-serif text-foreground">2</p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground">
                Video formats per listing
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                1 full-length + 1 social-ready
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
