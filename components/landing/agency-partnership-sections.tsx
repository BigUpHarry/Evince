"use client"

import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function AgencyPartnershipsSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Agency Partnerships
          </p>
          <h2 className="text-2xl md:text-4xl font-serif text-foreground">
            For agencies and teams
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="max-w-2xl mx-auto">
              <p className="text-primary-foreground/90 leading-relaxed text-lg text-center">
                For agencies or teams looking to elevate their overall brand presence across multiple listings.
              </p>

              <p className="mt-6 text-primary-foreground/90 leading-relaxed text-center">
                Some agencies choose to integrate Evince across their marketing to create a consistent cinematic standard across every property they represent. Partnerships allow us to work closely with your brand and provide tailored solutions depending on your listing volume and marketing goals.
              </p>

              <div className="mt-10 pt-8 border-t border-primary-foreground/20">
                <p className="text-sm text-primary-foreground/70 text-center mb-6">
                  This may include:
                </p>
                <ul className="flex flex-wrap justify-center gap-3">
                  {[
                    "Volume pricing",
                    "Branding integration",
                    "Priority turnaround",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-sm bg-primary-foreground/10 text-primary-foreground px-5 py-2.5 rounded-full font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 rounded-xl font-semibold transition-all bg-secondary text-secondary-foreground hover:opacity-90"
                >
                  Grow With Us
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
