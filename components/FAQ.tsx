"use client"

import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "motion/react"
import { Plus, Minus } from "lucide-react"
import { playTapSound } from "@/lib/sound"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-[#e8e4dc] dark:border-stone-800/80 last:border-none">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4c6b3] rounded-lg transition-colors group"
      >
        <span className="font-medium text-[#1a1816] dark:text-gray-200 text-[15px] md:text-base pr-8 group-hover:text-[#3e3a35] dark:group-hover:text-white transition-colors">
          {question}
        </span>
        <div className="w-8 h-8 rounded-full bg-[#f2efe9] dark:bg-stone-800 flex items-center justify-center shrink-0 text-[#5c564d] dark:text-gray-400 group-hover:bg-[#e8e4dc] dark:group-hover:bg-stone-700 transition-colors">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-6 text-sm md:text-[15px] text-[#7a7369] dark:text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FAQProps {
  faqs: { id: string; question: string; answer: string }[]
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
}

export function FAQ({ faqs }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    playTapSound()
    setOpenId(openId === id ? null : id)
  }

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className="mb-20 pt-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-[#1a1816] dark:text-white tracking-tight">Частые вопросы</h2>
        <span className="text-xs font-medium uppercase tracking-widest text-[#a39c93] hidden md:block">F.A.Q.</span>
      </div>
      
      <div className="bg-white dark:bg-[#1c1c1e] p-2 md:p-6 rounded-3xl border border-[#e8e4dc]/80 dark:border-stone-800 shadow-sm">
        <div className="px-4">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
