import { motion } from "motion/react";
import { MapPin, Navigation, ShieldAlert } from "lucide-react";
import { ProfileData } from "../types";

interface GoogleMapProps {
  data: ProfileData;
}

export default function GoogleMap({ data }: GoogleMapProps) {
  const { embedUrl } = data.map;
  const address = data.address;

  return (
    <section id="location-map" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3">
            Bản Đồ Chỉ Đường
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950">
            Văn Phòng Đại Diện Toàn Cầu
          </h2>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-4 rounded-full" />
        </div>

        {/* Map Layout Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text / Info Panel - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-lg space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest">
                <Navigation className="w-4 h-4 text-indigo-600" />
                <span>ĐỊA CHỈ ĐÃ XÁC THỰC</span>
              </div>

              <h3 className="text-xl font-sans font-bold text-gray-950 tracking-tight">
                Văn Phòng Làm Việc Chính Thức
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                <p className="text-gray-800 text-sm md:text-base leading-relaxed font-sans font-medium">
                  {address}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 font-mono font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Bảo mật 2 lớp • Cho phép khách ghé thăm theo lịch đặt trước</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Iframe Map - 7 cols */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              id="map-canvas-container"
              className="relative w-full aspect-[4/3] max-h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100"
            >
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                title="Bản Đồ Google Maps Nguyễn Văn A"
                className="filter grayscale-[10%] contrast-110"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
