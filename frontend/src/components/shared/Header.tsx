"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search, Phone, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import type { NavChild } from "@/lib/utils";
import { QuoteModal } from "./QuoteModal";
import LanguageSelector from "./LanguageSelector";
import HeaderSearchBar from "./HeaderSearchBar";
import {
  getActiveIndiaTours,
  getActiveTravelStyles,
} from "@/config/navigationConfig";

/* ---------- Contact details ---------- */
const PHONE_DISPLAY = "+91 91367 39178";
const PHONE_HREF = "tel:+919136739178";
const EMAIL = "info@koikoitravel.com";
const FACEBOOK_URL = "https://www.facebook.com/koikoiTravel/";
const YOUTUBE_URL = "https://www.youtube.com/@KoiKoiTravel";
const WHATSAPP_URL = `https://wa.me/${
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178"
}?text=${encodeURIComponent(
  "Hi KoiKoi Travel, I want to inquire about a custom holiday tour package."
)}`;

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M14 8.5V6.9c0-.8.5-1 1-1h1.8V3H14.4C11.8 3 10.6 4.6 10.6 6.7v1.8H8.5V12h2.1v9H14v-9h2.5l.4-3.5H14z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
  </svg>
);

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isOfferPage = pathname?.startsWith("/offers/");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const megaMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearMegaMenuCloseTimer = useCallback(() => {
    if (megaMenuCloseTimer.current) {
      clearTimeout(megaMenuCloseTimer.current);
      megaMenuCloseTimer.current = null;
    }
  }, []);

  const scheduleMegaMenuClose = useCallback(() => {
    megaMenuCloseTimer.current = setTimeout(() => {
      setOpenDesktopDropdown(null);
      megaMenuCloseTimer.current = null;
    }, 120);
  }, []);

  const handleMobileOpen = useCallback(() => {
    setOpenMenuKey(null);
    setIsMobileMenuOpen(true);
  }, []);

  const handleMobileClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMenu = useCallback((key: string) => {
    setOpenMenuKey((prev) => (prev === key ? null : key));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen && !isMobileSearchOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen, isMobileSearchOpen]);

  const indiaTourLinks = useMemo<NavChild[]>(() => getActiveIndiaTours(), []);
  const travelStyleLinks = useMemo<NavChild[]>(() => getActiveTravelStyles(), []);

  type NavLink = {
    href: string;
    label: string;
    children?: NavChild[];
    dropdownStyle?: string;
    dropdownColumns?: number;
    seeAllHref?: string;
    dropdownTitle?: string;
    dropdownSubtext?: string;
    directHref?: string;
    compact?: boolean;
  };

  const navLinks: NavLink[] = useMemo(
    () => [
      {
        href: "/tour-packages/india",
        label: "India Tours",
        directHref: "/tour-packages/india",
        children: indiaTourLinks,
        dropdownStyle: "mega",
        dropdownColumns: 1,
        seeAllHref: "/tour-packages/india",
      },
      {
        href: "/travel-experiences",
        label: "Travel Styles",
        directHref: "/travel-experiences",
        children: travelStyleLinks,
        dropdownStyle: "mega",
        dropdownColumns: 1,
        seeAllHref: "/travel-experiences",
      },
      {
        href: "/guest-gallery",
        label: "Guest Gallery",
        directHref: "/guest-gallery",
      },
      {
        // About Us + Contact Us ek hi dropdown mein
        href: "/about-us",
        label: "About",
        directHref: "/about-us",
        children: [
          { href: "/about-us", label: "About Us" },
          { href: "/contact-us", label: "Contact Us" },
        ] as NavChild[],
        dropdownStyle: "simple",
        dropdownColumns: 1,
        compact: true,
      },
    ],
    [indiaTourLinks, travelStyleLinks]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- Mobile drawer menu rows ---------- */
  const mobileRowClass =
    "flex w-full items-center justify-between px-5 py-3.5 text-[15px] font-semibold text-[#1C1C1C] transition-colors hover:bg-[#f6f7f8]";

  const renderMobileAccordion = navLinks.map((link) => {
    const hasChildren = link.children && link.children.length > 0;
    const isOpen = openMenuKey === link.href;

    return (
      <div key={link.href} className="border-b border-[#efefef]">
        {!hasChildren ? (
          <Link href={link.href} onClick={handleMobileClose} className={mobileRowClass}>
            {link.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => toggleMenu(link.href)}
            aria-expanded={isOpen}
            className={mobileRowClass}
          >
            <span>{link.label}</span>
            <ChevronDown
              className={`h-4 w-4 text-[#888] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {hasChildren && (
          <div
            className={`grid transition-all duration-300 ease-in-out ${isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
              }`}
          >
            <div className="overflow-hidden">
              <div className="pb-3">
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={handleMobileClose}
                    className="block px-7 py-2.5 text-[14px] font-medium text-[#555] transition-colors hover:bg-[#f6f7f8] hover:text-[#1C1C1C]"
                  >
                    <span suppressHydrationWarning>{child.label}</span>
                  </Link>
                ))}
                {link.seeAllHref && (
                  <Link
                    href={link.seeAllHref}
                    onClick={handleMobileClose}
                    className="flex items-center gap-1 px-7 py-2.5 text-[14px] font-bold text-[#F8904D]"
                  >
                    See All <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-200 ${isScrolled
          ? "bg-white/98 backdrop-blur-md shadow-md border-b border-slate-200/80"
          : "bg-white border-b border-slate-100"
          }`}
      >
        <div
          className={`max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-6 xl:px-8 2xl:px-10 transition-[padding] duration-200 ${
            isScrolled ? "py-2 sm:py-2.5" : "py-2.5 sm:py-3 lg:py-3.5"
          }`}
        >
        {/* ===== Single Compact Row: Logo | Nav Links | Search + Language + WhatsApp + CTA ===== */}
        <div className="flex items-center justify-between gap-1.5 lg:gap-2 xl:gap-3">
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo-with-name.png"
              alt="KoiKoi Travel"
              width={685}
              height={222}
              priority
              className="w-[120px] sm:w-[135px] md:w-[145px] lg:w-[148px] xl:w-[165px] 2xl:w-[175px] h-auto object-contain"
            />
          </Link>

          {/* 2. Navigation Links (Centered) */}
          {!isOfferPage && (
            <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 flex-1 mx-1 lg:mx-1.5 xl:mx-3 shrink-0 min-w-0">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => link.children ? (clearMegaMenuCloseTimer(), setOpenDesktopDropdown(link.href)) : null}
                  onMouseLeave={() => link.children ? scheduleMegaMenuClose() : setOpenDesktopDropdown(null)}
                >
                  {link.directHref && link.children && link.children.length > 0 ? (
                    <div className="flex items-center h-full">
                      <Link
                        href={link.directHref}
                        onClick={() => setOpenDesktopDropdown(null)}
                        className={`relative whitespace-nowrap px-2 xl:px-3 py-1.5 text-[13px] xl:text-[14.5px] font-semibold tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 ${openDesktopDropdown === link.href
                          ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                          : "text-[#222]"
                          }`}
                      >
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                      <button
                        type="button"
                        aria-label={`Open ${link.label} menu`}
                        onClick={() =>
                          setOpenDesktopDropdown(
                            openDesktopDropdown === link.href ? null : link.href
                          )
                        }
                        className={`pr-2 pl-0.5 py-1.5 cursor-pointer transition-colors duration-200 ${openDesktopDropdown === link.href
                          ? "text-[#2E8B8B]"
                          : "text-[#666] hover:text-[#2E8B8B]"
                          }`}
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${openDesktopDropdown === link.href ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                    </div>
                  ) : link.children && link.children.length > 0 ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDesktopDropdown(
                          openDesktopDropdown === link.href ? null : link.href
                        )
                      }
                      className={`relative whitespace-nowrap px-2 xl:px-3 py-1.5 text-[13px] xl:text-[14.5px] font-semibold tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1.5 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 cursor-pointer ${openDesktopDropdown === link.href
                        ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                        : "text-[#222]"
                        }`}
                    >
                      <span className="relative z-10" suppressHydrationWarning>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${openDesktopDropdown === link.href ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.directHref || link.href}
                      className={`relative whitespace-nowrap px-2 xl:px-3 py-1.5 text-[13px] xl:text-[14.5px] font-semibold tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 ${openDesktopDropdown === link.href
                        ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                        : "text-[#222]"
                        }`}
                    >
                      <span className="relative z-10" suppressHydrationWarning>{link.label}</span>
                    </Link>
                  )}

                  {link.children && (
                    <div
                      onMouseEnter={() => setOpenDesktopDropdown(link.href)}
                      onMouseLeave={() => setOpenDesktopDropdown(null)}
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-opacity duration-200 ${openDesktopDropdown === link.href
                        ? "opacity-100 visible pointer-events-auto"
                        : "opacity-0 invisible pointer-events-none"
                        }`}
                    >
                      <div
                        className={`bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] ${link.compact ? "p-3" : "p-5"} ${link.compact
                          ? "w-[220px]"
                          : link.dropdownColumns === 1
                            ? "w-[340px]"
                            : "w-[720px] max-w-[85vw]"
                          }`}
                      >
                        {link.dropdownTitle && (
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[16px] font-bold text-[#2E8B8B] tracking-tight">
                              {link.dropdownTitle}
                            </span>
                          </div>
                        )}
                        <div
                          className={`grid gap-x-6 gap-y-1 ${link.dropdownColumns === 1
                            ? "grid-cols-1"
                            : link.dropdownColumns === 2
                              ? "grid-cols-2"
                              : "grid-cols-3"
                            }`}
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDesktopDropdown(null)}
                              className="px-2.5 py-1.5 -mx-2.5 rounded-lg text-[14px] text-slate-700 hover:text-[#2E8B8B] hover:bg-slate-50 font-medium transition-colors duration-150 truncate block"
                            >
                              <span suppressHydrationWarning>{child.label}</span>
                            </Link>
                          ))}
                        </div>
                        {link.seeAllHref && (
                          <div
                            className={`mt-3.5 pt-3 border-t border-slate-100 flex items-center ${
                              link.dropdownSubtext ? "justify-between" : "justify-end"
                            }`}
                          >
                            {link.dropdownSubtext && (
                              <span className="text-[13px] text-slate-500 font-medium">
                                {link.dropdownSubtext}
                              </span>
                            )}
                            <Link
                              href={link.seeAllHref}
                              onClick={() => setOpenDesktopDropdown(null)}
                              className="text-[14px] font-bold text-[#F8904D] hover:text-[#e07a38] transition-colors flex items-center gap-1"
                            >
                              <span>See All</span>
                              <span aria-hidden>→</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* 3. Right Controls: Search Bar -> Language Selector -> WhatsApp -> Create My Trip Button */}
          {!isOfferPage && (
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
              {/* Search Bar (Next to Language Selector) */}
              <div className="w-[135px] lg:w-[145px] xl:w-[185px] 2xl:w-[240px]">
                <HeaderSearchBar />
              </div>

              {/* Language Selector (Next to Create My Trip) */}
              <LanguageSelector />

              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                className="flex h-9 w-9 xl:h-11 xl:w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xs transition-all hover:scale-105 hover:bg-[#1ebe5b] active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>

              {/* Create My Trip CTA Button */}
              <QuoteModal>
                <button
                  type="button"
                  className="btn-primary px-3 xl:px-4 h-9 sm:h-10 md:h-10 xl:h-11 text-[13px] xl:text-[14px] font-bold tracking-normal flex items-center justify-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>Create My Trip</span>
                </button>
              </QuoteModal>
            </div>
          )}

          {/* Mobile & Tablet (<1024px) Right Controls: Search Icon -> WhatsApp -> Language Selector -> Create My Trip (on tablet sm/md) -> Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {!isOfferPage && (
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(true)}
                aria-label="Search destinations and tours"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-slate-700 hover:text-[#2E8B8B] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5 text-slate-700" />
              </button>
            )}

            {/* WhatsApp (bahut chhoti screen par drawer mein dikhega) */}
            {!isOfferPage && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden min-[380px]:flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform active:scale-95"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            )}

            <LanguageSelector />

            {/* On Tablets (640px to 1023px, e.g. 768px), also show Create My Trip CTA */}
            {!isOfferPage && (
              <div className="hidden sm:block">
                <QuoteModal>
                  <button
                    type="button"
                    className="btn-primary px-3 sm:px-3.5 h-9 sm:h-10 text-xs sm:text-[13px] font-bold tracking-normal flex items-center justify-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    <span>Create My Trip</span>
                  </button>
                </QuoteModal>
              </div>
            )}

            {!isOfferPage && (
              <button
                onClick={() => (isMobileMenuOpen ? handleMobileClose() : handleMobileOpen())}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Modal/Overlay (Clean slide-down from top with instant live search) */}
      {!isOfferPage &&
        isMobileSearchOpen &&
        typeof document !== "undefined" &&
        mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[75] bg-black/60 backdrop-blur-xs transition-opacity duration-200 lg:hidden"
              onClick={() => setIsMobileSearchOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-down search drawer at top */}
            <div
              className="fixed top-0 left-0 right-0 z-[80] bg-white border-b border-slate-200 shadow-2xl p-3 sm:p-4 lg:hidden animate-in slide-in-from-top-3 duration-200"
              role="dialog"
              aria-modal="true"
              aria-label="Search destinations"
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <HeaderSearchBar
                    autoFocus
                    isMobileModal
                    onClose={() => setIsMobileSearchOpen(false)}
                    placeholder="Search destinations, tours, styles..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileSearchOpen(false)}
                  aria-label="Close search"
                  className="px-3 py-2 text-slate-600 hover:text-slate-900 text-[13px] font-semibold rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>,
          document.body
        )}

      {/* ===== Mobile drawer (right side) ===== */}
      {!isOfferPage &&
        typeof document !== "undefined" &&
        mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-[65] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              onClick={handleMobileClose}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
              className={`fixed top-0 right-0 z-[70] flex h-full w-[86vw] max-w-[320px] flex-col bg-white shadow-2xl transition-[transform,visibility] duration-300 ease-out lg:hidden ${isMobileMenuOpen ? "visible translate-x-0" : "invisible translate-x-full"
                }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              aria-hidden={!isMobileMenuOpen}
            >
              {/* Head: logo + close */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#ececec] px-5">
                <Link
                  href="/"
                  onClick={handleMobileClose}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/logo-with-name.png"
                    alt="KoiKoi Travel"
                    width={180}
                    height={40}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                </Link>
                <button
                  type="button"
                  onClick={handleMobileClose}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-[#555] transition-colors hover:bg-[#f5f5f5]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable area: menu + contact + social */}
              <div className="flex-1 overflow-y-auto">
                {/* Menu list */}
                <div className="border-b border-[#efefef]">
                  <Link
                    href="/"
                    onClick={handleMobileClose}
                    className={mobileRowClass}
                  >
                    Home
                  </Link>
                </div>
                {renderMobileAccordion}

                {/* Contact */}
                <div className="space-y-3 border-b border-[#efefef] px-5 py-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[13px] font-semibold text-[#555] hover:text-[#25D366]"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-3 text-[13px] text-[#555] hover:text-[#F8904D]"
                  >
                    <Phone className="h-4 w-4 text-[#888]" />
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-3 text-[13px] text-[#555] hover:text-[#F8904D]"
                  >
                    <Mail className="h-4 w-4 text-[#888]" />
                    {EMAIL}
                  </a>
                </div>

                {/* Social */}
                <div className="flex items-center gap-2.5 px-5 py-4">
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="KoiKoi Travel on Facebook"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ddd] text-[#777] transition-colors hover:border-[#F8904D] hover:text-[#F8904D]"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="KoiKoi Travel on YouTube"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ddd] text-[#777] transition-colors hover:border-[#F8904D] hover:text-[#F8904D]"
                  >
                    <YoutubeIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="shrink-0 border-t border-[#ececec] p-4">
                <QuoteModal>
                  <button
                    type="button"
                    className="btn-primary flex w-full items-center justify-center gap-2 py-3 text-[15px] font-bold"
                  >
                    <span>Plan My Trip</span>
                    <span aria-hidden>→</span>
                  </button>
                </QuoteModal>
              </div>
            </div>
          </>,
          document.body
        )}
    </header>
    {/* Spacer to preserve document flow so banner and content are never clipped under fixed header */}
    <div
      className={`${isOfferPage ? "h-[56px]" : "h-[56px] sm:h-[62px] lg:h-[70px] xl:h-[74px]"} w-full shrink-0 pointer-events-none`}
      aria-hidden="true"
    />
  </>
  );
};

export default Header;