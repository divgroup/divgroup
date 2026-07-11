import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Phone, Mail, MapPin, CheckCircle, ShieldAlert, Edit3, X, Check, Sparkles, ArrowUpRight } from "lucide-react";
import { ProfileData } from "../types";

interface ContactProps {
  data: ProfileData;
  onSubmitSuccess: () => void;
  onUpdateContactInfo: (phone: string, email: string, address: string) => void;
}

export default function Contact({ data, onSubmitSuccess, onUpdateContactInfo }: ContactProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for Editing Contact Info
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempPhone, setTempPhone] = useState(data.phone);
  const [tempEmail, setTempEmail] = useState(data.email);
  const [tempAddress, setTempAddress] = useState(data.address);
  const [editError, setEditError] = useState("");

  const handleOpenEditModal = () => {
    setTempPhone(data.phone);
    setTempEmail(data.email);
    setTempAddress(data.address);
    setEditError("");
    setIsEditModalOpen(true);
  };

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempPhone.trim()) {
      setEditError("Số điện thoại không được để trống!");
      return;
    }
    if (!tempEmail.trim()) {
      setEditError("Email không được để trống!");
      return;
    }
    if (!tempAddress.trim()) {
      setEditError("Địa chỉ trụ sở không được để trống!");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempEmail.trim())) {
      setEditError("Địa chỉ email không hợp lệ!");
      return;
    }

    onUpdateContactInfo(tempPhone.trim(), tempEmail.trim(), tempAddress.trim());
    setIsEditModalOpen(false);
    setEditError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate backend transmission safely
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    // Clear Form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });

    // Fire state transition callback to show custom ThankYou page
    onSubmitSuccess();
  };

  return (
    <section id="contact" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3">
            Gửi Yêu Cầu Tư Vấn
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950">
            Liên Hệ & Đặt Lịch Hẹn
          </h2>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-4 rounded-full" />
        </div>

        {/* Form Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Block (Contact Details) - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-sans font-bold text-gray-950 tracking-tight">
                Cùng Nhau Kiến Tạo Tương Lai Phát Triển Vững Bền
              </h3>
              <p className="text-gray-800 text-sm md:text-base leading-relaxed font-sans font-medium">
                Vui lòng gửi thông tin chi tiết về nhu cầu hoặc dự án của bạn qua biểu mẫu bên cạnh. Tôi hoặc đội ngũ trợ lý chuyên môn sẽ phản hồi bạn trong vòng 24 giờ làm việc.
              </p>
              {/* Edit button */}
              <button
                type="button"
                id="btn-edit-contact-details"
                onClick={handleOpenEditModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-800 font-sans font-bold text-xs border border-amber-200/50 shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>Chỉnh sửa thông tin liên hệ</span>
              </button>
            </div>

            {/* Structured info points */}
            <div className="space-y-6">
              {/* Phone item */}
              <a
                href={`tel:${data.phone.replace(/[^+\d]/g, "")}`}
                id="contact-info-phone"
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-950 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <Phone className="w-5 h-5 text-gray-100" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-700 font-bold block uppercase tracking-wider">
                    SỐ ĐIỆN THOẠI
                  </span>
                  <span className="text-base font-sans font-bold text-gray-950 group-hover:text-indigo-600 transition-colors">
                    {data.phone}
                  </span>
                </div>
              </a>

              {/* Email item */}
              <a
                href={`mailto:${data.email}`}
                id="contact-info-email"
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-950 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <Mail className="w-5 h-5 text-gray-100" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-700 font-bold block uppercase tracking-wider">
                    EMAIL LIÊN HỆ
                  </span>
                  <span className="text-base font-sans font-bold text-gray-950 group-hover:text-indigo-600 transition-colors">
                    {data.email}
                  </span>
                </div>
              </a>

              {/* Address item */}
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(data.address)}&t=k`}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-info-address"
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group cursor-pointer animate-none"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-950 text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <MapPin className="w-5 h-5 text-gray-100" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-indigo-700 font-bold block uppercase tracking-wider">
                    ĐỊA CHỈ TRỤ SỞ
                  </span>
                  <span className="text-base font-sans font-bold text-gray-950 group-hover:text-indigo-600 transition-colors block">
                    {data.address}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1 mt-1 group-hover:text-indigo-500 transition-colors">
                    <span>Xem bản đồ vệ tinh</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-2 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 text-xs font-mono font-bold">
              <ShieldAlert className="w-4 h-4 text-indigo-700" />
              <span>DỮ LIỆU ĐƯỢC BẢO MẬT BỞI CHUẨN MÃ HÓA SSL</span>
            </div>
          </div>

          {/* Right Block (Contact Form) - 7 cols */}
          <div className="lg:col-span-7">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold text-gray-950 uppercase tracking-wide">
                    Họ và Tên *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-950 placeholder-gray-500 focus:outline-none focus:border-gray-950 focus:bg-white transition-all font-medium"
                  />
                </div>

                {/* Email address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-gray-950 uppercase tracking-wide">
                    Địa chỉ Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-950 placeholder-gray-500 focus:outline-none focus:border-gray-950 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Telephone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-gray-950 uppercase tracking-wide">
                    Số Điện Thoại *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ví dụ: 090 123 4567"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-950 placeholder-gray-500 focus:outline-none focus:border-gray-950 focus:bg-white transition-all font-medium"
                  />
                </div>

                {/* Service Requirement Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-xs font-bold text-gray-950 uppercase tracking-wide">
                    Dịch Vụ Cần Tư Vấn *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-950 focus:outline-none focus:border-gray-950 focus:bg-white transition-all font-medium"
                  >
                    <option value="" disabled className="text-gray-500">
                      -- Chọn Dịch Vụ --
                    </option>
                    <option value="consulting">Tư Vấn Chiến Lược Doanh Nghiệp</option>
                    <option value="digital-profile">Xây Dựng Thương Hiệu Cá Nhân Số</option>
                    <option value="partnership">Hợp Tác Đầu Tư Phát Triển</option>
                    <option value="general">Ý Kiến Đóng Góp / Khác</option>
                  </select>
                </div>
              </div>

              {/* Textarea message brief */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-gray-950 uppercase tracking-wide">
                  Nội Dung Tin Nhắn (Chi tiết dự án / Yêu cầu công việc) *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Vui lòng cung cấp sơ lược yêu cầu của bạn tại đây..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-950 placeholder-gray-500 focus:outline-none focus:border-gray-950 focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                id="btn-submit-contact"
                disabled={isSubmitting}
                className="w-full bg-gray-950 text-white hover:bg-gray-800 disabled:bg-gray-600 transition-colors py-4 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Đang Truyền Tải Dữ Liệu...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi Tin Nhắn Ngay</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contact Info Editor Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
              id="contact-info-editor-modal"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 font-sans">
                      Sửa Thông Tin Liên Hệ
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Cập nhật số điện thoại, email và địa chỉ trụ sở
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditError("");
                  }}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSaveContactInfo} className="flex flex-col flex-grow overflow-hidden">
                <div className="p-6 overflow-y-auto space-y-5 flex-grow">
                  {editError && (
                    <div className="p-3.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-100 animate-pulse">
                      {editError}
                    </div>
                  )}

                  {/* Input: Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                      Số Điện Thoại
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: +84 90 123 4567"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Input: Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                      Email Liên Hệ
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ví dụ: contact@nguyenvana.id"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Input: Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block">
                      Địa Chỉ Trụ Sở
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Nhập địa chỉ trụ sở đầy đủ..."
                      value={tempAddress}
                      onChange={(e) => setTempAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-400 resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditError("");
                    }}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
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
