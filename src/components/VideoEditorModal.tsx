import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Video, Sparkles, Check, Link2, RefreshCw } from "lucide-react";

interface VideoEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  currentYoutubeId: string;
  onApply: (newYoutubeId: string) => void;
  onResetDefault?: () => void;
}

export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  // If it's already just a 11-char ID, return it
  if (url.trim().length === 11 && !url.includes("/") && !url.includes(".")) {
    return url.trim();
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function VideoEditorModal({
  isOpen,
  onClose,
  title,
  subtitle = "Dán đường dẫn video từ YouTube",
  currentYoutubeId,
  onApply,
  onResetDefault,
}: VideoEditorModalProps) {
  const [videoUrl, setVideoUrl] = useState(`https://www.youtube.com/watch?v=${currentYoutubeId}`);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    const ytId = extractYoutubeId(videoUrl);
    if (!ytId) {
      setErrorMessage(
        "Không thể nhận diện ID video YouTube. Vui lòng kiểm tra lại đường dẫn (Ví dụ: https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
      );
      return;
    }

    onApply(ytId);
    setErrorMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 font-sans">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  setErrorMessage("");
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-100 animate-pulse">
                  {errorMessage}
                </div>
              )}

              {/* YouTube URL input */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                  Đường dẫn YouTube
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Dán link YouTube (ví dụ: https://www.youtube.com/watch?v=...)"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
                  />
                </div>
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50 space-y-2">
                  <span className="text-[10px] font-extrabold text-indigo-700 tracking-wider uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Định dạng hỗ trợ
                  </span>
                  <ul className="text-[11px] text-indigo-900 font-medium space-y-1 list-disc pl-4">
                    <li>Link đầy đủ: <code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code></li>
                    <li>Link rút ngắn: <code>https://youtu.be/dQw4w9WgXcQ</code></li>
                    <li>Link nhúng: <code>https://www.youtube.com/embed/dQw4w9WgXcQ</code></li>
                    <li>Chỉ cần ID video: <code>dQw4w9WgXcQ</code></li>
                  </ul>
                </div>
              </div>

              {/* Preview currently selected video */}
              {currentYoutubeId && (
                <div className="space-y-1.5">
                  <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                    Đang hiển thị (YouTube Video ID)
                  </span>
                  <div className="font-mono text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-150 inline-block font-semibold">
                    {currentYoutubeId}
                  </div>
                </div>
              )}

              {/* Footer Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 -mx-6 -mb-6 p-4">
                {onResetDefault ? (
                  <button
                    type="button"
                    onClick={() => {
                      onResetDefault();
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Đặt lại mặc định
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    Áp Dụng
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
