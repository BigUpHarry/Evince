"use client"

import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function HomepageCTA() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground text-balance">
            Ready to elevate your next listing?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Discover how Evince helps agents present their listings with cinematic impact using property photography transformed into immersive marketing films.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link
            href="/pricing"
            className="mt-10 inline-block px-10 py-4 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
          >
            Learn More About Our Services
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
