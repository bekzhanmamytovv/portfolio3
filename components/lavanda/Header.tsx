"use client"

// ============================================================
// ECC: Architect — "use client" только у интерактивных листьев
// ECC: Planner — чёткий интерфейс пропсов, без any
// ============================================================

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Sun, Moon, CalendarDays } from "lucide-react"
import { useTheme } from "next-themes"
import { lavandaData } from "@/lib/lavanda-data"
import { playTapSound } from "@/lib/sound"
import React from "react"

interface HeaderProps {
  onBookingOpen: () => void
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => { playTapSound(); setTheme(theme === "dark" ? "light" : "dark") }}
      aria-label="Переключить тему"
      className="p-2 rounded-full transition-colors text-[#2a1f3d] dark:text-lavender-200 hover:bg-[#ede9f7] dark:hover:bg-[#2a1f3d]"
    >
      {theme === "dark"
        ? <Sun className="w-5 h-5" />
        : <Moon className="w-5 h-5" />}
    </button>
  )
}

export function LavandaHeader({ onBookingOpen }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: "Услуги", id: "services" },
    { label: "Мастера", id: "team" },
    { label: "Портфолио", id: "portfolio" },
    { label: "Отзывы", id: "reviews" },
    { label: "FAQ", id: "faq" },
    { label: "Адрес", id: "contacts" },
  ]

  const handleNav = (id: string) => {
    playTapSound()
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-[#faf7ff]/90 dark:bg-[#12091e]/90 backdrop-blur-xl border-b border-[#e0d9f5]/70 dark:border-[#2a1f3d]/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { playTapSound(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
          className="flex items-center gap-2 font-semibold text-lg text-[#2a1f3d] dark:text-white tracking-tight"
        >
          <span className="text-2xl">🌿</span>
          {lavandaData.studio.name}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="text-sm font-medium text-[#6b5f88] dark:text-[#b8a8d9] hover:text-[#2a1f3d] dark:hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => { playTapSound(); onBookingOpen() }}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#7c6f9f] hover:bg-[#6b5f88] dark:bg-[#9d8fc5] dark:hover:bg-[#b0a2d8] text-white text-sm font-medium rounded-xl transition-colors shadow-md shadow-[#7c6f9f]/20"
          >
            <CalendarDays className="w-4 h-4" />
            Записаться
          </button>
          <button
            onClick={() => { playTapSound(); setIsMenuOpen(!isMenuOpen) }}
            aria-expanded={isMenuOpen}
            aria-label="Меню"
            className="md:hidden p-2 -mr-1 text-[#2a1f3d] dark:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-[#e0d9f5]/70 dark:border-[#2a1f3d] bg-[#faf7ff] dark:bg-[#1a0f2e]"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="text-left py-2.5 px-3 rounded-xl font-medium text-[#2a1f3d] dark:text-[#c8b8e8] hover:bg-[#ede9f7] dark:hover:bg-[#2a1f3d] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setIsMenuOpen(false); onBookingOpen() }}
                className="mt-2 w-full py-3 bg-[#7c6f9f] text-white font-medium rounded-xl"
              >
                Записаться
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
