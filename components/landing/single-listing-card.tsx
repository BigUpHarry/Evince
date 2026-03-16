"use client"

import Link from "next/link"
import { Check, Sparkles } from "lucide-react"

interface SingleListingCardProps {
  buttonText?: string
  buttonHref?: string
}

export function SingleListingCard({
  buttonText = "Get Started",
  buttonHref = "/contact",
}: SingleListingCardProps) {
  return (
    <div className="rounded-3xl p-8 md:p-10 bg-card text-card-foreground shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 max-w-lg mx-auto">
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
        href={buttonHref}
        className="mt-8 block text-center px-6 py-3.5 rounded-xl font-semibold transition-all bg-primary text-primary-foreground hover:opacity-90"
      >
        {buttonText}
      </Link>
    </div>
  )
}
