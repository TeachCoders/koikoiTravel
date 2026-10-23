"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import type { NavChild } from "@/lib/utils";
import { QuoteModal } from "./QuoteModal";
import { RequestCallbackModal } from "./RequestCallbackModal";
import LanguageSelector from "./LanguageSelector";
import HeaderSearchBar from "./HeaderSearchBar";
import {
  getActiveIndiaTours,
  getActiveTravelStyles,
  getActiveAboutItems,
} from "@/config/navigationConfig";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isOfferPage = pathname?.startsWith("/offers/");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const indiaTourLinks = useMemo<NavChild[]>(() => getActiveIndiaTours(), []);
  const travelStyleLinks = useMemo<NavChild[]>(() => getActiveTravelStyles(), []);
  const aboutLinks = useMemo<NavChild[]>(() => getActiveAboutItems(), []);

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
  };

  const navLinks: NavLink[] = useMemo(
    () => [
      {
        href: "/destinations",
        label: "India Tours",
        directHref: "/destinations",
        children: indiaTourLinks,
        dropdownStyle: "mega",
        dropdownColumns: 1,
        seeAllHref: "/destinations",
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
        href: "/about-company",
        label: "About Company",
        children: aboutLinks,
        dropdownStyle: "mega",
        dropdownColumns: 1,
      },
    ],
    [indiaTourLinks, travelStyleLinks, aboutLinks]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderMobileAccordion = navLinks.map((link) => {
    const hasChildren = link.children && link.children.length > 0;
    const isOpen = openMenuKey === link.href;

    return (
      <div key={link.href} className="border-b border-[#f2f2f2] last:border-0">
        {!hasChildren ? (
          <Link
            href={link.href}
            onClick={handleMobileClose}
            className="flex w-full items-center justify-between px-2 py-3.5 text-[16px] font-semibold text-[#1C1C1C] transition-colors hover:bg-[#f6f7f8]"
          >
            {link.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => toggleMenu(link.href)}
            aria-expanded={isOpen}
            className="flex w-full items-center justify-between px-2 py-3.5 text-[16px] font-semibold text-[#1C1C1C] transition-colors hover:bg-[#f6f7f8]"
          >
            <span>{link.label}</span>
            <ChevronDown
              className={`h-5 w-5 text-[#999] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        )}

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
                  className="block px-4 py-2.5 text-[15px] font-medium text-[#444] transition-colors hover:bg-[#f6f7f8] hover:text-[#1C1C1C]"
                >
                  <span suppressHydrationWarning>{child.label}</span>
                </Link>
              ))}
              {link.seeAllHref && (
                <Link
                  href={link.seeAllHref}
                  onClick={handleMobileClose}
                  className="flex items-center gap-1 px-4 py-2.5 text-[14px] font-bold text-[#F8904D]"
                >
                  See All <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
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
          className={`max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 transition-[padding] duration-200 ${
            isScrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-3.5"
          }`}
        >
        {/* ===== Single Compact Row: Logo | Search Bar | Nav Links + Create My Trip ===== */}
        <div className="flex items-center justify-between gap-1.5 lg:gap-2.5 xl:gap-4">
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logo-with-name.png"
              alt="KoiKoi Travel"
              width={685}
              height={222}
              priority
              className="w-[125px] sm:w-[140px] md:w-[155px] lg:w-[168px] xl:w-[175px] h-auto object-contain"
            />
          </Link>

          {/* 2. Navigation Links (Centered) */}
          {!isOfferPage && (
            <nav className="hidden md:flex items-center justify-center gap-0.5 lg:gap-1 flex-1 mx-1 lg:mx-2 xl:mx-3 shrink-0">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => link.children ? (clearMegaMenuCloseTimer(), setOpenDesktopDropdown(link.href)) : null}
                  onMouseLeave={() => link.children ? scheduleMegaMenuClose() : setOpenDesktopDropdown(null)}
                >
                  {link.directHref ? (
                    <div className="flex items-center h-full">
                      <Link
                        href={link.directHref}
                        onClick={() => setOpenDesktopDropdown(null)}
                        className={`relative whitespace-nowrap px-2 xl:px-2.5 py-1.5 text-[12.5px] xl:text-[13.5px] font-medium tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 ${openDesktopDropdown === link.href
                          ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                          : "text-[#333]"
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
                        className={`pr-1.5 pl-0.5 py-1.5 cursor-pointer transition-colors duration-200 ${openDesktopDropdown === link.href
                          ? "text-[#2E8B8B]"
                          : "text-[#888] hover:text-[#2E8B8B]"
                          }`}
                      >
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${openDesktopDropdown === link.href ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                    </div>
                  ) : link.children ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDesktopDropdown(
                          openDesktopDropdown === link.href ? null : link.href
                        )
                      }
                      className={`relative whitespace-nowrap px-2 xl:px-2.5 py-1.5 text-[12.5px] xl:text-[13.5px] font-medium tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 cursor-pointer ${openDesktopDropdown === link.href
                        ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                        : "text-[#333]"
                        }`}
                    >
                      <span className="relative z-10" suppressHydrationWarning>{link.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 relative z-10 transition-transform duration-200 ${openDesktopDropdown === link.href ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative whitespace-nowrap px-2 xl:px-2.5 py-1.5 text-[12.5px] xl:text-[13.5px] font-medium tracking-normal rounded-full transition-all duration-200 group flex items-center gap-1 hover:text-[#2E8B8B] hover:bg-[#2E8B8B]/5 ${openDesktopDropdown === link.href
                        ? "text-[#2E8B8B] bg-[#2E8B8B]/5"
                        : "text-[#333]"
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
                        className={`bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] p-5 ${link.dropdownColumns === 1 ? "w-[340px]" : "w-[720px] max-w-[85vw]"
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

          {/* 3. Right Controls: Search Bar -> Language Selector -> Create My Trip Button */}
          {!isOfferPage && (
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2 xl:gap-2.5 shrink-0">
              {/* Search Bar (Next to Language Selector) */}
              <div className="w-[130px] md:w-[150px] lg:w-[175px] xl:w-[220px] 2xl:w-[260px]">
                <HeaderSearchBar />
              </div>

              {/* Language Selector (Next to Create My Trip) */}
              <LanguageSelector />

              {/* Create My Trip CTA Button */}
              <QuoteModal>
                <button
                  type="button"
                  className="btn-primary px-2.5 lg:px-3.5 h-10 sm:h-11 md:h-11 text-xs lg:text-[13px] font-semibold tracking-wide flex items-center justify-center gap-1 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>Create My Trip</span>
                </button>
              </QuoteModal>
            </div>
          )}

          {/* Mobile Right Controls: Language Selector + Create My Trip + Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <LanguageSelector />

            <QuoteModal>
              <button
                type="button"
                className="btn-primary px-2.5 sm:px-3 h-10 sm:h-11 text-xs font-semibold flex items-center justify-center gap-1 shadow-xs cursor-pointer shrink-0"
              >
                <span>Create My Trip</span>
              </button>
            </QuoteModal>

            {!isOfferPage && (
              <button
                onClick={() => (isMobileMenuOpen ? handleMobileClose() : handleMobileOpen())}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="p-1.5 rounded-lg text-[#555] hover:bg-[#f5f5f5] transition-colors focus:outline-none"
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

        {/* Mobile Search Bar (Only shown on mobile beneath logo row) */}
        {!isOfferPage && (
          <div className="mt-2 pb-1 md:hidden">
            <HeaderSearchBar />
          </div>
        )}
      </div>

      {/* Mobile drawer navigation (slide-in, drill-down) */}
      {!isOfferPage &&
        typeof document !== "undefined" &&
        mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-[65] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              onClick={handleMobileClose}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
              className={`fixed top-0 left-0 z-[70] flex h-full w-[86vw] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer head */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#ececec] px-4">
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
                  onClick={handleMobileClose}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-[#555] transition-colors hover:bg-[#f5f5f5]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Accordion menu */}
              <div className="flex-1 overflow-y-auto px-3 py-3">
                <div className="space-y-2">{renderMobileAccordion}</div>
              </div>

                  {/* Drawer actions */}
              <div className="shrink-0 space-y-2 border-t border-[#ececec] px-4 py-3">
                <QuoteModal>
                  <button className="btn-primary w-full py-3 text-base">
                    <span>Enquire Now</span>
                  </button>
                </QuoteModal>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178"}?text=${encodeURIComponent("Hi KoiKoi Travel, I want to inquire about a custom holiday tour package.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#2E8B8B] py-3 text-base font-bold text-white transition-colors hover:bg-[#266f6f] active:scale-95"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </>,
          document.body
        )}
    </header>
    {/* Spacer to preserve document flow so banner and content are never clipped under fixed header */}
    <div
      className={`${isOfferPage ? "h-[76px]" : "h-[120px] md:h-[76px]"} w-full shrink-0 pointer-events-none`}
      aria-hidden="true"
    />
  </>
  );
};

export default Header;
