"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNonPromotedProducts } from "@/hooks/product/useNonPromotedProducts";
import { Product } from "@/types/product.type";
import ProductCardFeatured from "../product/ProductCardFeatured";
import { 
  Sparkles, 
  Loader2, 
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Leaf
} from "lucide-react";
import Link from "next/link";

// Skeleton loading
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-6 bg-gray-200 rounded w-24 mt-4" />
      </div>
    </div>
  </div>
);

export default function ProductList() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { data: productsResponse, isLoading } = useNonPromotedProducts({
    page: 1,
    limit: 50,
  });

  const products = useMemo(() => {
    return ((productsResponse?.data as Product[]) || []).filter(
      (p) => p.isPublished && p.isFeatured
    );
  }, [productsResponse]);

  // Responsive items per slide
  const updateItemsPerSlide = useCallback(() => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    if (width < 640) setItemsPerSlide(2);
    else if (width < 1024) setItemsPerSlide(3);
    else if (width < 1280) setItemsPerSlide(4);
    else setItemsPerSlide(5);
  }, []);

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, [updateItemsPerSlide]);

  // Group products
  const groupedProducts = useMemo(() => {
    if (products.length === 0) return [];
    const groups = [];
    for (let i = 0; i < products.length; i += itemsPerSlide) {
      groups.push(products.slice(i, i + itemsPerSlide));
    }
    return groups;
  }, [products, itemsPerSlide]);

  const totalSlides = groupedProducts.length;

  // Auto slide
  useEffect(() => {
    if (totalSlides <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalSlides]);

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  if (isLoading) {
    return (
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Đang tải sản phẩm nổi bật...</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(itemsPerSlide)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 bg-green-50 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <Leaf className="w-16 h-16 text-green-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Chưa có sản phẩm nổi bật</h3>
          <p className="text-gray-500">Các sản phẩm đặc biệt sẽ sớm được cập nhật</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-green-100 rounded-full mb-4">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-green-700 uppercase tracking-wider">
              Sản phẩm nổi bật
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Rau củ quả tươi ngon nhất
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Những sản phẩm sạch hữu cơ được khách hàng yêu thích nhất – tươi mới mỗi ngày, giá trực tiếp từ nông trại
          </p>

          <Link href="/san-pham">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              Xem tất cả
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Slider */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6`}
              >
                {groupedProducts[currentSlide]?.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <ProductCardFeatured product={product} index={idx} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* Dots indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 ${
                  i === currentSlide
                    ? "w-10 h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
                    : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}