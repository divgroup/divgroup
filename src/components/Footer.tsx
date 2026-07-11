import { useState, useEffect } from "react";
import { ArrowUp, ShieldCheck, Cpu } from "lucide-react";
import { ProfileData } from "../types";

interface FooterProps {
  data: ProfileData;
}

export default function Footer({ data }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-gray-950 text-white py-16 relative overflow-hidden border-t border-gray-900">
      {/* Absolute decorative glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-gray-900">
          {/* Left Block - Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="footerLogoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="footerLogoGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#fef08a" />
                  </linearGradient>
                </defs>
                <path
                  d="M 46,12 L 12,50 L 46,88 L 46,73 L 24,50 L 46,27 Z"
                  fill="url(#footerLogoBlueGrad)"
                />
                <path
                  d="M 54,12 L 88,50 L 54,88 L 54,73 L 76,50 L 54,27 Z"
                  fill="url(#footerLogoGoldGrad)"
                />
                <circle cx="50" cy="32.5" r="7.5" fill="url(#footerLogoGoldGrad)" />
                <rect x="46.25" y="44" width="7.5" height="34" rx="1.5" fill="url(#footerLogoGoldGrad)" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-wider block text-white flex items-center gap-1">
                DIV <span className="text-amber-500 font-extrabold">GROUP</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500 block uppercase tracking-widest">
                {data.companyInitials} • TRỰC THUỘC HỆ SINH THÁI DOANH NGHIỆP SỐ
              </span>
            </div>
          </div>

          {/* Center Block - Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-400 font-bold">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CHỨNG NHẬN DANH TÍNH SỐ CHUẨN VIP</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal notes */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs text-gray-400 font-medium">
          <p className="text-center md:text-left">
            © {currentYear} {data.fullName}. Bản quyền đã được bảo hộ chuẩn pháp lý quốc gia.
          </p>

          <div className="flex items-center gap-6 text-gray-400 font-bold">
            <span className="hover:text-white transition-colors cursor-pointer">Điều Khoản Sử Dụng</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Chính Sách Bảo Mật</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cơ Chế Bảo Mật Số</span>
          </div>
        </div>
      </div>

      {/* Elegant, Floating Back To Top button */}
      <button
        id="btn-back-to-top"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-gray-950 hover:bg-gray-800 text-white shadow-xl border border-gray-800 transition-all duration-300 transform flex items-center justify-center cursor-pointer ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        aria-label="Về đầu trang"
        title="Về đầu trang"
      >
        <ArrowUp className="w-5 h-5 text-gray-100" />
      </button>
    </footer>
  );
}
