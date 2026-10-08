"use client"

// ECC: Planner — FAQ-аккордеон с чётким интерфейсом
// ECC: Reviewer — aria-expanded, role=region, keyboard accessible

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Minus } from "lucide-react"
import { lavandaData } from "@/lib/lavanda-data"
import { playTapSound } from "@/lib/sound"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function LavandaFAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    playTapSound()
    setOpenId(openId === id ? null : id)
  }

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#9d8fc5] dark:text-[#7a6a9a] font-medium mb-2">Вопросы и ответы</p>
        <h2 className="text-3xl md:text-4xl font-medium text-[#2a1f3d] dark:text-white tracking-tight">
          Частые вопросы
        </h2>
      </div>

      <div className="bg-white dark:bg-[#1a0f2e] border border-[#e0d9f5]/80 dark:border-[#2a1f3d] rounded-3xl shadow-sm divide-y divide-[#f0eaff] dark:divide-[#2a1f3d]/50">
        {lavandaData.faq.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id} role="region" aria-labelledby={`faq-${item.id}`}>
              <button
                id={`faq-${item.id}`}
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c6f9f] focus-visible:ring-inset rounded-3xl transition-colors group"
              >
                <span className="font-medium text-[#2a1f3d] dark:text-gray-200 text-[15px] pr-8 group-hover:text-[#7c6f9f] dark:group-hover:text-[#b0a2d8] transition-colors">
                  {item.question}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#f0eaff] dark:bg-[#2a1f3d] flex items-center justify-center shrink-0 text-[#7c6f9f] dark:text-[#9d8fc5] transition-colors group-hover:bg-[#e0d9f5] dark:group-hover:bg-[#3a2a5a]">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-[15px] text-[#6b5f88] dark:text-[#a898c8] leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}
