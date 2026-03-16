"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal"

export function AgentPlansSection() {
  const plans = [
    {
      title: "Professional Agent",
      price: "$2,400",
      period: "per quarter",
      description: "Perfect for individual agents managing multiple listings.",
      features: [
        "Up to 8 cinematic videos per quarter",
        "Priority turnaround (5-7 business days)",
        "Social media ready formats included",
        "Email support",
      ],
    },
    {
      title: "Agency Studio",
      price: "$6,900",
      period: "per quarter",
      description: "For growing teams with consistent video needs.",
      features: [
        "Up to 24 cinematic videos per quarter",
        "24-hour priority turnaround",
        "Custom branding options",
        "Dedicated account manager",
        "Advanced analytics dashboard",
      ],
    },
  ]

  return (
    <section className="py-32 md:py-48 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            For Agents
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-card-foreground leading-tight">
            Agent Plans
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Quarterly subscriptions designed to scale with your business.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.2}>
          {plans.map((plan) => (
            <StaggerItem key={plan.title}>
              <div className="rounded-3xl p-8 md:p-10 bg-background border-2 border-primary/20 h-full transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-2">
                <h3 className="text-2xl font-semibold text-card-foreground">
                  {plan.title}
                </h3>
                <p className="mt-3 text-muted-foreground text-sm">
                  {plan.description}
                </p>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl font-serif font-bold text-card-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={20} className="mt-0.5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-10 block w-full text-center px-6 py-3.5 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90"
                >
                  Get Started
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
