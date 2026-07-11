import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  MessageSquare,
  Facebook,
  ArrowUpRight,
  Camera,
  X,
  Upload,
  Link2,
  Check,
  Sparkles,
  RefreshCw,
  Edit3,
  User,
} from "lucide-react";
import { ProfileData } from "../types";
import { compressImage } from "../utils/imageCompressor";

interface CoverProps {
  data: ProfileData;
  onUpdateCover: (newCoverUrl: string) => void;
  onUpdateAvatar: (newAvatarUrl: string) => void;
  onUpdateProfileInfo: (fullName: string, title: string, bioShort: string) => void;
}

const PRESET_COVERS = [
  {
    id: "blue-gold-abstract",
    name: "Luxury Blue & Gold",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
    preview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dark-marble-gold",
    name: "Premium Dark Marble",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    preview: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "modern-corporate",
    name: "Corporate Gold Skyline",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80",
    preview: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "tech-future",
    name: "Future Grid Tech",
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80",
    preview: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "slate-minimal",
    name: "Slate Minimalist",
    url: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80",
    preview: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "abstract-creative",
    name: "Classic Deep Grid",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80",
    preview: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80",
  },
];

const PRESET_AVATARS = [
  {
    id: "exec-male-1",
    name: "Doanh Nhân Nam 1",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: "exec-female-1",
    name: "Doanh Nhân Nữ 1",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: "exec-male-2",
    name: "Doanh Nhân Nam 2",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: "exec-female-2",
    name: "Doanh Nhân Nữ 2",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: "tech-lead",
    name: "Chuyên Gia Công Nghệ",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: "creative-lead",
    name: "Giám Đốc Sáng Tạo",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

export default function Cover({ data, onUpdateCover, onUpdateAvatar, onUpdateProfileInfo }: CoverProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCompressingCover, setIsCompressingCover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Avatar customization states
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarCustomUrl, setAvatarCustomUrl] = useState("");
  const [avatarDragActive, setAvatarDragActive] = useState(false);
  const [avatarErrorMessage, setAvatarErrorMessage] = useState("");
  const [isCompressingAvatar, setIsCompressingAvatar] = useState(false);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  // Profile Info customization states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [tempFullName, setTempFullName] = useState(data.fullName);
  const [tempTitle, setTempTitle] = useState(data.title);
  const [tempBioShort, setTempBioShort] = useState(data.bioShort);
  const [profileErrorMessage, setProfileErrorMessage] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Vui lòng tải lên file ảnh hợp lệ (PNG, JPG, WEBP, GIF).");
      return;
    }

    setErrorMessage("");
    setIsCompressingCover(true);
    try {
      const base64String = await compressImage(file, 1600, 1600, 0.75);
      onUpdateCover(base64String);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Cover compression error:", err);
      setErrorMessage("Không thể nén hoặc xử lý file ảnh này.");
    } finally {
      setIsCompressingCover(false);
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
    onUpdateCover(customUrl.trim());
    setIsModalOpen(false);
    setCustomUrl("");
    setErrorMessage("");
  };

  const handleResetDefault = () => {
    onUpdateCover(PRESET_COVERS[5].url);
    setIsModalOpen(false);
    setErrorMessage("");
  };

  // Avatar-specific event handlers
  const processAvatarFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setAvatarErrorMessage("Vui lòng tải lên file ảnh hợp lệ (PNG, JPG, WEBP, GIF).");
      return;
    }

    setAvatarErrorMessage("");
    setIsCompressingAvatar(true);
    try {
      const base64String = await compressImage(file, 800, 800, 0.75);
      onUpdateAvatar(base64String);
      setIsAvatarModalOpen(false);
    } catch (err: any) {
      console.error("Avatar compression error:", err);
      setAvatarErrorMessage("Không thể nén hoặc xử lý file ảnh này.");
    } finally {
      setIsCompressingAvatar(false);
    }
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAvatarFile(file);
    }
  };

  const handleAvatarDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setAvatarDragActive(true);
    } else if (e.type === "dragleave") {
      setAvatarDragActive(false);
    }
  };

  const handleAvatarDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAvatarDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAvatarFile(file);
    }
  };

  const handleApplyAvatarCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarCustomUrl.trim()) return;
    if (!avatarCustomUrl.startsWith("http://") && !avatarCustomUrl.startsWith("https://")) {
      setAvatarErrorMessage("Địa chỉ URL phải bắt đầu bằng http:// hoặc https://");
      return;
    }
    onUpdateAvatar(avatarCustomUrl.trim());
    setIsAvatarModalOpen(false);
    setAvatarCustomUrl("");
    setAvatarErrorMessage("");
  };

  const handleResetAvatarDefault = () => {
    onUpdateAvatar(PRESET_AVATARS[0].url);
    setIsAvatarModalOpen(false);
    setAvatarErrorMessage("");
  };

  const handleSaveProfileInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempFullName.trim()) {
      setProfileErrorMessage("Họ và tên không được để trống!");
      return;
    }
    if (!tempTitle.trim()) {
      setProfileErrorMessage("Chức danh không được để trống!");
      return;
    }
    onUpdateProfileInfo(tempFullName.trim(), tempTitle.trim(), tempBioShort.trim());
    setIsProfileModalOpen(false);
    setProfileErrorMessage("");
  };

  const handleOpenProfileModal = () => {
    setTempFullName(data.fullName);
    setTempTitle(data.title);
    setTempBioShort(data.bioShort);
    setProfileErrorMessage("");
    setIsProfileModalOpen(true);
  };

  return (
    <section id="home" className="relative pt-20 min-h-screen bg-white flex flex-col justify-between">
      {/* 550px Cover Image & Overlay Container */}
      <div className="relative w-full h-[550px] overflow-hidden group/cover">
        <img
          src={data.coverImage}
          alt="Luxury Abstract Cover"
          className="w-full h-full object-cover scale-105 filter brightness-75 saturate-[0.85] transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Subtle, luxurious metallic-inspired overlay gradient with high opacity for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/50 via-transparent to-gray-950/50" />

        {/* Floating Customizer Button */}
        <button
          id="btn-edit-cover"
          onClick={() => setIsModalOpen(true)}
          className="absolute top-6 right-6 md:right-10 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-md text-gray-950 border border-white/20 shadow-xl transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 z-20 group font-semibold text-xs md:text-sm"
        >
          <Camera className="w-4 h-4 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
          <span>Thay đổi ảnh bìa</span>
        </button>
      </div>

      {/* Main Container - Absolute overlapping and centered content */}
      <div className="max-w-4xl mx-auto px-6 w-full -mt-40 relative z-10 pb-20 flex-grow flex flex-col justify-center items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full text-center flex flex-col items-center"
        >
          {/* Avatar (Circle) 160px */}
          <motion.button
            variants={avatarVariants}
            onClick={() => setIsAvatarModalOpen(true)}
            className="w-40 h-40 rounded-full p-1.5 bg-white shadow-2xl relative mb-6 border border-gray-100 group/avatar cursor-pointer outline-none focus:ring-4 focus:ring-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
            aria-label="Thay đổi ảnh đại diện"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 relative">
              <img
                src={data.avatar}
                alt={data.fullName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
                referrerPolicy="no-referrer"
              />
              {/* Overlay with camera icon on hover */}
              <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white backdrop-blur-[1px]">
                <Camera className="w-5 h-5 mb-1 text-white" />
                <span className="text-[9px] font-extrabold tracking-wider uppercase text-amber-100">Sửa ảnh</span>
              </div>
            </div>
            {/* Status dot to imply active digital identity verified */}
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full animate-pulse shadow-md z-10" />
          </motion.button>

          {/* Full Name & Title (with rich interactive customizer controls) */}
          <div className="relative group/info flex flex-col items-center w-full max-w-2xl px-4">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2.5 group/name flex-wrap"
            >
              <h1 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-gray-950 drop-shadow-sm text-center">
                {data.fullName}
              </h1>
              <button
                onClick={handleOpenProfileModal}
                className="opacity-100 md:opacity-0 group-hover/info:opacity-100 transition-opacity duration-300 p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm border border-amber-100/50 flex items-center gap-1.5"
                title="Chỉnh sửa tên & thông tin cá nhân"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-[10px] font-bold md:hidden">Sửa</span>
              </button>
            </motion.div>

            <motion.button
              variants={itemVariants}
              onClick={handleOpenProfileModal}
              className="text-sm md:text-base font-sans font-bold tracking-widest text-indigo-700 uppercase mt-4 mb-4 bg-indigo-50 hover:bg-indigo-100 px-5 py-2 rounded-full cursor-pointer transition-colors border border-indigo-100 flex items-center gap-2 group/title shadow-sm"
              title="Click để sửa chức danh"
            >
              <span>{data.title}</span>
              <Edit3 className="w-3.5 h-3.5 text-indigo-400 group-hover/title:text-indigo-600 transition-colors" />
            </motion.button>

            {/* Short Introduction */}
            <motion.p
              variants={itemVariants}
              onClick={handleOpenProfileModal}
              className="text-center text-gray-800 font-sans font-medium leading-relaxed text-sm md:text-base mb-8 px-4 hover:bg-gray-50 rounded-xl p-2.5 cursor-pointer transition-colors border border-dashed border-transparent hover:border-gray-200"
              title="Click để sửa tiểu sử"
            >
              {data.bioShort}
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Call Now */}
            <a
              href={`tel:${data.phone.replace(/\s+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-call-now"
              className="flex items-center justify-center gap-2 w-full sm:w-48 bg-gray-950 text-white hover:bg-gray-800 transition-colors duration-200 py-3.5 px-6 rounded-full font-bold text-sm shadow-md"
            >
              <Phone className="w-4 h-4" />
              Gọi Ngay
            </a>

            {/* Chat Zalo */}
            <a
              href={data.socials.zalo}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-chat-zalo"
              className="flex items-center justify-center gap-2 w-full sm:w-48 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 py-3.5 px-6 rounded-full font-bold text-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              Nhắn Zalo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Facebook */}
            <a
              href={data.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-facebook"
              className="flex items-center justify-center gap-2 w-full sm:w-48 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200 py-3.5 px-6 rounded-full font-bold text-sm shadow-md"
            >
              <Facebook className="w-4 h-4" />
              Facebook
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative page scroll down prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-70 hidden sm:flex">
        <span className="text-[10px] uppercase tracking-widest font-mono text-gray-600 font-bold">Cuộn Xuống</span>
        <div className="w-1.5 h-5 bg-gray-300 rounded-full relative overflow-hidden">
          <div className="w-full h-2 bg-gray-950 rounded-full absolute top-0 left-0 animate-bounce" />
        </div>
      </div>

      {/* Dynamic Cover Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
              id="cover-editor-modal"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 font-sans">
                      Thay Đổi Ảnh Bìa VIP
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Tùy biến không gian thương hiệu của bạn
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
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
                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">
                    Ảnh Bìa Cao Cấp (Presets)
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {PRESET_COVERS.map((preset) => {
                      const isSelected = data.coverImage === preset.url;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            onUpdateCover(preset.url);
                            setIsModalOpen(false);
                          }}
                          className={`group relative aspect-video rounded-xl overflow-hidden border-2 text-left transition-all duration-300 hover:scale-[1.02] shadow-sm ${
                            isSelected
                              ? "border-amber-500 ring-4 ring-amber-100"
                              : "border-gray-100 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={preset.preview}
                            alt={preset.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white tracking-wide truncate">
                              {preset.name}
                            </span>
                            {isSelected && (
                              <span className="p-1 bg-amber-500 text-white rounded-full">
                                <Check className="w-2.5 h-2.5 stroke-[4]" />
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section: Upload Local File */}
                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">
                    Tải Ảnh Từ Thiết Bị
                  </h4>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => !isCompressingCover && fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                      isCompressingCover ? "opacity-75 pointer-events-none" : ""
                    } ${
                      dragActive
                        ? "border-amber-500 bg-amber-50/50 scale-[0.99]"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isCompressingCover}
                    />
                    {isCompressingCover ? (
                      <div className="flex flex-col items-center gap-2 py-2">
                        <RefreshCw className="w-8 h-8 animate-spin text-amber-600" />
                        <p className="text-xs font-bold text-amber-600">
                          Đang tối ưu & nén ảnh...
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          Vui lòng đợi giây lát
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-700">
                            Kéo thả ảnh vào đây, hoặc click để chọn ảnh
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium">
                            Hỗ trợ JPG, PNG, WEBP. Tự động nén tối ưu.
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
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!customUrl.trim()}
                      className="px-4 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-md"
                    >
                      Áp Dụng
                    </button>
                  </form>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Đặt lại ảnh mặc định
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors shadow-sm"
                >
                  Hoàn Tất
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Avatar Editor Modal */}
      <AnimatePresence>
        {isAvatarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
              id="avatar-editor-modal"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 font-sans">
                      Thay Đổi Ảnh Đại Diện
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Tùy chỉnh ảnh nhận diện cá nhân của bạn
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsAvatarModalOpen(false);
                    setAvatarErrorMessage("");
                  }}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {avatarErrorMessage && (
                  <div className="p-3.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-100 animate-pulse">
                    {avatarErrorMessage}
                  </div>
                )}

                {/* Section: Premium Presets */}
                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">
                    Ảnh Đại Diện Khuyên Dùng
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {PRESET_AVATARS.map((preset) => {
                      const isSelected = data.avatar === preset.url;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            onUpdateAvatar(preset.url);
                            setIsAvatarModalOpen(false);
                          }}
                          className={`group relative aspect-square rounded-full overflow-hidden border-2 text-left transition-all duration-300 hover:scale-[1.05] shadow-sm mx-auto w-24 h-24 ${
                            isSelected
                              ? "border-indigo-500 ring-4 ring-indigo-100"
                              : "border-gray-100 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white text-center px-1">
                              {preset.name}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center text-white">
                              <Check className="w-5 h-5 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section: Upload Local File */}
                <div>
                  <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3">
                    Tải Ảnh Từ Thiết Bị
                  </h4>
                  <div
                    onDragEnter={handleAvatarDrag}
                    onDragOver={handleAvatarDrag}
                    onDragLeave={handleAvatarDrag}
                    onDrop={handleAvatarDrop}
                    onClick={() => !isCompressingAvatar && avatarFileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                      isCompressingAvatar ? "opacity-75 pointer-events-none" : ""
                    } ${
                      avatarDragActive
                        ? "border-indigo-500 bg-indigo-50/50 scale-[0.99]"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      ref={avatarFileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      disabled={isCompressingAvatar}
                    />
                    {isCompressingAvatar ? (
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
                          <Upload className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-700">
                            Kéo thả ảnh vào đây, hoặc click để chọn ảnh
                          </p>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium">
                            Hỗ trợ JPG, PNG, WEBP. Tự động nén tối ưu.
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
                  <form onSubmit={handleApplyAvatarCustomUrl} className="flex gap-2">
                    <div className="relative flex-grow">
                      <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        value={avatarCustomUrl}
                        onChange={(e) => setAvatarCustomUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!avatarCustomUrl.trim()}
                      className="px-4 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-md"
                    >
                      Áp Dụng
                    </button>
                  </form>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetAvatarDefault}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Đặt lại ảnh mặc định
                </button>
                <button
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-bold text-xs hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  Hoàn Tất
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Profile Info Editor Modal */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
              id="profile-editor-modal"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 font-sans">
                      Sửa Thông Tin Cá Nhân
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Cập nhật danh tính số của bạn trên Landing Page
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsProfileModalOpen(false);
                    setProfileErrorMessage("");
                  }}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSaveProfileInfo} className="flex flex-col flex-grow overflow-hidden">
                <div className="p-6 overflow-y-auto space-y-5 flex-grow">
                  {profileErrorMessage && (
                    <div className="p-3.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-100 animate-pulse">
                      {profileErrorMessage}
                    </div>
                  )}

                  {/* Input: Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: DIV GROUP"
                      value={tempFullName}
                      onChange={(e) => setTempFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Input: Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                      Chức danh / Vị trí
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Giám đốc Điều hành / CEO"
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Input: Short Bio */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                      Giới thiệu ngắn (Tiểu sử)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Nhập giới thiệu ngắn về bản thân..."
                      value={tempBioShort}
                      onChange={(e) => setTempBioShort(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400 resize-none leading-relaxed"
                    />
                    <p className="text-[10px] text-gray-400 font-medium">
                      Mẹo: Giới thiệu ngắn gọn, súc tích sẽ hiển thị đẹp nhất trên phần đầu trang.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileModalOpen(false);
                      setProfileErrorMessage("");
                    }}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white font-bold text-xs hover:bg-gray-50 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    Lưu Thay Đổi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

