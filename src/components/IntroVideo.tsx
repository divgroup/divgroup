import { useState } from "react";
import { Play, Tv, Shield, Video as VideoIcon, Camera } from "lucide-react";
import { ProfileData } from "../types";
import ImageEditorModal from "./ImageEditorModal";
import VideoEditorModal from "./VideoEditorModal";

interface IntroVideoProps {
  data: ProfileData;
  onUpdateVideo: (youtubeId: string, poster?: string) => void;
}

export default function IntroVideo({ data, onUpdateVideo }: IntroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { youtubeId, title, description, poster } = data.video;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="video" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3">
            Video Chia Sẻ Chiến Lược
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950">
            {title}
          </h2>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-4 rounded-full" />
        </div>

        {/* Video Player Card */}
        <div id="video-player-container" className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-950 aspect-video border border-gray-200 group">
          {/* Always-layered Edit Controllers overlay */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-gray-950/90 border border-gray-800 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-gray-900 transition-colors shadow-xl cursor-pointer"
              title="Thay đổi liên kết Video từ YouTube"
            >
              <VideoIcon className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>Sửa Video</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsImageModalOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-gray-950/90 border border-gray-800 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-gray-900 transition-colors shadow-xl cursor-pointer"
              title="Thay đổi ảnh bìa đại diện"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Sửa Ảnh Bìa</span>
            </button>
          </div>

          {!isPlaying ? (
            // Custom high-end Poster Overlay
            <div className="absolute inset-0 w-full h-full cursor-pointer group" onClick={() => setIsPlaying(true)}>
              <img
                src={poster}
                alt={title}
                className="w-full h-full object-cover brightness-75 group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Luxury dark gradient mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  id="btn-play-video"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-2xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 relative"
                  aria-label="Play video"
                >
                  <div className="absolute -inset-2 bg-white/5 rounded-full animate-ping opacity-60 pointer-events-none" />
                  <Play className="w-8 h-8 fill-current text-white ml-1" />
                </button>
              </div>

              {/* Video Badge */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-3 bg-gray-950/90 backdrop-blur-md border border-gray-800 px-4 py-2 rounded-xl text-white">
                <Tv className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold tracking-wider uppercase font-mono">BÀI GIẢNG ĐỘC QUYỀN VIP</span>
              </div>
            </div>
          ) : (
            // High Definition YouTube Iframe Embed
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>

        {/* Description Text */}
        <div className="max-w-3xl mx-auto mt-10 text-center space-y-4">
          <p className="text-gray-800 leading-relaxed text-sm md:text-base font-sans font-medium">
            {description}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-gray-500">
            <Shield className="w-3.5 h-3.5 text-gray-600" />
            <span>KÊNH TRUYỀN TẢI THÔNG TIN MÃ HÓA AN TOÀN</span>
          </div>
        </div>
      </div>

      {/* Modal for editing poster image */}
      <ImageEditorModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        title="Sửa Ảnh Bìa Video"
        subtitle="Chọn hoặc tải ảnh bìa hiển thị trước khi phát video"
        currentValue={poster}
        onApply={(newUrl) => onUpdateVideo(youtubeId, newUrl)}
        accentColorClass="indigo"
      />

      {/* Modal for editing video link */}
      <VideoEditorModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Sửa Video YouTube"
        currentYoutubeId={youtubeId}
        onApply={(newYtId) => onUpdateVideo(newYtId, poster)}
      />
    </section>
  );
}
