import { motion } from "motion/react";
import { Compass, Target, Zap } from "lucide-react";
import { ProfileData } from "../types";

interface MissionProps {
  data: ProfileData;
}

export default function Mission({ data }: MissionProps) {
  const cards = [
    {
      title: "Tầm Nhìn",
      description: data.vision,
      icon: Compass,
      gradient: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-50/50 border-blue-100",
    },
    {
      title: "Sứ Mệnh",
      description: data.mission,
      icon: Target,
      gradient: "from-purple-600 to-pink-700",
      bgLight: "bg-purple-50/50 border-purple-100",
    },
    {
      title: "Chiến Lược Phát Triển",
      description: data.strategy,
      icon: Zap,
      gradient: "from-amber-600 to-orange-700",
      bgLight: "bg-amber-50/50 border-amber-100",
    },
  ];

  return (
    <section id="vision" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3"
          >
            Định Hướng Cốt Lõi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950"
          >
            Tầm Nhìn, Sứ Mệnh & Chiến Lược
          </motion.h2>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-4 rounded-full" />
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                id={`card-${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                className={`p-8 rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-full`}
              >
                {/* Subtle internal abstract light background flare */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity rounded-full`} />

                <div>
                  {/* Icon with gradient circle */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-6 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-sans font-bold text-gray-950 mb-4 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-gray-800 text-sm md:text-base leading-relaxed font-sans font-medium">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-1 text-xs font-mono font-bold text-gray-500 group-hover:text-gray-950 transition-colors">
                  <span>GIAO THỨC XÁC THỰC</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-auto" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
