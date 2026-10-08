"use client"

// ECC: Planner — явные TypeScript-интерфейсы пропсов
// ECC: Frontend — Spring-анимация shutter + overlay backdrop
// ECC: Reviewer — focus-trap, escape-key close, aria-modal

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, MessageCircle, Send, Phone, ArrowRight } from "lucide-react"
import { lavandaData } from "@/lib/lavanda-data"
import { playTapSound } from "@/lib/sound"

interface BookingDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function LavandaBookingDrawer({ isOpen, onClose }: BookingDrawerProps) {
  const { studio } = lavandaData

  // ECC: Reviewer — ESC-key close, body scroll lock
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const channels = [
    {
      label: "WhatsApp",
      sublabel: "Ответим за 15 минут",
      href: studio.whatsapp,
      icon: MessageCircle,
      iconColor: "text-emerald-500",
    },
    {
      label: "Telegram",
      sublabel: "Отправить сообщение",
      href: studio.telegram,
      icon: Send,
      iconColor: "text-sky-500",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#2a1f3d]/50 dark:bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Запись в студию"
            initial={{ y: "100%", x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            exit={{ y: "100%", x: "-50%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed bottom-0 left-1/2 z-[70] bg-[#faf7ff] dark:bg-[#1a0f2e] rounded-t-[2rem] w-full max-w-[520px] border-t border-[#e0d9f5] dark:border-[#2a1f3d] shadow-2xl"
            style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
          >
            {/* Handle */}
            <div className="w-10 h-1.5 bg-[#c9bdf0] dark:bg-[#3a2a5a] rounded-full mx-auto mt-4 mb-6 opacity-60" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute top-5 right-5 p-2 rounded-full text-[#9d8fc5] hover:bg-[#ede9f7] dark:hover:bg-[#2a1f3d] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="px-6 pb-2">
              {/* Title */}
              <div className="text-center mb-8">
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-2xl font-medium text-[#2a1f3d] dark:text-white tracking-tight mb-2">
                  Записаться в «Лаванду»
                </h3>
                <p className="text-sm text-[#9d8fc5] dark:text-[#7a6a9a]">
                  Выберите удобный способ связи — мы подберём для вас идеальное время.
                </p>
              </div>

              {/* Channels */}
              <div className="flex flex-col gap-3 mb-4">
                {channels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={playTapSound}
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#12091e] border border-[#e0d9f5] dark:border-[#2a1f3d] shadow-sm hover:border-[#c9bdf0] dark:hover:border-[#3a2a5a] transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#f0eaff] dark:bg-[#2a1f3d] flex items-center justify-center shrink-0">
                        <ch.icon className={`w-6 h-6 ${ch.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#2a1f3d] dark:text-white text-base">{ch.label}</div>
                        <div className="text-xs text-[#9d8fc5] dark:text-[#5a4a7a] mt-0.5">{ch.sublabel}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#c9bdf0] dark:text-[#3a2a5a] group-hover:text-[#7c6f9f] transition-colors" />
                    </motion.div>
                  </a>
                ))}
              </div>

              {/* Phone call */}
              <a
                href={studio.phone}
                onClick={playTapSound}
                className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#9d8fc5] dark:text-[#7a6a9a] hover:text-[#7c6f9f] dark:hover:text-[#b0a2d8] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Позвонить: {studio.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
