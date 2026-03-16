"use client"

import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function AgencyPartnershipsSection() {
  return (
    <section className="py-32 md:py-48 px-6 bg-foreground text-background">
      <div className="max-w-5xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-6">
            For Agencies
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1]">
            Agency Partnerships
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-10 text-xl md:text-2xl text-background/80 leading-relaxed max-w-3xl mx-auto">
            Some agencies choose to integrate Evince across their marketing to create 
            a consistent cinematic standard across every property they represent.
          </p>
          <p className="mt-6 text-lg md:text-xl text-background/70 leading-relaxed max-w-3xl mx-auto">
            We partner with agencies to design tailored solutions that fit their brand 
            and listing volume.
          </p>
        </ScrollReveal>

        {/* Partnership Features */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 flex flex-wrap justify-center gap-4 md:gap-6">
            {["Volume pricing", "Branding integration", "Priority turnaround"].map((feature) => (
              <span
                key={feature}
                className="px-6 py-3 rounded-full border border-background/30 text-background/90 text-sm md:text-base"
              >
                {feature}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Button */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16">
            <Link
              href="/contact"
              className="inline-block px-12 py-5 rounded-xl font-semibold text-lg transition-all bg-secondary text-secondary-foreground hover:opacity-90"
            >
              Grow With Us
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
