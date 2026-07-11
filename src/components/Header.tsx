import React, { useState, useEffect } from "react";
import { Menu, X, Crown, ArrowRight } from "lucide-react";
import { ProfileData } from "../types";

interface HeaderProps {
  data: ProfileData;
}

export default function Header({ data }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = data.navItems || [
    { label: "Trang Chủ", id: "home" },
    { label: "Giới Thiệu", id: "about" },
    { label: "Dự Án", id: "projects" },
    { label: "Thư Viện", id: "gallery" },
    { label: "Dịch Vụ", id: "services" },
    { label: "Liên Hệ", id: "contact" },
  ];

  const companyName = data.companyLogoName || "DIV GROUP";
  const nameParts = companyName.split(" ");
  const brandFirst = nameParts[0] || "";
  const brandRest = nameParts.slice(1).join(" ") || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple scroll spy logic
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.getElementById(id);
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
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-150 shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand/Logo */}
        <a
          href="#home"
          id="logo-link"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 group"
        >
          {/* DIV GROUP Custom SVG Logo Icon */}
          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md border border-amber-400/30 p-1.5 bg-gradient-to-br from-white to-gray-50/50">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="50%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
                <linearGradient id="logoGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>
              </defs>
              {/* Left Blue Chevron */}
              <path
                d="M 46,12 L 12,50 L 46,88 L 46,73 L 24,50 L 46,27 Z"
                fill="url(#logoBlueGrad)"
              />
              {/* Right Gold Chevron */}
              <path
                d="M 54,12 L 88,50 L 54,88 L 54,73 L 76,50 L 54,27 Z"
                fill="url(#logoGoldGrad)"
              />
              {/* Golden 'i' Dot */}
              <circle cx="50" cy="32.5" r="7.5" fill="url(#logoGoldGrad)" />
              {/* Golden 'i' Stem */}
              <rect x="46.25" y="44" width="7.5" height="34" rx="1.5" fill="url(#logoGoldGrad)" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-blue-800 font-sans leading-none flex items-center gap-1">
              DIV <span className="font-extrabold text-amber-600">GROUP</span>
            </span>
            <span className="text-[8px] font-bold font-mono tracking-widest text-gray-500 uppercase mt-0.5 whitespace-nowrap">
              ĐỊNH DANH SỐ
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1.5 bg-gray-50/80 p-1 rounded-2xl border border-gray-100">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                id={`nav-${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-xs font-extrabold uppercase tracking-widest transition-all duration-300 px-4 py-2.5 rounded-xl flex items-center ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-700 to-indigo-800 shadow-md shadow-blue-500/10 scale-102"
                    : "text-gray-600 hover:text-blue-700 hover:bg-white hover:shadow-sm"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            id="header-cta"
            onClick={(e) => handleNavClick(e, "contact")}
            className="group flex items-center gap-2 bg-gray-950 text-white hover:bg-gray-800 transition-all duration-200 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full shadow-md"
          >
            Liên Hệ Ngay
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-800 hover:text-gray-950 transition-colors focus:outline-none bg-white/50 backdrop-blur-sm rounded-lg"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-300 md:hidden z-40 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[calc(100vh-80px)] opacity-100 border-t" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6 bg-white">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              id={`mobile-nav-${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-lg font-bold py-2 border-b border-gray-100 ${
                activeSection === item.id
                  ? "text-gray-950 pl-2 border-l-4 border-l-gray-950"
                  : "text-gray-700 hover:text-gray-950"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            id="mobile-header-cta"
            onClick={(e) => handleNavClick(e, "contact")}
            className="w-full flex items-center justify-center gap-2 bg-gray-950 text-white hover:bg-gray-800 py-3.5 rounded-xl font-bold"
          >
            Liên Hệ Ngay
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
