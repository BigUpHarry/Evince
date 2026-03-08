"use client"

import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal"

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Pricing
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground text-balance">
            Simple, Transparent Pricing
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.15}>
          {/* Plan 1 - Cinematic Listing Video */}
          <StaggerItem>
            <div className="rounded-3xl p-8 md:p-10 bg-card text-card-foreground shadow-lg border border-border h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Cinematic Listing Video
              </h3>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-serif font-bold">$650</span>
                <span className="text-sm text-muted-foreground">per video</span>
              </div>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                One cinematic property video crafted from your listing photos.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Cinematic motion edit",
                  "Sound design",
                  "Platform-ready delivery",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Optional upgrade */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-muted-foreground" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Optional Upgrade
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Premium Visual Enhancement
                  </span>
                  <span className="text-sm text-muted-foreground">— $200</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Digital staging, lighting refinement, and image polishing to
                  elevate presentation.
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-8 block text-center px-6 py-3.5 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90"
              >
                Get Started
              </Link>
            </div>
          </StaggerItem>

          {/* Plan 2 - Professional Studio Plan */}
          <StaggerItem>
            <div className="relative rounded-3xl p-8 md:p-10 bg-primary text-primary-foreground shadow-2xl ring-1 ring-primary/10 scale-[1.02] h-full transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
              {/* Best Value badge */}
              <span className="absolute top-6 right-6 text-[11px] uppercase tracking-wider font-semibold bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                Best Value
              </span>

              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Professional Studio Plan
              </h3>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-serif font-bold">$2,600</span>
                <span className="text-sm text-primary-foreground/70">/ month</span>
              </div>

              <p className="mt-4 leading-relaxed text-primary-foreground/80">
                Everything you need for a consistent, premium listing presence.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "5 Cinematic Listing Videos per month",
                  "Priority turnaround",
                  "Premium Visual Enhancement included on all properties",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 flex-shrink-0 text-secondary" />
                    <span className="text-sm text-primary-foreground/90">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-8 block text-center px-6 py-3.5 rounded-xl font-semibold transition-all bg-secondary text-secondary-foreground hover:opacity-90"
              >
                Get Started
              </Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
