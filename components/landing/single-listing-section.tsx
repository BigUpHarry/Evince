"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

export function SingleListingSection() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Single Listing
          </p>
          <h2 className="text-2xl md:text-4xl font-serif text-foreground">
            Perfect for testing Evince on your next property
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <div className="max-w-2xl mx-auto">
              <p className="text-muted-foreground leading-relaxed text-lg text-center">
                A cinematic listing film created from your professional photography to elevate the emotional impact of your property and help it stand out across listing portals, social media, and email marketing.
              </p>

              <p className="mt-6 text-muted-foreground leading-relaxed text-center">
                Each film also includes two social media ready edits so the property can easily be promoted across modern platforms.
              </p>

              <div className="mt-10 flex justify-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-serif font-bold text-foreground">$650</span>
                  <span className="text-muted-foreground">per listing</span>
                </div>
              </div>

              <ul className="mt-10 space-y-3 max-w-sm mx-auto">
                {[
                  "Cinematic listing film",
                  "Two social media ready edits",
                  "Professional sound design",
                  "Platform ready delivery",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 flex-shrink-0 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 text-center">
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90"
                >
                  Try It On Your Next Listing
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
