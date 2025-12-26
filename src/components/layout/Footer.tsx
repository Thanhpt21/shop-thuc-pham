"use client";

import Link from "next/link";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  HeartOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Config } from "@/types/config.type";

interface FooterProps {
  config: Config;
}

const Footer = ({ config }: FooterProps) => {
  const socialLinks = [
    {
      icon: <FacebookOutlined />,
      url: config.facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      label: "Facebook",
    },
    {
      icon: <TwitterOutlined />,
      url: config.x,
      color: "bg-cyan-600 hover:bg-cyan-700",
      label: "Twitter (X)",
    },
    {
      icon: <InstagramOutlined />,
      url: config.instagram,
      color: "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500",
      label: "Instagram",
    },
    {
      icon: <YoutubeOutlined />,
      url: config.youtube,
      color: "bg-red-600 hover:bg-red-700",
      label: "Youtube",
    },
  ].filter((link) => link.url);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-green-950 via-green-900 to-black text-gray-300">
      {/* Background lá nhẹ nhàng */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-800/30 to-emerald-800/20"></div>
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-lime-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-0 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Info & Contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                {config.name || "Rau Sạch VN"}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Mang đến rau củ quả sạch hữu cơ tươi ngon mỗi ngày từ nông trại đến bàn ăn
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/50 via-green-950 to-black rounded-2xl p-6 border border-green-800/50 hover:border-green-600/50 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center shadow-lg">
                  <PhoneOutlined className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Hotline hỗ trợ</p>
                  <p className="text-gray-500 text-xs">07:00 - 21:00 hàng ngày</p>
                </div>
              </div>
              <a
                href={`tel:${config.mobile}`}
                className="block text-3xl font-black bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent hover:from-emerald-200 hover:to-lime-300 transition-all duration-300"
              >
                {config.mobile || "1800 123 456"}
              </a>
            </div>

            <div>
              <h6 className="text-gray-300 font-bold mb-5 text-sm flex items-center gap-3">
                <span className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
                Kết nối với chúng tôi
              </h6>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}
                    >
                      <span className="text-white text-xl">{link.icon}</span>
                    </div>
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-950/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-green-800">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h6 className="text-gray-300 font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-3">
              <span className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
              Về chúng tôi
            </h6>
            <ul className="space-y-3">
              {[
                { label: "Giới thiệu", href: "/gioi-thieu" },
                { label: "Sản phẩm", href: "/san-pham" },
                { label: "Tin tức", href: "/tin-tuc" },
                { label: "Liên hệ", href: "/lien-he" },
                { label: "Nguồn gốc sản phẩm", href: "/nguon-goc" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-green-300 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <RightOutlined className="text-xs text-green-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h6 className="text-gray-300 font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-3">
              <span className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
              Chính sách & Hỗ trợ
            </h6>
            <ul className="space-y-3">
              {[
                { label: "Chính sách giao hàng", href: "/chinh-sach-giao-hang" },
                { label: "Đổi trả & Hoàn tiền", href: "/doi-tra" },
                { label: "Câu hỏi thường gặp", href: "/cau-hoi-thuong-gap" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-green-300 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <RightOutlined className="text-xs text-green-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company Info */}
          <div>
            <h6 className="text-gray-300 font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-3">
              <span className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
              Thông tin liên hệ
            </h6>

            <div className="bg-gradient-to-br from-green-900/50 via-green-950 to-black rounded-2xl p-6 border border-green-800/50">
              <p className="text-white font-bold text-sm mb-4">
                {config.name || "Rau Sạch VN"}
              </p>
              <div className="space-y-4 text-sm text-gray-400">
                <p className="flex items-start gap-3">
                  <MailOutlined className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="break-all">
                    {config.email || "contact@rausach.vn"}
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <EnvironmentOutlined className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    {config.address || "Hà Nội & TP. Hồ Chí Minh"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-green-900/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {config.name || "Rau Sạch VN"}
              </span>
              . All rights reserved. Made with{" "}
              <HeartOutlined className="text-red-500 mx-1" /> in Vietnam
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-500">
              <Link href="/dieu-khoan" className="hover:text-green-300 transition-colors">
                Điều khoản
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/chinh-sach-bao-mat" className="hover:text-green-300 transition-colors">
                Bảo mật
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/cookies" className="hover:text-green-300 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        .animate-pulse {
          animation: pulse 12s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;