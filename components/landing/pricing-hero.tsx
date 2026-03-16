"use client"

import { ScrollReveal } from "./scroll-reveal"

export function PricingHero() {
  return (
    <section className="pt-32 pb-16 md:pt-44 md:pb-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground">
            Our Pricing
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Our pricing is designed to give agents flexible ways to elevate their listings while maintaining exceptional quality and turnaround. Whether you are trying Evince on a single property or integrating cinematic marketing across multiple listings, we offer options that scale with your needs.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
