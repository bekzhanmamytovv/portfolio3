"use client"

// ECC: Frontend — Horizontally scrollable swipeable review cards (mobile)
// ECC: Reviewer — blockquote для цитат, aria-labels, keyboard accessible

import { motion } from "motion/react"
import { Star, Quote } from "lucide-react"
import { lavandaData } from "@/lib/lavanda-data"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function LavandaReviews() {
  return (
    <motion.section
      id="reviews"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[#9d8fc5] dark:text-[#7a6a9a] font-medium mb-2">Отзывы</p>
        <h2 className="text-3xl md:text-4xl font-medium text-[#2a1f3d] dark:text-white tracking-tight">
          Что говорят клиенты
        </h2>
      </div>

      {/* Scrollable on mobile, grid on desktop */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 pb-4 md:pb-0 no-scrollbar snap-x snap-mandatory md:snap-none">
        {lavandaData.reviews.map((review, idx) => (
          <article
            key={review.id}
            className="snap-center shrink-0 w-[85%] md:w-auto min-w-0 md:min-w-[unset] bg-white dark:bg-[#1a0f2e] border border-[#e0d9f5]/80 dark:border-[#2a1f3d] rounded-3xl p-6 md:p-8 shadow-sm flex flex-col"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4" aria-label={`Оценка: ${review.rating} из 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "fill-[#f5c842] text-[#f5c842]" : "fill-[#e0d9f5] text-[#e0d9f5] dark:fill-[#2a1f3d] dark:text-[#2a1f3d]"}`}
                />
              ))}
            </div>

            {/* Quote Icon */}
            <Quote className="w-6 h-6 text-[#c9bdf0] dark:text-[#3a2a5a] mb-3" aria-hidden="true" />

            {/* Text */}
            <blockquote className="text-[#5a4f72] dark:text-[#a898c8] text-[15px] leading-relaxed italic flex-1 mb-6">
              {review.text}
            </blockquote>

            {/* Footer */}
            <div className="border-t border-[#f0eaff] dark:border-[#2a1f3d]/50 pt-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-[#2a1f3d] dark:text-white">{review.author}</div>
                <div className="text-xs text-[#9d8fc5] dark:text-[#7a6a9a] mt-0.5">{review.service}</div>
              </div>
              <div className="text-xs text-[#b8a8d9] dark:text-[#5a4a7a]">{review.date}</div>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  )
}
