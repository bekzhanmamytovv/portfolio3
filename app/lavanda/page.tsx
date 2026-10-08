"use client"

// ============================================================
// PAGE ORCHESTRATOR — Студия красоты «Лаванда»
//
// ECC Architecture Patterns applied:
// ─ Planner:    чёткое разделение на независимые секции
// ─ Architect:  Smart Container / Dumb Presentation
//              "use client" — только здесь, на уровне оркестратора
//              и в компонентах с интерактивностью
// ─ Reviewer:   семантика (<main>, <section id>), aria landmarks,
//              a11y focus management в BookingDrawer
// ─ Frontend:   Editorial Lavender aesthetic, motion анимации
// ─ Data-Driven: все данные — в lib/lavanda-data.ts
// ============================================================

import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight, CalendarDays } from "lucide-react"

import { LavandaHeader }       from "@/components/lavanda/Header"
import { LavandaHero }         from "@/components/lavanda/Hero"
import { LavandaServices }     from "@/components/lavanda/Services"
import { LavandaGallery }      from "@/components/lavanda/Gallery"
import { LavandaTeam }         from "@/components/lavanda/Team"
import { LavandaReviews }      from "@/components/lavanda/Reviews"
import { LavandaFAQ }          from "@/components/lavanda/FAQ"
import { LavandaFooter }       from "@/components/lavanda/Footer"
import { LavandaBookingDrawer } from "@/components/lavanda/BookingDrawer"
import { playOpenSound }        from "@/lib/sound"

export default function LavandaPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => {
    playOpenSound()
    setIsDrawerOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#faf7ff] dark:bg-[#12091e] text-[#2a1f3d] dark:text-gray-100 transition-colors duration-300 selection:bg-[#c9bdf0]/40">

      {/* Sticky Navigation (Smart Container с onBookingOpen) */}
      <LavandaHeader onBookingOpen={openDrawer} />

      <main>
        {/* 1. Hero — конверсионный первый экран */}
        <LavandaHero onBookingOpen={openDrawer} />

        {/* Separator wave */}
        <div className="w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 40" className="w-full fill-[#f0eaff] dark:fill-[#1a0f2e]">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>

        {/* 2. Services — фильтруемый прайс по категориям */}
        <div className="bg-[#f0eaff]/40 dark:bg-[#1a0f2e]/40">
          <LavandaServices onBookingOpen={openDrawer} />
        </div>

        {/* 3. Gallery — портфолио с фильтром */}
        <LavandaGallery />

        {/* 4. Team — мастера студии */}
        <div className="bg-[#f0eaff]/40 dark:bg-[#1a0f2e]/40">
          <LavandaTeam />
        </div>

        {/* 5. Reviews — отзывы клиентов */}
        <LavandaReviews />

        {/* 6. FAQ — аккордеон */}
        <div className="bg-[#f0eaff]/40 dark:bg-[#1a0f2e]/40">
          <LavandaFAQ />
        </div>

        {/* 7. Mid-page CTA Banner */}
        <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#2a1f3d] dark:bg-[#1a0f2e] rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="text-4xl mb-4">🌿</div>
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 tracking-tight">
              Готовы почувствовать заботу?
            </h2>
            <p className="text-[#a898c8] mb-8 max-w-md mx-auto">
              Запишитесь онлайн прямо сейчас — и мы подберём для вас идеальное время.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={openDrawer}
                className="flex items-center justify-center gap-2 h-14 px-8 bg-[#7c6f9f] hover:bg-[#9d8fc5] text-white font-medium rounded-2xl text-base transition-colors shadow-xl shadow-[#7c6f9f]/20"
              >
                <CalendarDays className="w-5 h-5" />
                Записаться
                <ArrowRight className="w-4 h-4 opacity-70" />
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer — contacts, schedule, socials */}
      <LavandaFooter onBookingOpen={openDrawer} />

      {/* Sticky mobile booking button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#faf7ff]/90 dark:bg-[#12091e]/90 backdrop-blur-xl border-t border-[#e0d9f5]/60 dark:border-[#2a1f3d]/60" />
        <div
          className="relative pointer-events-auto px-4 py-4"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={openDrawer}
            className="w-full h-14 rounded-2xl bg-[#7c6f9f] hover:bg-[#6b5f88] text-white font-medium text-base flex items-center justify-center gap-2 shadow-xl shadow-[#7c6f9f]/25 transition-colors"
          >
            <CalendarDays className="w-5 h-5" />
            Записаться в студию
          </motion.button>
        </div>
      </div>

      {/* Booking Drawer — с ESC, scroll-lock, aria-modal */}
      <LavandaBookingDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  )
}
