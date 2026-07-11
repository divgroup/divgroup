import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Link2, Check, Sparkles, RefreshCw } from "lucide-react";
import { compressImage } from "../utils/imageCompressor";

interface PresetItem {
  id: string;
  name: string;
  url: string;
  preview: string;
}

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  currentValue: string;
  onApply: (newUrl: string) => void;
  presets?: PresetItem[];
  onResetDefault?: () => void;
  accentColorClass?: string; // e.g. "amber", "indigo", "emerald"
}

export default function ImageEditorModal({
  isOpen,
  onClose,
  title,
  subtitle = "Tùy biến không gian thương hiệu của bạn",
  currentValue,
  onApply,
  presets,
  onResetDefault,
  accentColorClass = "amber",
}: ImageEditorModalProps) {
  const [customUrl, setCustomUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const themeColors = {
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-500",
      ring: "ring-amber-100",
      hoverText: "hover:text-amber-700",
      buttonBg: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-200",
      dragBg: "bg-amber-50/50",
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-500",
      ring: "ring-indigo-100",
      hoverText: "hover:text-indigo-700",
      buttonBg: "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-200",
      dragBg: "bg-indigo-50/50",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-500",
      ring: "ring-emerald-100",
      hoverText: "hover:text-emerald-700",
      buttonBg: "bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-200",
      dragBg: "bg-emerald-50/50",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-500",
      ring: "ring-rose-100",
      hoverText: "hover:text-rose-700",
      buttonBg: "bg-rose-500 hover:bg-rose-600 focus:ring-rose-200",
      dragBg: "bg-rose-50/50",
    },
  }[accentColorClass as "amber" | "indigo" | "emerald" | "rose"] || {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-500",
    ring: "ring-amber-100",
    hoverText: "hover:text-amber-700",
    buttonBg: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-200",
    dragBg: "bg-amber-50/50",
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Vui lòng tải lên file ảnh hợp lệ (PNG, JPG, WEBP, GIF).");
      return;
    }

    setErrorMessage("");
    setIsCompressing(true);
    try {
      // Compress the image before applying
      const base64String = await compressImage(file, 1200, 1200, 0.75);
      onApply(base64String);
      onClose();
    } catch (err: any) {
      console.error("Compression error:", err);
      setErrorMessage("Không thể nén hoặc xử lý file ảnh này. Vui lòng thử lại với ảnh khác.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    if (!customUrl.startsWith("http://") && !customUrl.startsWith("https://")) {
      setErrorMessage("Địa chỉ URL phải bắt đầu bằng http:// hoặc https://");
      return;
    }
    onApply(customUrl.trim());
    setCustomUrl("");
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
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${themeColors.bg} ${themeColors.text}`}>
                  <Sparkles className="w-5 h-5" />
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
            <div className="p-6 overflow-y-auto space-y-6">
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-100 animate-pulse">
                  {errorMessage}
                </div>
              )}

              {/* Section: Premium Presets */}
              {presets && presets.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">
                    Chọn Ảnh Mẫu Cao Cấp
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {presets.map((preset) => {
                      const isSelected = currentValue === preset.url;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            onApply(preset.url);
                            onClose();
                          }}
                          className={`group relative aspect-video rounded-xl overflow-hidden border-2 text-left transition-all duration-300 hover:scale-[1.02] shadow-sm ${
                            isSelected
                              ? `${themeColors.border} ring-4 ${themeColors.ring}`
                              : "border-gray-100 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={preset.preview || preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                            <span className="text-[9px] font-bold text-white tracking-wide truncate">
                              {preset.name}
                            </span>
                            {isSelected && (
                              <span className="p-0.5 bg-emerald-500 text-white rounded-full">
                                <Check className="w-2.5 h-2.5 stroke-[4]" />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Section: Upload Local File */}
              <div>
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">
                  Tải Ảnh Từ Thiết Bị (Kéo thả hoặc chọn file)
                </h4>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => !isCompressing && fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                    isCompressing ? "opacity-75 pointer-events-none" : ""
                  } ${
                    dragActive
                      ? `${themeColors.border} ${themeColors.dragBg} scale-[0.99]`
                      : "border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isCompressing}
                  />
                  {isCompressing ? (
                    <div className="flex flex-col items-center gap-2 py-2">
                      <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
                      <p className="text-xs font-bold text-indigo-600">
                        Đang tối ưu & nén ảnh...
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        Vui lòng đợi giây lát
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                        <Upload className={`w-5 h-5 ${themeColors.text}`} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-700">
                          Kéo thả ảnh vào đây, hoặc click để chọn ảnh
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">
                          Hỗ trợ JPG, PNG, WEBP. Tự động nén tối ưu bộ nhớ.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Section: Direct Link URL */}
              <div>
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">
                  Nhập Link Ảnh (Direct URL)
                </h4>
                <form onSubmit={handleApplyCustomUrl} className="flex gap-2">
                  <div className="relative flex-grow">
                    <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!customUrl.trim()}
                    className="px-4 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-md flex-shrink-0"
                  >
                    Áp Dụng
                  </button>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
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
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-white font-bold text-xs transition-colors shadow-sm ${themeColors.buttonBg}`}
              >
                Hoàn Tất
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
