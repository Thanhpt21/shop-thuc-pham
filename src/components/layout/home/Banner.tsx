"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Truck, RefreshCw, Shield, CreditCard } from "lucide-react";
import Image from "next/image";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Màu chủ đạo xanh lá tươi mát
  const primaryColor = "#16a34a"; // green-600

  const slides = [
    {
      title: "Rau Xanh Hữu Cơ Đà Lạt",
      subtitle: "Tươi sạch từ nông trại đến bàn ăn",
      desc: "Rau cải, xà lách, rau muống... thu hoạch sáng giao chiều",
      imageUrl: "https://kamereo.vn/blog/wp-content/uploads/2024/08/da-lat-vegetables-and-fruits-1.jpg",
    },
    {
      title: "Trái Cây Tươi Ngon Theo Mùa",
      subtitle: "Ngọt lịm tự nhiên từ Việt Nam",
      desc: "Thanh long, xoài, dưa hấu, chuối... đa dạng và chất lượng",
      imageUrl: "https://vietnam.travel/sites/default/files/inline-images/guide%20to%20vietnam%20fruits.jpg",
    },
    {
      title: "Củ Quả Sạch An Toàn",
      subtitle: "Nguồn gốc rõ ràng, hữu cơ 100%",
      desc: "Cà rốt, khoai tây, hành tây... tốt cho sức khỏe gia đình",
      imageUrl: "https://cdn.mos.cms.futurecdn.net/KbGSuTzZXEaLgEirnPFQsS.jpg",
    },
    {
      title: "Combo Rau Củ Gia Đình",
      subtitle: "Tiết kiệm - Tiện lợi - Đủ dinh dưỡng",
      desc: "Combo tuần đầy đủ rau củ quả tươi ngon",
      imageUrl: "https://www.foodandwine.com/thmb/8rjXV2rrlAwmEcMVNoOnpvEZr7s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/faw-gourmet-gift-baskets-orchards-abundance-fruit-gift-basket-arnesia-young-21-1-d5db41de40b54e59ad828fe74691b826.jpeg",
    },
  ];

  const services = [
    { icon: Truck, title: "Giao hàng nhanh 2h", desc: "Nội thành HN & HCM - Giữ độ tươi nguyên" },
    { icon: RefreshCw, title: "Hoàn tiền 100%", desc: "Không hài lòng hoàn tiền ngay" },
    { icon: Shield, title: "100% Sạch & Hữu cơ", desc: "Kiểm định nghiêm ngặt" },
    { icon: CreditCard, title: "Thanh toán dễ dàng", desc: "COD, ví điện tử" },
  ];

  const stats = [
    { value: "5.000+", label: "Sản phẩm sạch" },
    { value: "30.000+", label: "Khách hàng tin dùng" },
    { value: "4.9/5", label: "Đánh giá trung bình" },
    { value: "10+", label: "Năm cung cấp rau sạch" },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timerRef.current || undefined);
  }, [nextSlide]);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Slider Hero - Full width, hình ảnh lớn */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentIndex].imageUrl}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Nội dung overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              key={currentIndex}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {slides[currentIndex].title}
              </h1>
              <p className="text-xl md:text-2xl font-medium mb-6">
                {slides[currentIndex].subtitle}
              </p>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                {slides[currentIndex].desc}
              </p>
              <button className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition shadow-lg">
                Mua ngay →
              </button>
            </motion.div>
          </div>
        </div>

        {/* Nút điều hướng */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition"
        >
          <ChevronLeft size={28} className="text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition"
        >
          <ChevronRight size={28} className="text-gray-800" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                idx === currentIndex ? "bg-white w-10" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Phần dưới slider: Stats + Dịch vụ */}
      <div className="bg-green-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold" style={{ color: primaryColor }}>
                  {stat.value}
                </div>
                <div className="text-lg text-gray-700 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Dịch vụ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <service.icon size={40} style={{ color: primaryColor }} className="mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}