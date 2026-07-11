import { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Award, Download, ArrowUpRight, Camera } from "lucide-react";
import { ProfileData } from "../types";
import ImageEditorModal from "./ImageEditorModal";

interface AboutProps {
  data: ProfileData;
  onUpdateAboutImage: (newUrl: string) => void;
}

export default function About({ data, onUpdateAboutImage }: AboutProps) {
  const { intro, biography, experience, achievements, profileImageUrl, profilePdfUrl } = data.about;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <section id="about" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3">
            Hồ Sơ & Sự Nghiệp
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950">
            Giới Thiệu Về {data.fullName}
          </h2>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Information) - takes 7 cols */}
          <div className="lg:col-span-7 space-y-10">
            {/* Biography Core */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-sans font-bold text-gray-950 tracking-tight">
                Chuyên Gia Kiến Tạo Thương Hiệu Số & Doanh Nhân Công Nghệ
              </h3>
              <p className="text-gray-900 leading-relaxed font-sans font-medium text-base md:text-lg">
                {intro}
              </p>
              <p className="text-gray-800 leading-relaxed font-sans font-normal text-sm md:text-base">
                {biography}
              </p>
            </div>

            {/* Experience List */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
                <Briefcase className="w-5 h-5 text-gray-950" />
                <h4 className="font-sans font-bold text-gray-950 tracking-tight text-base">Hành Trình Sự Nghiệp</h4>
              </div>
              <ul className="space-y-4">
                {experience.map((exp, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-950 mt-2 flex-shrink-0" />
                    <span className="text-gray-800 text-sm md:text-base font-sans font-medium">
                      {exp}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Achievements List */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
                <Award className="w-5 h-5 text-gray-950" />
                <h4 className="font-sans font-bold text-gray-950 tracking-tight text-base">Thành Tựu Tiêu Biểu</h4>
              </div>
              <ul className="space-y-4">
                {achievements.map((ach, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span className="text-gray-800 text-sm md:text-base font-sans font-medium">
                      {ach}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column (Visual + Document) - takes 5 cols */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-xl aspect-[3/4] bg-white group border-4 border-white"
            >
              <img
                src={profileImageUrl}
                alt="Nguyễn Văn A Executive Profile"
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
              
              {/* Floating Camera Button to Edit Image */}
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-md text-gray-800 hover:text-indigo-600 hover:scale-110 active:scale-95 transition-all shadow-lg opacity-100 md:opacity-0 group-hover:opacity-100 z-10 border border-gray-100 cursor-pointer flex items-center justify-center"
                title="Thay đổi ảnh chân dung"
              >
                <Camera className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Profile download CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-sm mt-8"
            >
              <a
                href={profilePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-download-profile"
                className="flex items-center justify-center gap-2 w-full bg-gray-950 text-white hover:bg-gray-800 transition-colors duration-200 py-4 rounded-2xl font-bold shadow-md text-sm uppercase tracking-wider group"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                Tải Hồ Sơ Doanh Nghiệp
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </a>
              <p className="text-center text-xs text-gray-500 mt-3 font-mono font-semibold">
                TÀI LIỆU PDF BẢO MẬT • 4.2 MB
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <ImageEditorModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Sửa Ảnh Chân Dung"
        subtitle="Thay đổi ảnh giới thiệu chuyên nghiệp của bạn"
        currentValue={profileImageUrl}
        onApply={onUpdateAboutImage}
        accentColorClass="indigo"
      />
    </section>
  );
}
