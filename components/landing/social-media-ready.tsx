import Image from "next/image"

const reelThumbnails = [
  {
    id: 1,
    src: "/images/reel-thumbnail-1.jpg",
    alt: "Luxury home entrance at dusk",
  },
  {
    id: 2,
    src: "/images/reel-thumbnail-2.jpg",
    alt: "Modern outdoor living space",
  },
  {
    id: 3,
    src: "/images/reel-thumbnail-3.jpg",
    alt: "Real estate lifestyle content",
  },
]

export function SocialMediaReady() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* Text content on the left */}
          <div className="lg:max-w-lg">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-8">
              Social Media Ready.
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Most buyers first discover homes while scrolling on social media, not traditional listing websites. That’s why every Evince property film comes with two vertical videos optimised for Instagram Reels, TikTok, and YouTube Shorts, in addition to the main cinematic listing video.

              </p>
              <p>
                These ready-to-post social media videos let agents showcase listings with cinematic storytelling, attract more potential buyers, and increase engagement all without spending extra time on editing or production. By providing multiple formats in one package, agents can promote listings effectively across platforms and make every property stand out.
              </p>
            </div>
          </div>

          {/* Three vertical thumbnails on the right */}
          <div className="flex gap-3 md:gap-4 justify-center lg:justify-end">
            {reelThumbnails.map((thumb) => (
              <div
                key={thumb.id}
                className="relative w-[100px] md:w-[140px] lg:w-[160px] aspect-[9/16] rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
