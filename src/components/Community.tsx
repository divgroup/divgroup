import { motion } from "motion/react";
import { Users, ArrowUpRight, ShieldCheck, Facebook, MessageSquare, Youtube } from "lucide-react";
import { ProfileData } from "../types";

interface CommunityProps {
  data: ProfileData;
}

export default function Community({ data }: CommunityProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const channels = [
    {
      name: "Cộng Đồng Facebook",
      description: "Thảo luận chuyên sâu, chia sẻ kiến thức quản trị thương hiệu số và kết nối kinh doanh cùng hơn 10.000+ thành viên năng động.",
      url: data.community.facebookGroup,
      badge: "FACEBOOK GROUP",
      icon: Facebook,
      gradient: "from-blue-600 to-indigo-700",
    },
    {
      name: "Cộng Đồng Zalo VIP",
      description: "Kênh thông tin tức thì, kết nối 1-1 và cập nhật các chuyên đề tọa đàm kín dành riêng cho giới lãnh đạo và đối tác chiến lược.",
      url: data.community.zaloCommunity,
      badge: "ZALO COMMUNITY",
      icon: MessageSquare,
      gradient: "from-sky-500 to-blue-600",
    },
    {
      name: "Kênh Youtube Độc Quyền",
      description: "Xem lại toàn bộ các bài thuyết trình keynote, talkshow truyền cảm hứng và video phân tích giải pháp công nghệ định danh số.",
      url: data.community.youtubeChannel,
      badge: "YOUTUBE CHANNEL",
      icon: Youtube,
      gradient: "from-rose-600 to-red-700",
    },
  ];

  return (
    <section id="community" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-700 font-mono font-bold block mb-3">
            {data.community.heading}
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-gray-950">
            Kết Nối & Đồng Hành Cùng Chúng Tôi
          </h2>
          <p className="mt-4 text-gray-800 text-sm md:text-base leading-relaxed font-sans font-medium">
            {data.community.description}
          </p>
          <div className="w-16 h-1 bg-gray-950 mx-auto mt-6 rounded-full" />
        </div>

        {/* Channels Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {channels.map((channel, idx) => {
            const IconComponent = channel.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                id={`community-channel-${idx}`}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
              >
                {/* Visual back glow */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gray-900/5 rounded-full blur-xl pointer-events-none" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${channel.gradient} text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105`}>
                      <IconComponent className="w-5 h-5 text-gray-100" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-500 tracking-wider">
                      {channel.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-sans font-bold text-gray-950 group-hover:text-indigo-950 transition-colors">
                    {channel.name}
                  </h3>

                  <p className="text-gray-800 text-sm leading-relaxed font-sans font-medium">
                    {channel.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-community-join-${idx}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gray-950 hover:text-indigo-700 transition-colors tracking-wide uppercase"
                  >
                    Tham Gia Ngay
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>XÁC THỰC</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
