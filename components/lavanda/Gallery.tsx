"use client"

// ECC: Frontend — Masonry-grid с фильтром по категории
// ECC: Reviewer — lazy loading, aspect-ratio, hover accessibility

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { lavandaData, type ServiceCategory } from "@/lib/lavanda-data"
import { playTapSound } from "@/lib/sound"

const ALL = "Все"
type FilterType = ServiceCategory | typeof ALL
const FILTERS: FilterType[] = [ALL, "Маникюр", "Брови & Ресницы", "Уход за кожей"]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function LavandaGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(ALL)

  const images =
    activeFilter === ALL
      ? lavandaData.gallery
      : lavandaData.gallery.filter((img) => img.category === activeFilter)

  return (
    <motion.section
      id="portfolio"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#9d8fc5] dark:text-[#7a6a9a] font-medium mb-2">Портфолио</p>
          <h2 className="text-3xl md:text-4xl font-medium text-[#2a1f3d] dark:text-white tracking-tight">
            Наши работы
          </h2>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => { playTapSound(); setActiveFilter(f) }}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeFilter === f
                ? "bg-[#7c6f9f] text-white shadow-md shadow-[#7c6f9f]/20"
                : "bg-white dark:bg-[#1a0f2e] border border-[#e0d9f5] dark:border-[#2a1f3d] text-[#6b5f88] dark:text-[#b0a2d8] hover:bg-[#ede9f7] dark:hover:bg-[#2a1f3d]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        key={activeFilter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      >
        <AnimatePresence>
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl bg-[#ede9f7] dark:bg-[#1a0f2e] group shadow-sm border border-[#e0d9f5]/50 dark:border-[#2a1f3d]/50 ${
                i === 0 ? "md:row-span-2" : ""
              } ${i === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/30 transition-colors duration-400 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs text-white font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}
