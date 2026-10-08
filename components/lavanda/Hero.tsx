"use client"

// ECC: Frontend Skill — Editorial aesthetic + motion fade-up
// ECC: Reviewer — a11y: роли, heading hierarchy, alt texts

import React from "react"
import { motion } from "motion/react"
import { MapPin, Sparkles, Star, ArrowRight } from "lucide-react"
import { lavandaData } from "@/lib/lavanda-data"
import { playOpenSound } from "@/lib/sound"

const HERO_IMAGE = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

interface HeroProps {
  onBookingOpen: () => void
}

export function LavandaHero({ onBookingOpen }: HeroProps) {
  const { studio } = lavandaData

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background soft gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0eaff] via-[#faf7ff] to-[#fdf9ff] dark:from-[#1a0f2e] dark:via-[#12091e] dark:to-[#0e0718] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left: Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* Studio badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#c9bdf0] dark:border-[#3a2a5a] bg-white/70 dark:bg-[#1a0f2e]/70 text-[#7c6f9f] dark:text-[#b0a2d8] text-xs font-semibold uppercase tracking-widest"
          >
            <span>🌿</span>
            Студия красоты с 2019 года
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#2a1f3d] dark:text-white tracking-tight leading-[1.15] mb-6"
          >
            {studio.headline}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
            className="text-[#6b5f88] dark:text-[#a898c8] text-base md:text-lg leading-relaxed max-w-md mb-8"
          >
            {studio.subline}
          </motion.p>

          {/* Badges */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.3}
            variants={fadeUp}
            className="flex flex-wrap justify-center md:justify-start gap-3 mb-10"
          >
            <Chip icon={MapPin} text={studio.subway} />
            <Chip icon={Sparkles} text={`${studio.mastersCount} мастеров`} />
            <Chip icon={Star} text={`Рейтинг ${studio.rating}`} />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { playOpenSound(); onBookingOpen() }}
              className="flex items-center justify-center gap-2 h-14 px-8 bg-[#7c6f9f] hover:bg-[#6b5f88] dark:bg-[#9d8fc5] dark:hover:bg-[#b0a2d8] text-white font-medium rounded-2xl text-base shadow-xl shadow-[#7c6f9f]/25 dark:shadow-[#7c6f9f]/10 transition-all"
            >
              Записаться
              <ArrowRight className="w-4 h-4 opacity-70" />
            </motion.button>
            <a
              href={studio.phone}
              className="flex items-center justify-center h-14 px-6 rounded-2xl border border-[#c9bdf0] dark:border-[#3a2a5a] text-[#7c6f9f] dark:text-[#b0a2d8] font-medium hover:bg-[#ede9f7] dark:hover:bg-[#1a0f2e] transition-colors"
            >
              {studio.phoneDisplay}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.5}
            variants={fadeUp}
            className="flex gap-8 mt-12 pt-8 border-t border-[#e0d9f5]/70 dark:border-[#2a1f3d] w-full md:w-auto"
          >
            {[
              { value: studio.clientsServed, label: "довольных клиентов" },
              { value: studio.mastersCount, label: "мастеров в команде" },
              { value: studio.rating + " ★", label: "средний рейтинг" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-semibold text-[#2a1f3d] dark:text-white">{stat.value}</div>
                <div className="text-xs text-[#9d8fc5] dark:text-[#7a6a9a] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="hidden md:block relative"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#ede9f7] dark:bg-[#1a0f2e] shadow-2xl border-4 border-white/60 dark:border-[#2a1f3d]/60 rotate-1 hover:rotate-0 transition-transform duration-700">
            <img
              src={HERO_IMAGE}
              alt="Студия красоты Лаванда"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f3d]/40 to-transparent dark:from-[#0e0718]/60" />
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-4 -left-8 bg-white dark:bg-[#1a0f2e] border border-[#e0d9f5] dark:border-[#2a1f3d] rounded-2xl px-5 py-4 shadow-xl">
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#f5c842] text-[#f5c842]" />)}
            </div>
            <div className="text-sm font-semibold text-[#2a1f3d] dark:text-white">«Лучшая студия Москвы»</div>
            <div className="text-xs text-[#9d8fc5] dark:text-[#7a6a9a]">– Алина М., постоянная клиентка</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Chip({ icon: Icon, text }: { icon: React.ElementType, text: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#1a0f2e] border border-[#e0d9f5] dark:border-[#2a1f3d] text-[#7c6f9f] dark:text-[#b0a2d8] text-xs font-medium shadow-sm">
      <Icon className="w-3.5 h-3.5" />
      {text}
    </div>
  )
}
