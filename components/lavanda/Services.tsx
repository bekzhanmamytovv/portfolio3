"use client"

// ECC: Modular & Interactive — фильтрация по категориям через табы
// ECC: Reviewer — keyboard nav (role=tablist), aria-selected

import { useState } from "react"
import { motion } from "motion/react"
import { Clock, Zap } from "lucide-react"
import { lavandaData, type ServiceCategory } from "@/lib/lavanda-data"
import { playTapSound } from "@/lib/sound"

const CATEGORIES: ServiceCategory[] = ["Маникюр", "Брови & Ресницы", "Уход за кожей", "Массаж"]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

interface ServicesProps {
  onBookingOpen: () => void
}

export function LavandaServices({ onBookingOpen }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("Маникюр")

  const filtered = lavandaData.services.filter((s) => s.category === activeCategory)

  return (
    <motion.section
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#9d8fc5] dark:text-[#7a6a9a] font-medium mb-2">Прайс-лист</p>
          <h2 className="text-3xl md:text-4xl font-medium text-[#2a1f3d] dark:text-white tracking-tight">
            Наши услуги
          </h2>
        </div>
      </div>

      {/* Category Tabs — ECC Modular pattern */}
      <div
        role="tablist"
        aria-label="Категории услуг"
        className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-1"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => { playTapSound(); setActiveCategory(cat) }}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-[#7c6f9f] text-white shadow-md shadow-[#7c6f9f]/25"
                : "bg-white dark:bg-[#1a0f2e] border border-[#e0d9f5] dark:border-[#2a1f3d] text-[#6b5f88] dark:text-[#b0a2d8] hover:bg-[#ede9f7] dark:hover:bg-[#2a1f3d]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filtered.map((svc) => (
          <div
            key={svc.id}
            className="relative flex flex-col p-6 rounded-3xl bg-white dark:bg-[#1a0f2e] border border-[#e0d9f5]/80 dark:border-[#2a1f3d] shadow-sm hover:shadow-md hover:border-[#c9bdf0] dark:hover:border-[#3a2a5a] transition-all group"
          >
            {svc.popular && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-[#7c6f9f]/10 dark:bg-[#7c6f9f]/20 text-[#7c6f9f] dark:text-[#b0a2d8] text-[10px] font-semibold uppercase tracking-wider rounded-full">
                <Zap className="w-3 h-3" />
                Хит
              </div>
            )}
            <div className="flex justify-between items-start gap-4 mb-3">
              <h3 className="font-medium text-[#2a1f3d] dark:text-gray-100 text-[17px] leading-snug pr-12">
                {svc.name}
              </h3>
              <div className="shrink-0 px-3 py-1.5 rounded-xl bg-[#f0eaff] dark:bg-[#2a1f3d] text-[#7c6f9f] dark:text-[#b0a2d8] text-sm font-bold">
                {svc.priceFrom ? "от " : ""}{svc.price}
              </div>
            </div>
            <p className="text-sm text-[#6b5f88] dark:text-[#8878a8] leading-relaxed flex-1 mb-5">
              {svc.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-[#f0eaff] dark:border-[#2a1f3d]/50">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#9d8fc5] dark:text-[#5a4a7a]">
                <Clock className="w-3.5 h-3.5" />
                {svc.time}
              </div>
              <button
                onClick={() => { playTapSound(); onBookingOpen() }}
                className="text-xs font-semibold text-[#7c6f9f] dark:text-[#b0a2d8] opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
              >
                Записаться →
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}
