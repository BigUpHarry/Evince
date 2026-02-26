"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"

export function BeforeAfter() {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percent)
  }, [])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      updatePosition(e.clientX)
    },
    [updatePosition]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return
      updatePosition(e.clientX)
    },
    [updatePosition]
  )

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Visual Enhancement
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground text-balance">
            See the Difference
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Premium Visual Enhancement transforms empty spaces into aspirational
            living environments.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl select-none touch-none cursor-ew-resize"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* After image (full, behind) */}
          <Image
            src="/images/after-staging.jpg"
            alt="Room after premium visual enhancement with furniture and styling"
            fill
            className="object-cover"
            priority
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src="/images/before-staging.jpg"
              alt="Empty room before visual enhancement"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-card/80"
            style={{ left: `${position}%` }}
          />

          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            style={{ left: `${position}%` }}
          >
            <div className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm shadow-lg flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-foreground"
              >
                <path
                  d="M5 3L2 8L5 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 3L14 8L11 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-foreground/60 backdrop-blur-sm text-card text-xs font-medium px-3 py-1.5 rounded-full pointer-events-none">
            Before
          </div>
          <div className="absolute top-4 right-4 bg-foreground/60 backdrop-blur-sm text-card text-xs font-medium px-3 py-1.5 rounded-full pointer-events-none">
            After
          </div>
        </div>
      </div>
    </section>
  )
}
