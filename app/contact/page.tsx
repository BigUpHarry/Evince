import Link from "next/link"
import Image from "next/image"
import { Mail, Linkedin, Phone, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Contact | Evince",
  description:
    "Get in touch with Evince to elevate your property listings with cinematic video.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Minimal Header */}
      <header className="fixed w-full bg-card/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link
            href="/"
            className="font-serif text-xl text-foreground tracking-tight"
          >
            Evince
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Contact Content */}
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-6">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground text-balance">
            {"Let's Elevate Your Listings"}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {"Send us a brief about your next listing and we'll respond within 24 hours."}
          </p>
        </div>

        <div className="max-w-xl mx-auto mt-16 grid gap-8">
          {/* Email */}
          <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail size={22} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <a
                href="mailto:evince.help@gmail.com"
                className="text-foreground font-semibold hover:text-primary transition-colors"
              >
                evince.help@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Phone size={22} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <a
                href="tel:+64 0275057536"
                className="text-foreground font-semibold hover:text-primary transition-colors"
              >
                +64 0275057536
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Linkedin size={22} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">LinkedIn</p>
            </div>
            <div className="flex gap-8 justify-center">
              <a
                href="https://www.linkedin.com/in/harry-wood-a959ab337/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 group"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all">
                  <Image
                    src="/images/harry-wood.jpg"
                    alt="Harry Wood"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                  Harry Wood
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/andre-nwofor-71669a34b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 group"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary transition-all">
                  <Image
                    src="/images/andre-nwofor.jpg"
                    alt="Andre Nwofor"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-foreground font-semibold text-sm group-hover:text-primary transition-colors">
                  Andre Nwofor
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* CTA back */}
        <div className="max-w-xl mx-auto mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
