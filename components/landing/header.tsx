"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed w-full bg-card/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="font-serif text-xl text-foreground tracking-tight">
          Evince
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#work" className="text-muted-foreground hover:text-primary transition-colors">
            Recent Work
          </a>
          <a href="#how" className="text-muted-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/request-a-job" className="text-muted-foreground hover:text-primary transition-colors">
            Request a Job
          </Link>
          <Link
            href="/request-a-job"
            className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            Get In Touch
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
          <a
            href="#work"
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Recent Work
          </a>
          <a
            href="#how"
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            How It Works
          </a>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/request-a-job"
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Request a Job
          </Link>
          <Link
            href="/request-a-job"
            onClick={() => setMobileOpen(false)}
            className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all px-5 py-2.5 rounded-xl text-sm font-semibold text-center"
          >
            Get In Touch
          </Link>
        </nav>
      )}
    </header>
  )
}
