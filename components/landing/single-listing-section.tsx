"use client"

import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function SingleListingSection() {
  return (
    <section className="py-24 md:py-40 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Content */}
          <div>
            <ScrollReveal>
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                Start Here
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1]">
                Try Evince on Your Next Listing
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
                The simplest way to experience Evince is on a single property.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                We transform your professional listing photography into a cinematic 
                property film designed to elevate the emotional impact of your listing 
                and help it stand out across modern marketing channels.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Price & Features */}
          <div>
            <ScrollReveal delay={0.15} direction="right">
              <div className="bg-card rounded-3xl p-10 md:p-12 shadow-lg border border-border">
                {/* Price */}
                <div className="mb-10">
                  <span className="text-6xl md:text-7xl font-serif text-foreground">$650</span>
                  <span className="text-muted-foreground text-lg ml-3">per listing</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10">
                  {[
                    "Cinematic listing film",
                    "Two social media ready edits included",
                    "Optimised for listing portals and social media",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Optional Add-on */}
                <div className="pt-8 border-t border-border mb-10">
                  <p className="text-sm text-muted-foreground mb-2">Optional upgrade</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Visual Enhancement</p>
                      <p className="text-sm text-muted-foreground">
                        Virtual staging or additional cinematic detail
                      </p>
                    </div>
                    <span className="text-2xl font-serif text-primary">+$200</span>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href="/contact"
                  className="block w-full text-center px-8 py-4 rounded-xl font-semibold transition-all bg-secondary text-secondary-foreground hover:opacity-90"
                >
                  Start With a Listing
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
