import React from "react";
import { motion } from "motion/react";
import { Briefcase, Layers, Rocket, Users, ArrowUpRight } from "lucide-react";
import { ProfileData } from "../types";

interface ServicesProps {
  data: ProfileData;
}

export default function Services({ data }: ServicesProps) {
  const serviceIcons = [Briefcase, Layers, Rocket, Users];

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3">
            Giải Pháp Chuyên Sâu
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950">
            Dịch Vụ Cao Cấp & Tư Vấn
          </h2>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {data.services.map((service, idx) => {
            const IconComponent = serviceIcons[idx % serviceIcons.length] || Briefcase;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                id={`service-${idx}`}
                className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Top Header Row of Card */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-950 text-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-md">
                      <IconComponent className="w-5 h-5 text-gray-100" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                      DỊCH VỤ #{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-sans font-bold text-gray-950 mb-4 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-6 font-sans font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href="#contact"
                    id={`btn-service-${idx}`}
                    onClick={handleBookClick}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-950 hover:text-indigo-700 transition-colors tracking-wide uppercase"
                  >
                    Đăng Ký Tư Vấn
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
