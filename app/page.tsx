"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "motion/react"
import { MapPin, Sparkles, Clock, Star, MessageCircle, Phone, Send, ArrowRight, Menu, X, CalendarDays, Sun, Moon } from "lucide-react"
import { siteData } from "@/lib/data"
import { playTapSound, playOpenSound } from "@/lib/sound"

const IMAGES = {
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  portfolio: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  ]
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  const toggle = () => {
    playTapSound()
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button onClick={toggle} className="p-2 rounded-full hover:bg-[#e8e4dc]/50 dark:hover:bg-stone-800 transition-colors text-[#2d2a26] dark:text-gray-300">
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

export default function CommercialLanding() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (id: string) => {
    playTapSound()
    setIsMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80 
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const openDrawer = () => {
    playOpenSound()
    setIsDrawerOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#121212] text-[#2d2a26] dark:text-gray-100 font-sans selection:bg-[#e8e4dc] dark:selection:bg-stone-700 transition-colors duration-300">
      
      {/* Sticky Header / Navigation */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/90 dark:bg-[#121212]/90 backdrop-blur-xl border-b border-[#e8e4dc]/80 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="font-semibold tracking-tight text-lg cursor-pointer dark:text-white" onClick={() => { playTapSound(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            {siteData.master.name}
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNavClick('services')} className="text-sm font-medium text-[#7a7369] dark:text-gray-400 hover:text-[#1a1816] dark:hover:text-white transition-colors">Услуги</button>
            <button onClick={() => handleNavClick('portfolio')} className="text-sm font-medium text-[#7a7369] dark:text-gray-400 hover:text-[#1a1816] dark:hover:text-white transition-colors">Работы</button>
            <button onClick={() => handleNavClick('reviews')} className="text-sm font-medium text-[#7a7369] dark:text-gray-400 hover:text-[#1a1816] dark:hover:text-white transition-colors">Отзывы</button>
            <button onClick={() => handleNavClick('contacts')} className="text-sm font-medium text-[#7a7369] dark:text-gray-400 hover:text-[#1a1816] dark:hover:text-white transition-colors">Адрес</button>
          </nav>
          
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <button 
                onClick={openDrawer}
                className="px-5 py-2.5 bg-[#3e3a35] dark:bg-stone-200 text-white dark:text-stone-900 text-sm font-medium rounded-xl shadow-md hover:bg-[#2d2a26] dark:hover:bg-white transition-colors"
              >
                Записаться
              </button>
            </div>
            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 -mr-2" onClick={() => { playTapSound(); setIsMobileMenuOpen(!isMobileMenuOpen); }}>
              {isMobileMenuOpen ? <X className="w-6 h-6 dark:text-gray-200" /> : <Menu className="w-6 h-6 dark:text-gray-200" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b border-[#e8e4dc]/80 dark:border-stone-800 bg-[#faf8f5] dark:bg-[#1c1c1e] overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-4 gap-4">
                <button onClick={() => handleNavClick('services')} className="text-left font-medium text-[#2d2a26] dark:text-gray-200">Услуги</button>
                <button onClick={() => handleNavClick('portfolio')} className="text-left font-medium text-[#2d2a26] dark:text-gray-200">Работы</button>
                <button onClick={() => handleNavClick('reviews')} className="text-left font-medium text-[#2d2a26] dark:text-gray-200">Отзывы</button>
                <button onClick={() => handleNavClick('contacts')} className="text-left font-medium text-[#2d2a26] dark:text-gray-200">Адрес</button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-32 md:pb-24">
        
        {/* Hero Section */}
        <motion.section 
          id="home"
          initial="hidden" animate="visible" variants={fadeUp}
          className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20"
        >
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="md:hidden w-32 h-32 rounded-full p-1 border border-[#e8e4dc] dark:border-stone-700 mb-6 shadow-sm overflow-hidden bg-[#e8e4dc] dark:bg-stone-800">
              <img src={IMAGES.avatar} alt="Елена" className="w-full h-full object-cover rounded-full" />
            </div>

            <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-[#1a1816] dark:text-white leading-tight">
              Безупречный маникюр & <br className="hidden md:block" />чистая эстетика
            </h1>
            <p className="text-[#7a7369] dark:text-gray-400 mb-8 font-medium leading-relaxed text-base md:text-lg max-w-md">
              Привет! Я {siteData.master.name}. Делаю безопасный аппаратный маникюр с идеальными бликами, который носится 4 недели.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
              <Badge icon={MapPin} text={siteData.master.location} />
              <Badge icon={Sparkles} text={siteData.master.experience} />
            </div>

            <div className="hidden md:block">
              <button 
                onClick={openDrawer}
                className="h-14 px-8 rounded-2xl bg-[#3e3a35] dark:bg-stone-100 text-[#faf8f5] dark:text-[#121212] flex items-center justify-center gap-2 font-medium text-base shadow-xl shadow-[#3e3a35]/20 dark:shadow-none hover:bg-[#2d2a26] dark:hover:bg-white transition-all hover:scale-[1.02]"
              >
                Выбрать время
                <ArrowRight className="w-4 h-4 text-[#d4c6b3] dark:text-stone-500" />
              </button>
            </div>
          </div>

          <div className="hidden md:block order-1 md:order-2">
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-[#e8e4dc] dark:bg-stone-800 shadow-2xl border-4 border-white dark:border-[#1c1c1e] rotate-1 hover:rotate-0 transition-transform duration-500">
              <img src={IMAGES.avatar} alt="Мастер" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-black/50 to-transparent" />
            </div>
          </div>
        </motion.section>

        {/* Services List */}
        <motion.section 
          id="services"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="mb-20 pt-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-[#1a1816] dark:text-white tracking-tight">Услуги и Цены</h2>
            <span className="text-xs font-medium uppercase tracking-widest text-[#a39c93] hidden md:block">Прайс-лист</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {siteData.services.map((svc) => (
              <div key={svc.id} className="p-6 rounded-3xl bg-white dark:bg-[#1c1c1e] border border-[#e8e4dc]/80 dark:border-stone-800 shadow-sm transition-all hover:shadow-md hover:border-[#d4c6b3] dark:hover:border-stone-600">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="font-medium text-[#2d2a26] dark:text-gray-100 text-lg leading-snug">{svc.name}</h3>
                  <div className="px-3 py-1.5 bg-[#f2efe9] dark:bg-stone-800 text-[#2d2a26] dark:text-gray-200 text-sm font-semibold rounded-lg whitespace-nowrap">
                    {svc.price}
                  </div>
                </div>
                <p className="text-sm text-[#7a7369] dark:text-gray-400 leading-relaxed mb-6">{svc.description}</p>
                <div className="flex items-center gap-3 border-t border-[#f2efe9] dark:border-stone-800/50 pt-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#8f887f] dark:text-stone-500">
                    <Clock className="w-4 h-4" />
                    {svc.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Gallery */}
        <motion.section 
          id="portfolio"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="mb-20 pt-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-[#1a1816] dark:text-white tracking-tight">Портфолио</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {IMAGES.portfolio.map((img, i) => (
              <div 
                key={i} 
                className="relative aspect-[4/5] bg-[#e8e4dc] dark:bg-stone-800 rounded-2xl overflow-hidden shadow-sm border border-[#e8e4dc]/50 dark:border-stone-700/50 group"
              >
                <img 
                  src={img} 
                  alt={`Работа ${i+1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Reviews */}
        <motion.section 
          id="reviews"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="mb-20 pt-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-[#1a1816] dark:text-white tracking-tight">Отзывы</h2>
          </div>
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 pb-4 md:pb-0 no-scrollbar snap-x snap-mandatory md:snap-none">
            {siteData.reviews.map((review) => (
              <div key={review.id} className="snap-center min-w-[300px] md:min-w-0 w-[85%] md:w-full bg-white dark:bg-[#1c1c1e] p-6 md:p-8 rounded-3xl border border-[#e8e4dc]/80 dark:border-stone-800 shadow-sm shrink-0 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#d4c6b3] dark:fill-stone-600 text-[#d4c6b3] dark:text-stone-600" />
                    ))}
                  </div>
                  <p className="text-[15px] md:text-base text-[#5c564d] dark:text-gray-300 leading-relaxed mb-6 font-serif italic">
                    «{review.text}»
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[#f2efe9] dark:border-stone-800/50 pt-4 md:pt-5">
                  <span className="font-medium text-sm text-[#2d2a26] dark:text-gray-400 uppercase tracking-wider">{review.author}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contacts */}
        <motion.section 
          id="contacts"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="pt-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-[#1a1816] dark:text-white tracking-tight">Адрес студии</h2>
          </div>
          <div className="bg-white dark:bg-[#1c1c1e] p-6 md:p-10 rounded-3xl border border-[#e8e4dc]/80 dark:border-stone-800 shadow-sm flex flex-col md:flex-row gap-8 md:items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f2efe9] dark:bg-stone-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#5c564d] dark:text-gray-300" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1a1816] dark:text-gray-200 mb-1">Студия "Nail Aesthetic"</h4>
                  <p className="text-[#7a7369] dark:text-gray-400 text-sm leading-relaxed">{siteData.master.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#f2efe9] dark:bg-stone-800 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-[#5c564d] dark:text-gray-300" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1a1816] dark:text-gray-200 mb-1">График работы</h4>
                  <p className="text-[#7a7369] dark:text-gray-400 text-sm">Пн-Вс: 10:00 - 21:00 (по записи)</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-72">
              <button 
                onClick={openDrawer}
                className="w-full h-14 rounded-2xl bg-white dark:bg-[#1c1c1e] border border-[#e8e4dc] dark:border-stone-700 text-[#2d2a26] dark:text-gray-200 font-medium shadow-sm hover:bg-[#faf8f5] dark:hover:bg-stone-800 transition-colors"
              >
                Показать на карте
              </button>
            </div>
          </div>
        </motion.section>
        
      </div>

      {/* Sticky Mobile CTA (скрыт на десктопе) */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none md:hidden"
      >
        <div className="absolute inset-0 bg-[#faf8f5]/90 dark:bg-[#121212]/90 backdrop-blur-xl border-t border-[#e8e4dc]/60 dark:border-stone-800/80 mask-image-b" />
        <div 
          className="w-full pointer-events-auto relative px-6 py-5"
          style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        >
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={openDrawer}
            className="w-full h-[60px] rounded-2xl bg-[#3e3a35] dark:bg-stone-200 text-[#faf8f5] dark:text-[#121212] flex items-center justify-center gap-2 font-medium text-base shadow-xl shadow-[#3e3a35]/20 dark:shadow-none transition-colors"
          >
            Записаться
            <ArrowRight className="w-4 h-4 text-[#d4c6b3] dark:text-stone-500" />
          </motion.button>
        </div>
      </div>

      <BookingDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} contacts={siteData.contacts} />
    </div>
  )
}

function Badge({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1c1c1e] border border-[#e8e4dc] dark:border-stone-800 rounded-full text-[#5c564d] dark:text-gray-300 text-[11px] lg:text-xs font-medium uppercase tracking-wider shadow-sm">
      <Icon className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
      {text}
    </div>
  )
}

function BookingDrawer({ isOpen, onClose, contacts }: { isOpen: boolean, onClose: () => void, contacts: any }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#1a1816]/40 dark:bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%', x: '-50%' }} animate={{ y: 0, x: '-50%' }} exit={{ y: '100%', x: '-50%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed bottom-0 left-1/2 z-[70] bg-[#faf8f5] dark:bg-[#1c1c1e] rounded-t-[2.5rem] p-6 pt-4 pb-12 shadow-2xl w-full max-w-[500px] border-t border-[#e8e4dc] dark:border-stone-800"
            style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
          >
            <div className="w-12 h-1.5 bg-[#d4c6b3] dark:bg-stone-700 rounded-full mx-auto mb-8 opacity-50" />
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-medium text-[#1a1816] dark:text-white tracking-tight mb-2">Выберите способ связи</h3>
              <p className="text-sm text-[#7a7369] dark:text-gray-400">С удовольствием отвечу на ваши вопросы и подберу удобное время.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <a href={contacts.whatsapp} target="_blank" rel="noreferrer" onClick={playTapSound} className="block">
                <motion.div whileTap={{ scale: 0.98 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#121212] border border-[#e8e4dc] dark:border-stone-800 shadow-sm hover:border-[#3e3a35] dark:hover:border-stone-500 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#f2efe9] dark:bg-stone-800 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#4b463e] dark:text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[#1a1816] dark:text-gray-100 text-base">WhatsApp</div>
                    <div className="text-xs text-[#7a7369] dark:text-gray-500 mt-0.5">Быстрый ответ</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#d4c6b3] dark:text-stone-600" />
                </motion.div>
              </a>

              <a href={contacts.telegram} target="_blank" rel="noreferrer" onClick={playTapSound} className="block">
                <motion.div whileTap={{ scale: 0.98 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#121212] border border-[#e8e4dc] dark:border-stone-800 shadow-sm hover:border-[#3e3a35] dark:hover:border-stone-500 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#f2efe9] dark:bg-stone-800 flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-[#4b463e] dark:text-blue-400 ml-[-2px]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[#1a1816] dark:text-gray-100 text-base">Telegram</div>
                    <div className="text-xs text-[#7a7369] dark:text-gray-500 mt-0.5">Личные сообщения</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#d4c6b3] dark:text-stone-600" />
                </motion.div>
              </a>

              <a href={contacts.phone} onClick={playTapSound} className="block mt-2">
                <motion.div whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-2 p-4 rounded-2xl border border-transparent hover:bg-[#f2efe9] dark:hover:bg-stone-800 transition-colors">
                  <Phone className="w-4 h-4 text-[#7a7369] dark:text-gray-400" />
                  <span className="font-medium text-[#5c564d] dark:text-gray-300 text-sm">Позвонить {contacts.phoneDisplay}</span>
                </motion.div>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
