'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useAllCategories } from '@/hooks/category/useAllCategories'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Grid3X3,
  ChevronRight,
  Package,
  Zap,
  Hash,
  Leaf,
  Apple,
  Carrot
} from 'lucide-react'

interface Category {
  id: number
  name: string
  thumb?: string
  productCount?: number
}

// Skeleton đơn giản
const CategorySkeleton = () => (
  <div className="flex flex-col items-center">
    <div className="w-24 h-24 rounded-2xl bg-gray-100 animate-pulse mb-3" />
    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
  </div>
)

// Fallback icon với màu xanh lá tươi mát
const CategoryIcon = ({ name, index }: { name: string; index: number }) => {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-xl rounded-2xl shadow-inner">
      {initials}
    </div>
  )
}

const CategoryImage = ({ 
  thumb, 
  name, 
  index 
}: { 
  thumb?: string; 
  name: string; 
  index: number 
}) => {
  if (thumb) {
    return (
      <img
        src={thumb.startsWith('http') ? thumb : `${process.env.NEXT_PUBLIC_API_URL}${thumb}`}
        alt={name}
        className="w-full h-full object-cover rounded-2xl"
        loading={index < 8 ? "eager" : "lazy"}
      />
    )
  }

  return <CategoryIcon name={name} index={index} />
}

export default function TopCategories() {
  const { data: categories, isLoading } = useAllCategories()

  const displayedCategories = useMemo(() => {
    if (!categories) return []
    return [...categories]
      .sort((a, b) => (b.thumb ? 1 : 0) - (a.thumb ? 1 : 0))
      .slice(0, 24)
  }, [categories])

  if (isLoading) {
    return (
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse mb-4" />
            <div className="h-5 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-8">
            {[...Array(16)].map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!categories || categories.length === 0) return null

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header mới - tươi mát, tự nhiên */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Danh mục sản phẩm
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 text-lg">
            Khám phá các loại rau củ quả sạch hữu cơ tươi ngon
          </p>
        </div>

        {/* Grid card vuông lớn */}
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-8">
          {displayedCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link
                href={`/san-pham?categoryId=${cat.id}`}
                className="block"
                prefetch={false}
              >
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 border-2 border-transparent group-hover:border-green-600/40">
                    <CategoryImage thumb={cat.thumb} name={cat.name} index={index} />
                  </div>

                  {/* Badge số lượng sản phẩm */}
                  {cat.productCount && cat.productCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shadow-lg border-2 border-white">
                      {cat.productCount > 99 ? '99+' : cat.productCount}
                    </div>
                  )}

                  {/* Icon nhỏ cho danh mục không có ảnh */}
                  {!cat.thumb && (
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow">
                      <Leaf size={14} className="text-green-600" />
                    </div>
                  )}
                </div>

                {/* Tên danh mục */}
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2">
                    {cat.name}
                  </p>
                  {cat.productCount && (
                    <p className="text-xs text-gray-500 mt-1">
                      {cat.productCount} sản phẩm
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Thông báo nếu có nhiều hơn */}
        {categories.length > displayedCategories.length && (
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Hiển thị {displayedCategories.length} trong tổng số {categories.length} danh mục
            </p>
            <Link
              href="/danh-muc"
              className="inline-flex items-center gap-2 mt-4 text-green-600 font-medium hover:text-emerald-600 transition"
            >
              Xem tất cả danh mục
              <ChevronRight size={18} />
            </Link>
          </div>
        )}

        {/* Quick links mobile */}
        <div className="mt-12 lg:hidden">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Danh mục phổ biến
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {displayedCategories
              .filter(c => c.productCount && c.productCount > 30)
              .slice(0, 10)
              .map(cat => (
                <Link
                  key={cat.id}
                  href={`/san-pham?categoryId=${cat.id}`}
                  className="flex-shrink-0 px-5 py-3 bg-white rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-md transition whitespace-nowrap"
                >
                  <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}