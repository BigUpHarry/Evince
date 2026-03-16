"use client"

import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export function AgentPlansSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Agent Plans
          </p>
          <h2 className="text-2xl md:text-4xl font-serif text-foreground">
            For agents who list regularly
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-lg border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="max-w-2xl mx-auto">
              <p className="text-muted-foreground leading-relaxed text-lg text-center">
                For agents who list regularly and want consistent cinematic marketing across their properties.
              </p>

              <p className="mt-6 text-muted-foreground leading-relaxed text-center">
                If you are listing multiple homes each month, Evince can become part of your regular marketing strategy. Agent plans make it easy to maintain a consistent cinematic presentation across your listings while keeping pricing efficient.
              </p>

              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Plans can be tailored depending on:
                </p>
                <ul className="flex flex-wrap justify-center gap-3">
                  {[
                    "Number of listings per month",
                    "Turnaround requirements",
                    "Marketing strategy",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-sm bg-muted text-foreground px-5 py-2.5 rounded-full font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/contact"
                  className="inline-block px-10 py-4 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
