import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause, Camera } from "lucide-react";
import { ProfileData } from "../types";
import ImageEditorModal from "./ImageEditorModal";

interface GalleryProps {
  data: ProfileData;
  onUpdateGalleryImage: (id: string, newImageUrl: string) => void;
}

export default function Gallery({ data, onUpdateGalleryImage }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const galleryItems = data.gallery;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay Effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, handleNext]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3">
            Hình Ảnh Hoạt Động
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950">
            Thư Viện Ảnh Thực Tế
          </h2>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative w-full aspect-[16/9] max-h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-950 group">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={galleryItems[currentIndex].image}
                alt={galleryItems[currentIndex].caption}
                className="w-full h-full object-cover filter brightness-95 saturate-[0.9]"
                referrerPolicy="no-referrer"
              />
              {/* Soft overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/45" />

              {/* Caption Overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col gap-1 md:max-w-xl text-white">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-widest">
                  NHẬT KÝ SỰ KIỆN • HÌNH {currentIndex + 1}
                </span>
                <p className="text-base md:text-xl font-sans font-bold tracking-tight text-white drop-shadow-sm">
                  {galleryItems[currentIndex].caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Edit Button for Active Gallery Image */}
          <button
            onClick={() => setIsImageModalOpen(true)}
            className="absolute top-4 left-4 bg-black/45 hover:bg-black/60 text-white backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20 transition-colors z-20 flex items-center justify-center gap-1.5 font-bold text-xs cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-transform"
            title="Thay đổi hình ảnh thư viện này"
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>Sửa Ảnh</span>
          </button>

          {/* Side Arrows */}
          <button
            id="gallery-btn-prev"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            id="gallery-btn-next"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Autoplay Pause Toggle */}
          <button
            id="gallery-autoplay-toggle"
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 right-4 bg-black/45 text-white hover:bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/20 transition-colors z-20 flex items-center justify-center"
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex flex-col items-center justify-center mt-6 gap-3">
          <div className="flex items-center gap-2">
            {galleryItems.map((_, idx) => (
              <button
                key={idx}
                id={`gallery-dot-${idx}`}
                onClick={() => handleDotClick(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-gray-950" : "bg-gray-300 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={currentIndex === idx ? "true" : undefined}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-gray-500">
            Sử dụng phím mũi tên TRÁI / PHẢI trên bàn phím để di chuyển nhanh
          </span>
        </div>
      </div>

      <ImageEditorModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title={`Sửa Ảnh Thư Viện: Hình ${currentIndex + 1}`}
        subtitle="Thay đổi hình ảnh hiện tại trong thư viện hoạt động"
        currentValue={galleryItems[currentIndex].image}
        onApply={(newUrl) => onUpdateGalleryImage(galleryItems[currentIndex].id, newUrl)}
        accentColorClass="indigo"
      />
    </section>
  );
}
