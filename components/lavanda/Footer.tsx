"use client"

// ECC: Architect — Presentation-only Footer, все данные из lavanda-data
// ECC: Reviewer — nav landmark, external links rel

import { motion } from "motion/react"
import { MapPin, Clock, Phone, Send, Instagram } from "lucide-react"
import { lavandaData } from "@/lib/lavanda-data"
import { playTapSound } from "@/lib/sound"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

interface FooterProps {
  onBookingOpen: () => void
}

export function LavandaFooter({ onBookingOpen }: FooterProps) {
  const { studio } = lavandaData

  return (
    <motion.footer
      id="contacts"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="bg-[#2a1f3d] dark:bg-[#0e0718] text-white"
    >
      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2 font-semibold text-xl mb-4">
            <span>🌿</span> {studio.name}
          </div>
          <p className="text-[#a898c8] text-sm leading-relaxed mb-6">
            Студия красоты с заботой о каждом клиенте. Работаем с {studio.founded} года.
          </p>
          {/* Social links */}
          <div className="flex gap-3">
            <a
              href={studio.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              onClick={playTapSound}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={studio.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              onClick={playTapSound}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Contacts column */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-widest text-[#9d8fc5] mb-5">Контакты</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#9d8fc5] shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-white">{studio.address}</div>
                <div className="text-xs text-[#a898c8] mt-1">{studio.subway}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#9d8fc5] shrink-0" />
              <a href={studio.phone} className="text-sm text-white hover:text-[#c9bdf0] transition-colors">
                {studio.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#9d8fc5] shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-white">{studio.schedule.weekdays}</div>
                <div className="text-sm text-white">{studio.schedule.weekend}</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA column */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-[#9d8fc5] mb-5">Записаться</h3>
            <p className="text-[#a898c8] text-sm leading-relaxed mb-6">
              Запишитесь онлайн за 2 минуты. Мы свяжемся с вами для подтверждения.
            </p>
          </div>
          <button
            onClick={() => { playTapSound(); onBookingOpen() }}
            className="w-full py-3.5 bg-[#7c6f9f] hover:bg-[#9d8fc5] text-white font-medium rounded-2xl transition-colors text-sm"
          >
            Записаться в студию →
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 max-w-6xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-[#7a6a9a]">
        <span>© {new Date().getFullYear()} Студия красоты «{studio.name}». Все права защищены.</span>
        <span>Сделано с заботой и лавандой 🌿</span>
      </div>
    </motion.footer>
  )
}
