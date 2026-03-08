"use client"

import Link from "next/link"
import { Mail, Linkedin } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* CTA Band */}
      <div className="py-20 md:py-28 px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-serif text-card-foreground text-balance max-w-3xl mx-auto">
            Ready to make an unforgettable impression?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {"Let's create a cinematic experience that sells your listing before the first showing."}
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all px-8 py-4 rounded-2xl text-lg font-semibold"
            >
              <Mail size={20} />
              Get In Touch
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {"Evince. All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@evince.video"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email us"
            >
              <Mail size={18} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
