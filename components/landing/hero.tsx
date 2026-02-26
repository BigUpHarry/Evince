import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 px-6 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-property.jpg"
          alt="Luxury property interior with warm golden sunlight"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-6">
          Cinematic Property Videos
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight text-balance">
          First impressions become emotional connections
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          Cinematic property videos crafted from your listing photos. Let buyers feel the space before they step inside.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            View Recent Work
          </a>
          <a
            href="#how"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium"
          >
            Learn how it works
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
