import { motion } from "motion/react";
import { CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";

interface ThankYouProps {
  onBack: () => void;
}

export default function ThankYou({ onBack }: ThankYouProps) {
  return (
    <div
      id="thank-you-view"
      className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Dynamic background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 rounded-full filter blur-3xl opacity-50 -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full text-center space-y-8 p-8 rounded-3xl bg-white border border-gray-200 shadow-2xl relative"
      >
        {/* Animated Green Circle */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 relative">
            <div className="absolute -inset-1.5 bg-emerald-100/30 rounded-full animate-ping pointer-events-none" />
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>

        {/* Messaging block */}
        <div className="space-y-3">
          <h2 className="text-2xl font-sans font-extrabold text-gray-950 tracking-tight">
            Gửi Thông Tin Thành Công!
          </h2>
          <p className="text-gray-800 text-sm font-sans font-medium leading-relaxed">
            Thông tin liên hệ của bạn đã được tiếp nhận và mã hóa an toàn trong hệ thống quản lý.
          </p>
          <p className="text-gray-600 text-xs font-sans">
            Tôi hoặc đội ngũ trợ lý chuyên môn sẽ liên hệ trực tiếp với bạn qua điện thoại hoặc email trong vòng 24 giờ làm việc.
          </p>
        </div>

        {/* Back navigation button */}
        <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
          <button
            id="btn-return-home"
            onClick={onBack}
            className="flex items-center justify-center gap-2 w-full bg-gray-950 text-white hover:bg-gray-800 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay Lại Trang Chủ
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-gray-500 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>KẾT NỐI BẢO MẬT SSL KÍCH HOẠT</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
