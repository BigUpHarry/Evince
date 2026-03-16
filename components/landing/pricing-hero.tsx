"use client"

import { motion } from "framer-motion"

export function PricingHero() {
  return (
    <section className="pt-40 pb-24 md:pt-52 md:pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-6"
        >
          Pricing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.05]"
        >
          Elevate your listings.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-8 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
        >
          Flexible options designed to fit how you work, whether you are testing 
          Evince on a single property or integrating cinematic marketing across 
          your entire portfolio.
        </motion.p>
      </div>
    </section>
  )
}
