"use client";

import { Menu, Dropdown, Spin, Avatar, Drawer, Collapse } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
  LogoutOutlined,
  SettingOutlined,
  RightOutlined,
  FireOutlined,
  ClockCircleOutlined,
  CarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Config } from "@/types/config.type";
import { useLogout } from "@/hooks/auth/useLogout";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getImageUrl } from "@/utils/getImageUrl";
import { useCartStore } from "@/stores/cartStore";
import { useAllCategories } from "@/hooks/category/useAllCategories";
import CartPreviewDropdown from "@/components/layout/cart/CartPreviewDropdown";

interface HeaderProps {
  config: Config;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  thumb?: string;
}

// ==================== MARQUEE BANNER - Rau củ quả sạch ====================
const MarqueeBanner = () => {
  const messages = [
    { text: "🔥 SIÊU KHUYẾN MÃI: Rau sạch hữu cơ giảm tới 30%" },
    { text: "🍎 TRÁI CÂY TƯƠI MỚI: Dưa hấu, xoài, thanh long ngọt lịm" },
    { text: "🥬 RAU XANH SẠCH: Cải ngọt, rau muống, xà lách nhập trực tiếp từ Đà Lạt" },
    { text: "⚡ GIAO HÀNG NHANH 2H: Nội thành Hà Nội & TP.HCM - Giữ độ tươi ngon" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-0">
        <div className="flex items-center justify-center py-2.5">
          <div className="flex items-center space-x-8 overflow-hidden">
            <div className="flex items-center gap-2 font-bold text-sm whitespace-nowrap">
              <SearchOutlined className="text-yellow-300" />
              <span className="hidden sm:inline">RAU CỦ QUẢ SẠCH</span>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center space-x-12 animate-marquee whitespace-nowrap">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-500 ${
                      index === currentIndex
                        ? "text-yellow-300 opacity-100"
                        : "opacity-80"
                    }`}
                  >
                    <span>{msg.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {messages.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-yellow-300 scale-125"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PRODUCT DROPDOWN MENU ====================
const ProductDropdownMenu = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();
  const router = useRouter();

  const getHrefWithParams = (categoryId: number) => {
    const params = new URLSearchParams();
    params.set("categoryId", categoryId.toString());
    params.delete("search");
    params.delete("brandId");
    params.delete("hasPromotion");
    params.delete("isFeatured");
    params.delete("page");
    return `/san-pham?${params.toString()}`;
  };

  const handleCategoryClick = (categoryId: number, e: React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("categoryId", categoryId.toString());
    params.delete("search");
    params.delete("brandId");
    params.delete("hasPromotion");
    params.delete("isFeatured");
    params.delete("page");
    router.push(`/san-pham?${params.toString()}`);
  };

  return (
    <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-40">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[340px] max-w-[420px]">
        <div className="max-h-[520px] overflow-y-auto">
          {categories.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={getHrefWithParams(category.id)}
                  onClick={(e) => handleCategoryClick(category.id, e)}
                  className="flex items-center gap-4 p-4 hover:bg-green-50 transition-colors duration-200 group/item cursor-pointer block"
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                    <Image
                      src={getImageUrl(category.thumb) || "/images/no-image.png"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                      unoptimized
                      sizes="48px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 group-hover/item:text-green-600 transition-colors line-clamp-1">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Xem tất cả sản phẩm
                    </div>
                  </div>

                  <RightOutlined className="text-gray-400 text-xs group-hover/item:text-green-600 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">
              Chưa có danh mục
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== SEARCH BAR ====================
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      const params = new URLSearchParams();
      params.set("search", searchValue.trim());
      params.delete("categoryId");
      params.delete("brandId");
      params.delete("hasPromotion");
      params.delete("isFeatured");
      params.delete("page");
      router.push(`/san-pham?${params.toString()}`);
      setSearchValue("");
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Tìm rau muống, cà chua, dưa leo, trái cây hữu cơ..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-11 pl-5 pr-12 text-sm bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600 transition-colors"
        >
          <SearchOutlined className="text-xl" />
        </button>
      </form>
    </div>
  );
};

// ==================== HEADER COMPONENT ====================
const Header = ({ config }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { currentUser, isLoading: isAuthLoading } = useAuth();
  const { logoutUser, isPending: isLogoutPending } = useLogout();
  const isLoggedInUI = !!currentUser;
  const isAdmin = currentUser?.role === "admin";

  const { data: categories } = useAllCategories();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleLogout = () => logoutUser();
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const mainMenuItems = [
    { label: "Trang chủ", href: "/", hasDropdown: false },
    { label: "Sản phẩm", href: "/san-pham", hasDropdown: true },
    { label: "Giới thiệu", href: "/gioi-thieu", hasDropdown: false },
    { label: "Tin tức", href: "/tin-tuc", hasDropdown: false },
    { label: "Liên hệ", href: "/lien-he", hasDropdown: false },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const CartButton = (
    <Link
      href="/gio-hang"
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <ShoppingCartOutlined className="text-xl text-gray-700" />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
          {cartItemCount}
        </span>
      )}
    </Link>
  );

  return (
    <>
      <MarqueeBanner />

      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-0">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity"
            >
              {config?.logo ? (
                <div className="relative h-11 w-40">
                  <Image
                    src={getImageUrl(config.logo) || "/default-logo.png"}
                    alt={config?.name || "Rau Củ Quả Sạch"}
                    fill
                    className="object-contain"
                    unoptimized
                    sizes="(max-width: 768px) 160px, 220px"
                    priority
                  />
                </div>
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {config?.name || "Rau Sạch VN"}
                </span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10 mx-10">
              {mainMenuItems.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-2 py-2 text-sm font-semibold transition-colors ${
                      isActive(item.href)
                        ? "text-green-600"
                        : "text-gray-800 hover:text-green-600"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg
                        className="w-3.5 h-3.5 transition-transform group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 transition-all duration-300 ${
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />

                  {item.hasDropdown && categories && categories.length > 0 && (
                    <ProductDropdownMenu categories={categories} />
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <div className="hidden lg:block">
                <SearchBar />
              </div>

              <button
                onClick={toggleSearch}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSearchOpen ? (
                  <CloseOutlined className="text-lg text-gray-700" />
                ) : (
                  <SearchOutlined className="text-lg text-gray-700" />
                )}
              </button>

              {CartButton}

              <div className="hidden md:block">
                {isLoggedInUI ? (
                  <Dropdown
                    overlay={
                      <Menu className="!rounded-lg !shadow-xl border border-gray-200">
                        <Menu.Item key="account">
                          <Link href="/tai-khoan" className="flex items-center gap-2">
                            Tài khoản
                          </Link>
                        </Menu.Item>
                        {isAdmin && (
                          <Menu.Item key="admin">
                            <Link href="/admin" className="flex items-center gap-2">
                              Quản trị
                            </Link>
                          </Menu.Item>
                        )}
                        <Menu.Item key="logout">
                          <span
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-600"
                          >
                            {isLogoutPending ? <Spin size="small" /> : "Đăng xuất"}
                          </span>
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
                      {currentUser?.avatar ? (
                        <Avatar
                          src={getImageUrl(currentUser.avatar)}
                          size={34}
                          className="ring-2 ring-green-300"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                          {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </button>
                  </Dropdown>
                ) : (
                  <Link href="/login">
                    <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold">
                        <UserOutlined className="text-lg" />
                      </div>
                    </button>
                  </Link>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MenuOutlined className="text-xl text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isSearchOpen ? "max-h-24 opacity-100 pb-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-3 border-t border-gray-100">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Header;