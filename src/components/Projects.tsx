import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, FolderGit, Camera } from "lucide-react";
import { ProfileData, ProjectData } from "../types";
import ImageEditorModal from "./ImageEditorModal";

interface ProjectsProps {
  data: ProfileData;
  onUpdateProjectImage: (id: string, newImageUrl: string) => void;
}

export default function Projects({ data, onUpdateProjectImage }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3">
            Sự Đổi Mới Hệ Sinh Thái
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950">
            Dự Án Tiêu Biểu
          </h2>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Grid (6 Cards) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              id={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
            >
              {/* Project Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100 group/img">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Dynamic overlay light gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Floating Edit Button */}
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setIsImageModalOpen(true);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 hover:text-indigo-600 transition-all hover:scale-105 active:scale-95 shadow-md border border-gray-100 cursor-pointer z-10 opacity-100 md:opacity-0 group-hover/img:opacity-100 flex items-center gap-1.5 text-[10px] font-bold"
                  title="Thay đổi ảnh dự án"
                >
                  <Camera className="w-4 h-4" />
                  <span>Sửa Ảnh</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                    <FolderGit className="w-3.5 h-3.5" />
                    <span>DỰ ÁN ĐÃ XÁC THỰC</span>
                  </div>

                  <h3 className="text-lg font-sans font-bold text-gray-950 group-hover:text-indigo-950 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-gray-800 text-xs md:text-sm leading-relaxed font-sans font-medium">
                    {project.description}
                  </p>
                </div>

                {/* Card Button */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-${project.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-950 group-hover:text-indigo-700 transition-colors tracking-wide uppercase"
                  >
                    Xem Chi Tiết Dự Án
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <ImageEditorModal
          isOpen={isImageModalOpen}
          onClose={() => {
            setIsImageModalOpen(false);
            setSelectedProject(null);
          }}
          title={`Sửa Ảnh: ${selectedProject.name}`}
          subtitle="Cập nhật hình ảnh đại diện cho dự án tiêu biểu này"
          currentValue={selectedProject.image}
          onApply={(newUrl) => onUpdateProjectImage(selectedProject.id, newUrl)}
          accentColorClass="indigo"
        />
      )}
    </section>
  );
}
