"use client"

// ECC: Architect — "Dumb Presentation" компонент, данные приходят из lavanda-data
// ECC: Reviewer — семантика article, img alt, role

import { motion } from "motion/react"
import { Sparkles } from "lucide-react"
import { lavandaData } from "@/lib/lavanda-data"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {},
}

export function LavandaTeam() {
  return (
    <motion.section
      id="team"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={stagger}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-12">
        <p className="text-xs uppercase tracking-widest text-[#9d8fc5] dark:text-[#7a6a9a] font-medium mb-2">Команда</p>
        <h2 className="text-3xl md:text-4xl font-medium text-[#2a1f3d] dark:text-white tracking-tight">
          Наши мастера
        </h2>
      </motion.div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lavandaData.team.map((member) => (
          <motion.article
            key={member.id}
            variants={fadeUp}
            className="group flex flex-col rounded-3xl bg-white dark:bg-[#1a0f2e] border border-[#e0d9f5]/80 dark:border-[#2a1f3d] shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Photo */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#ede9f7] dark:bg-[#2a1f3d]">
              <img
                src={member.photo}
                alt={`${member.name}, ${member.role}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f3d]/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  {member.experience}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 flex-1">
              <h3 className="text-lg font-semibold text-[#2a1f3d] dark:text-white mb-1">{member.name}</h3>
              <p className="text-sm text-[#7c6f9f] dark:text-[#9d8fc5] font-medium mb-4">{member.role}</p>

              {/* Specializations */}
              <div className="flex flex-wrap gap-2">
                {member.specialization.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-lg bg-[#f0eaff] dark:bg-[#2a1f3d] text-[#7c6f9f] dark:text-[#b0a2d8] text-xs font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
