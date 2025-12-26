"use client";

import {
  CheckCircleOutlined,
  TrophyOutlined,
  TeamOutlined,
  RocketOutlined,
  StarOutlined,
  GlobalOutlined,
  HeartOutlined,
  CodeOutlined,
  ThunderboltOutlined,
  LaptopOutlined,
  ShoppingOutlined,
  CustomerServiceOutlined,
  GiftOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typography } from "antd";

const { Title, Text } = Typography;

// ValueCard - Thiết kế cho shop công nghệ
const ValueCard = ({ icon: Icon, title, description, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative p-8">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-md">
        <Icon className="text-white text-2xl" />
      </div>
      <Title level={4} className="!mb-4 !text-gray-800 group-hover:text-blue-600 transition-colors">
        {title}
      </Title>
      <Text className="text-gray-600 leading-relaxed">{description}</Text>
    </div>
    <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
  </motion.div>
);

// StatCard - Thiết kế cho shop
const StatCard = ({ number, label, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 overflow-hidden group"
  >
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
    <div className="p-8 text-center">
      <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-3">
        {number}
      </div>
      <div className="text-xl font-bold text-gray-800 mb-2">{label}</div>
      <Text className="text-gray-500 text-sm">{description}</Text>
    </div>
  </motion.div>
);

// Skeleton Loading
const AboutUsSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
      {/* Hero Skeleton */}
      <div className="text-center space-y-8">
        <div className="h-10 w-64 bg-gray-200 rounded-full mx-auto animate-pulse" />
        <div className="h-20 w-full max-w-4xl bg-gray-200 rounded-3xl mx-auto animate-pulse" />
      </div>
      {/* Other skeleton sections... */}
    </div>
  </div>
);

export default function AboutUsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Values cho shop công nghệ
  const values = [
    { icon: ShoppingOutlined, title: "Đa dạng sản phẩm", description: "Cung cấp đầy đủ các thiết bị công nghệ từ laptop, PC gaming đến phụ kiện chính hãng." },
    { icon: SafetyOutlined, title: "Chính hãng 100%", description: "Cam kết sản phẩm chính hãng với chế độ bảo hành từ nhà sản xuất." },
    { icon: CustomerServiceOutlined, title: "Hỗ trợ 24/7", description: "Đội ngũ kỹ thuật viên hỗ trợ tư vấn và sửa chữa nhanh chóng." },
    { icon: DollarCircleOutlined, title: "Giá tốt nhất", description: "Luôn có chính sách giá cạnh tranh cùng nhiều ưu đãi hấp dẫn." },
    { icon: RocketOutlined, title: "Giao hàng siêu tốc", description: "Miễn phí giao hàng nội thành trong 2 giờ, toàn quốc 24h." },
    { icon: GiftOutlined, title: "Quà tặng giá trị", description: "Nhiều phần quà hấp dẫn và ưu đãi cho khách hàng thân thiết." },
  ];

  // Stats cho shop
  const stats = [
    { number: "10K+", label: "Sản phẩm", description: "Sản phẩm công nghệ đa dạng" },
    { number: "50K+", label: "Khách hàng", description: "Khách hàng hài lòng" },
    { number: "98%", label: "Đánh giá", description: "Đánh giá 5 sao từ khách hàng" },
    { number: "24/7", label: "Hỗ trợ", description: "Hỗ trợ kỹ thuật trực tuyến" },
  ];

  // Timeline shop công nghệ
  const timeline = [
    { year: "2018", event: "Thành lập cửa hàng", description: "Khởi đầu với cửa hàng nhỏ tại trung tâm thành phố" },
    { year: "2019", event: "Mở rộng online", description: "Phát triển website và bán hàng trực tuyến" },
    { year: "2020", event: "Nhà phân phối chính thức", description: "Trở thành nhà phân phối chính thức của nhiều thương hiệu lớn" },
    { year: "2021", event: "Mở chi nhánh", description: "Mở thêm 3 chi nhánh tại các thành phố lớn" },
    { year: "2022", event: "Phát triển hệ thống", description: "Xây dựng hệ thống bán lẻ công nghệ toàn quốc" },
    { year: "2023", event: "Tiên phong công nghệ", description: "Triển khai showroom trải nghiệm công nghệ cao" },
  ];

  if (!mounted) {
    return <AboutUsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Shop công nghệ */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-gray-900 mb-8"
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              TECH STORE
            </span>
            <br />
            <span className="text-gray-700 text-4xl md:text-5xl">Điểm đến công nghệ đáng tin cậy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Với hơn 5 năm kinh nghiệm trong lĩnh vực công nghệ, chúng tôi tự hào là địa chỉ uy tín cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src="/image/about-tech-store.jpg"
                alt="Cửa hàng công nghệ"
                width={800}
                height={600}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <h3 className="text-white text-2xl font-bold">Showroom công nghệ hiện đại</h3>
                <p className="text-white/80">Trải nghiệm thực tế trước khi mua</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-8"
          >
            <Title level={1} className="!text-4xl !font-bold !text-gray-900">
              Câu chuyện của chúng tôi
            </Title>
            <Text className="text-lg text-gray-600 leading-relaxed">
              Tech Store được thành lập từ niềm đam mê công nghệ và mong muốn mang đến cho người dùng Việt Nam những sản phẩm công nghệ chất lượng nhất với giá cả hợp lý.
            </Text>
            <Text className="text-lg text-gray-600 leading-relaxed">
              Từ một cửa hàng nhỏ, chúng tôi đã phát triển thành hệ thống bán lẻ công nghệ uy tín với showroom trải nghiệm hiện đại, đội ngũ kỹ thuật chuyên nghiệp và dịch vụ chăm sóc khách hàng tận tâm.
            </Text>
            <div className="flex items-center gap-4 pt-6">
              <LaptopOutlined className="text-4xl text-blue-500" />
              <div>
                <div className="font-semibold text-xl">Sứ mệnh</div>
                <Text className="text-gray-600">Cung cấp giải pháp công nghệ toàn diện, đồng hành cùng khách hàng trong kỷ nguyên số.</Text>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Title level={2} className="!text-4xl !font-bold !text-gray-900 mb-4">
              Con số ấn tượng
            </Title>
            <Text className="text-xl text-gray-600">Những thành tựu đáng tự hào</Text>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} delay={index * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 bg-white">
        <div className="text-center mb-16">
          <Title level={2} className="!text-4xl !font-bold !text-gray-900">
            Hành trình phát triển
          </Title>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-cyan-500" />
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-white border-4 border-blue-500 rounded-full z-10" />
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                  <Title level={4} className="!mb-2 !text-gray-800">{item.event}</Title>
                  <Text className="text-gray-600">{item.description}</Text>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2} className="!text-4xl !font-bold !text-gray-900 mb-4">
              Cam kết của chúng tôi
            </Title>
            <Text className="text-xl text-gray-600">Điều làm nên sự khác biệt của Tech Store</Text>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partnership */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Title level={3} className="!text-3xl !font-bold !text-gray-900 mb-4">
              Đối tác thương hiệu
            </Title>
            <Text className="text-gray-600">Những thương hiệu công nghệ hàng đầu thế giới</Text>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
            {['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Samsung'].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-100 rounded-xl p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-gray-700">{brand}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-6"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 md:p-16 text-center text-white shadow-xl">
            <Title level={1} className="!text-4xl !font-bold !text-white mb-6">
              Trải nghiệm công nghệ đỉnh cao
            </Title>
            <Text className="text-xl text-white/90 mb-10 block max-w-3xl mx-auto">
              Ghé thăm showroom của chúng tôi để trải nghiệm sản phẩm thực tế và nhận tư vấn miễn phí từ chuyên gia.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                Đến cửa hàng
              </button>
              <button className="border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300">
                Tư vấn miễn phí
              </button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircleOutlined /> <span>Bảo hành chính hãng</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlined /> <span>Miễn phí vận chuyển</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlined /> <span>Đổi trả 30 ngày</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}