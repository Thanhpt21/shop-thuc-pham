"use client";

import { Card, Tooltip } from "antd";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";
import { Product } from "@/types/product.type";
import { formatVND } from "@/utils/helpers";
import { useMemo, useState } from "react";
import { Star, Leaf } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product: p, index = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const thumbUrl = useMemo(() => getImageUrl(p.thumb ?? null), [p.thumb]);

  const { finalPrice, discountPercentage, hasDiscount } = useMemo(() => {
    const promo = p.promotionProducts?.[0];
    const basePrice = p.basePrice || 0;
    let finalPrice = basePrice;
    let discountPercentage = 0;
    let hasDiscount = false;

    if (promo && basePrice > 0) {
      if (promo.discountType === "PERCENT") {
        finalPrice = basePrice * (1 - promo.discountValue / 100);
        discountPercentage = promo.discountValue;
        hasDiscount = true;
      } else if (promo.discountType === "FIXED") {
        finalPrice = Math.max(0, basePrice - promo.discountValue);
        discountPercentage = Math.round((promo.discountValue / basePrice) * 100);
        hasDiscount = true;
      }
    }

    return { finalPrice: Math.round(finalPrice), discountPercentage, hasDiscount };
  }, [p.promotionProducts, p.basePrice]);

  const avgRating = useMemo(() => p.totalReviews > 0 ? p.totalRatings / p.totalReviews : 0, [p.totalReviews, p.totalRatings]);

  const hasGift = p.promotionProducts?.[0]?.giftProductId && (p.promotionProducts[0].giftQuantity ?? 0) > 0;

  return (
    <div className="group" style={{ animation: `fadeInUp 0.5s ease-out ${index * 50}ms both` }}>
      <Link href={`/san-pham/${p.slug}`} className="block h-full">
        <Card
          hoverable={false}
          className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-300 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
          bodyStyle={{ padding: 0 }}
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-green-50/30">
            {hasDiscount && discountPercentage > 0 && (
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  -{discountPercentage}%
                </div>
              </div>
            )}

            {hasGift && (
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  <span>Quà tặng</span>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center">
              {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
              <Image
                src={thumbUrl || "/images/no-image.png"}
                alt={p.name}
                fill
                className={`object-contain p-6 transition-all duration-700 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                unoptimized
                priority={index < 6}
              />
            </div>
          </div>

          {/* Info */}
          <div className="p-5 space-y-3">
            {/* Name */}
            <Tooltip title={p.name} placement="top">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                {p.name}
              </h3>
            </Tooltip>

            {/* Rating */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={`${
                    star <= Math.floor(avgRating) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Price */}
            <div className="pt-3 border-t border-gray-100">
              {p.basePrice ? (
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-base font-bold text-green-600">
                      {formatVND(finalPrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatVND(p.basePrice)}
                      </span>
                    )}
                  </div>
                  {hasDiscount && (
                    <p className="text-sm font-medium text-emerald-600 mt-1">
                      Tiết kiệm {formatVND(p.basePrice - finalPrice)}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 font-medium">Liên hệ báo giá</p>
              )}
            </div>
          </div>
        </Card>
      </Link>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}