"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const CYCLE = 4.5
const PAUSE = 0.6

// Icons positioned at 1/6, 1/2, 5/6 of 600 = 100, 300, 500
const X1 = 100
const X2 = 300
const X3 = 500
const Y = 45

// Burst lines radiating from the heart
const burstLines = [
  { x2: 0, y2: -18 },   // up
  { x2: 14, y2: -12 },  // upper-right
  { x2: 16, y2: 4 },    // right
  { x2: 10, y2: 16 },   // lower-right
  { x2: -10, y2: 16 },  // lower-left
  { x2: -16, y2: 4 },   // left
  { x2: -14, y2: -12 }, // upper-left
]

export function HowItWorksAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.4 })

  return (
    <div ref={ref} className="mt-12">
      {isInView && (
        <svg
          viewBox="0 0 600 90"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connecting line: split into two segments that stop before the heart */}
          <line x1={X1 + 20} y1={Y} x2={X2 - 22} y2={Y} stroke="var(--border)" strokeWidth={1.5} />
          <line x1={X2 + 22} y1={Y} x2={X3 - 20} y2={Y} stroke="var(--border)" strokeWidth={1.5} />

          {/* ---- Step 1: Upload icon ---- */}
          <g>
            <rect x={X1 - 18} y={Y - 15} width="36" height="30" rx="4" stroke="var(--muted-foreground)" strokeWidth={1.5} fill="none" />
            <line x1={X1} y1={Y + 8} x2={X1} y2={Y - 6} stroke="var(--muted-foreground)" strokeWidth={1.5} strokeLinecap="round" />
            <polyline points={`${X1 - 5},${Y - 2} ${X1},${Y - 8} ${X1 + 5},${Y - 2}`} stroke="var(--muted-foreground)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Animated thumbnails */}
            {[
              { delay: 0, sx: X1 + 60, sy: Y - 20 },
              { delay: 0.15, sx: X1 + 70, sy: Y - 3 },
              { delay: 0.3, sx: X1 + 50, sy: Y + 10 },
            ].map((t, i) => (
              <motion.rect
                key={i}
                x={t.sx}
                y={t.sy}
                width="14"
                height="10"
                rx="2"
                fill="var(--primary)"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.5, 0.5, 0],
                  x: [0, 0, -(t.sx - (X1 - 7)), -(t.sx - (X1 - 7))],
                  y: [0, 0, -(t.sy - (Y - 7)), -(t.sy - (Y - 7))],
                }}
                transition={{
                  duration: 1.1,
                  delay: t.delay,
                  times: [0, 0.15, 0.7, 0.85],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: CYCLE - 1.1 + PAUSE,
                }}
              />
            ))}

            {/* Cursor */}
            <motion.path
              d="M0 0l2 11 3.5-3.5 4.5 0-7-7z"
              fill="var(--foreground)"
              fillOpacity={0.6}
              initial={{ opacity: 0, x: X1 + 68, y: Y - 15 }}
              animate={{
                opacity: [0, 1, 1, 1, 0],
                x: [X1 + 68, X1 + 58, X1 + 5, X1 + 5, X1 + 5],
                y: [Y - 15, Y - 13, Y - 5, Y - 5, Y - 5],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.1, 0.55, 0.8, 0.95],
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: CYCLE - 1.2 + PAUSE,
              }}
            />
          </g>

          {/* ---- Step 2: Heart icon ---- */}
          <g>
            {/* Heart shape with white fill to mask the line behind it */}
            <motion.path
              d={`M${X2} ${Y + 18}s-18-12-18-23a10 10 0 0120 0 10 10 0 0120 0c0 11-18 23-18 23z`}
              stroke="var(--muted-foreground)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="var(--card)"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1, 1.2, 0.95, 1.2, 0.95, 1] }}
              transition={{
                duration: 0.9,
                delay: 1.8,
                times: [0, 0.05, 0.2, 0.35, 0.5, 0.65, 1],
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: CYCLE - 0.9 + PAUSE,
              }}
              style={{ transformOrigin: `${X2}px ${Y}px` }}
            />

            {/* Burst lines shooting outward on the bounce */}
            {burstLines.map((line, i) => (
              <motion.line
                key={i}
                x1={X2}
                y1={Y}
                x2={X2 + line.x2 * 0.6}
                y2={Y + line.y2 * 0.6}
                stroke="var(--primary)"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0, 0.8, 0],
                  x1: [X2, X2, X2 + line.x2 * 0.5, X2 + line.x2 * 0.8],
                  y1: [Y, Y, Y + line.y2 * 0.5, Y + line.y2 * 0.8],
                  x2: [X2, X2, X2 + line.x2 * 1.1, X2 + line.x2 * 1.6],
                  y2: [Y, Y, Y + line.y2 * 1.1, Y + line.y2 * 1.6],
                }}
                transition={{
                  duration: 0.5,
                  delay: 1.9 + i * 0.02,
                  times: [0, 0.1, 0.5, 1],
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: CYCLE - 0.5 + PAUSE,
                }}
              />
            ))}
          </g>

          {/* ---- Step 3: Video camera icon ---- */}
          <g>
            <motion.g
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: [0.85, 0.85, 1, 1],
                opacity: [0, 0, 1, 1],
              }}
              transition={{
                duration: 1,
                delay: 2.9,
                times: [0, 0.1, 0.5, 1],
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: CYCLE - 1 + PAUSE,
              }}
              style={{ transformOrigin: `${X3}px ${Y}px` }}
            >
              <rect x={X3 - 16} y={Y - 12} width="30" height="24" rx="3" stroke="var(--muted-foreground)" strokeWidth={1.5} fill="none" />
              <path d={`M${X3 + 14} ${Y - 5}l10-5v20l-10-5z`} stroke="var(--muted-foreground)" strokeWidth={1.5} strokeLinejoin="round" fill="none" />
            </motion.g>

            {/* Play triangle */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1] }}
              transition={{
                duration: 1,
                delay: 3.3,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: CYCLE - 1 + PAUSE,
              }}
            >
              <circle cx={X3 - 1} cy={Y} r="7" fill="var(--primary)" fillOpacity={0.15} />
              <path d={`M${X3 - 4} ${Y - 4}l7 4-7 4z`} fill="var(--primary)" />
            </motion.g>
          </g>

          {/* ---- Traveling pulses ---- */}
          <motion.circle
            r="4"
            cy={Y}
            fill="var(--primary)"
            initial={{ cx: X1 + 20, opacity: 0 }}
            animate={{
              cx: [X1 + 20, X1 + 20, X2 - 22, X2 - 22],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: 1.2,
              times: [0, 0.05, 0.9, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: CYCLE - 0.8 + PAUSE,
            }}
          />
          <motion.circle
            r="4"
            cy={Y}
            fill="var(--primary)"
            initial={{ cx: X2 + 22, opacity: 0 }}
            animate={{
              cx: [X2 + 22, X2 + 22, X3 - 20, X3 - 20],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.8,
              delay: 2.5,
              times: [0, 0.05, 0.9, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: CYCLE - 0.8 + PAUSE,
            }}
          />

          {/* Step labels */}
          <text x={X1} y="82" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-sans)">Upload</text>
          <text x={X2} y="82" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-sans)">Create</text>
          <text x={X3} y="82" textAnchor="middle" fill="var(--muted-foreground)" fontSize="9" fontFamily="var(--font-sans)">Deliver</text>
        </svg>
      )}
    </div>
  )
}
