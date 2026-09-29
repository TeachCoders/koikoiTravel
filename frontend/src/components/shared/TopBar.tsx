"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check, Phone, Sparkles } from "lucide-react";

export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "zh-CN", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  const domain = window.location.hostname;
  document.cookie = `${name}=${value}; path=/;`;
  if (domain !== "localhost") {
    const parts = domain.split(".");
    if (parts.length >= 2) {
      const rootDomain = parts.slice(-2).join(".");
      document.cookie = `${name}=${value}; path=/; domain=.${rootDomain};`;
    }
    document.cookie = `${name}=${value}; path=/; domain=${domain};`;
  }
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  const domain = window.location.hostname;
  const expired = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = `${name}${expired}`;
  document.cookie = `${name}${expired} domain=${domain};`;
  if (domain !== "localhost") {
    const parts = domain.split(".");
    if (parts.length >= 2) {
      const rootDomain = parts.slice(-2).join(".");
      document.cookie = `${name}${expired} domain=.${rootDomain};`;
    }
  }
}

function loadGoogleTranslateScript(onReady: () => void) {
  if (typeof window === "undefined") return;

  if ((window as unknown as { google?: { translate?: unknown } }).google?.translate) {
    onReady();
    return;
  }

  const existingScript = document.getElementById("google-translate-script");
  if (existingScript) {
    onReady();
    return;
  }

  (window as unknown as { googleTranslateElementInit?: () => void }).googleTranslateElementInit = () => {
    try {
      const google = (window as unknown as { google?: { translate?: { TranslateElement: new (opts: unknown, id: string) => void } } }).google;
      if (google?.translate?.TranslateElement) {
        new google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,es,fr,de,zh-CN",
            autoDisplay: false,
          },
          "google_translate_element"
        );
        onReady();
      }
    } catch (e) {
      console.warn("[translate] init error", e);
    }
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

export default function TopBar({ isScrolled }: { isScrolled?: boolean }) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>("en");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("koikoi_user_lang") as LanguageCode | null;
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        setCurrentLang(saved);
        if (saved !== "en") {
          // If a non-English language was previously selected, load translate silently
          loadGoogleTranslateScript(() => {
            applyLanguageToDom(saved);
          });
        }
      }
    } catch {
      // localStorage disabled / private mode
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const applyLanguageToDom = (langCode: LanguageCode) => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        clearInterval(interval);
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
      } else if (attempts > 30) {
        clearInterval(interval);
      }
    }, 150);
  };

  const handleSelectLang = (lang: (typeof LANGUAGES)[number]) => {
    const langCode = lang.code;
    setCurrentLang(langCode);
    setIsOpen(false);

    try {
      localStorage.setItem("koikoi_user_lang", langCode);
    } catch {}

    if (langCode === "en") {
      clearCookie("googtrans");
      setCookie("googtrans", "/en/en");
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = "en";
        select.dispatchEvent(new Event("change"));
      } else {
        window.location.reload();
      }
      return;
    }

    setCookie("googtrans", `/en/${langCode}`);

    loadGoogleTranslateScript(() => {
      applyLanguageToDom(langCode);
    });
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div
      className={`bg-[#0F242F] text-[#E0E8EC] border-b border-[#1E3A4B] transition-all duration-300 text-xs ${
        isScrolled ? "py-1" : "py-1.5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between gap-3">
        {/* Left / Center: Connecting tagline & 24/7 Support line */}
        <div className="flex items-center gap-2 sm:gap-3 truncate">
          <span className="inline-flex items-center gap-1 text-[#F8904D] font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Plan Your Dream Holiday</span>
          </span>
          <span className="text-[#6C8D9E] hidden sm:inline">•</span>
          <a
            href="tel:+919136739178"
            className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#F8904D] transition-colors truncate font-medium"
          >
            <Phone className="w-3 h-3 text-[#2E8B8B] shrink-0" />
            <span className="hidden md:inline text-white/70">24/7 Expert Support:</span>
            <span className="font-semibold text-white tracking-wide">+91 91367 39178</span>
          </a>
        </div>

        {/* Right: Language Dropdown (Radix-like lightweight custom menu) */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#183545] hover:bg-[#204457] border border-[#2B4E63] text-white text-[11px] sm:text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#2E8B8B]" />
            <span className="mr-0.5">{currentLangObj.flag}</span>
            <span>{currentLangObj.nativeName}</span>
            <ChevronDown
              className={`w-3 h-3 text-[#8CA5B4] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mounted && isOpen && (
            <div
              role="listbox"
              className="absolute right-0 mt-1.5 w-44 rounded-lg bg-[#0F242F] border border-[#2B4E63] shadow-[0_12px_28px_rgba(0,0,0,0.4)] py-1 z-[100] animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6C8D9E] border-b border-[#1E3A4B]">
                Select Language
              </div>
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectLang(lang)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#1E3A4B] text-[#F8904D] font-bold"
                        : "text-[#D0DFE6] hover:bg-[#183545] hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-[#8CA5B4] font-normal">
                        ({lang.name})
                      </span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#F8904D]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Hidden container for Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
    </div>
  );
}
