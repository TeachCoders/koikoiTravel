"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Sparkles } from "lucide-react";

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
      className={`bg-[#3c4041] text-[#E5E9EC] border-b border-[#4d5254] transition-all duration-300 ${
        isScrolled ? "py-1.5" : "py-2"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 flex items-center justify-between gap-3">
        {/* Left: Clean Tagline */}
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-4 h-4 text-[#F8904D] shrink-0" />
          <span className="text-[#F0F3F5] text-xs sm:text-[13px] font-medium tracking-normal truncate">
            Need another language? Select your preferred language →
          </span>
        </div>

        {/* Right: Highlighted Language Dropdown (no globe icon) */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2f3233] hover:bg-[#353839] border-2 border-[#2E8B8B] text-white text-xs sm:text-[13px] font-bold tracking-wide transition-all shadow-[0_2px_12px_rgba(46,139,139,0.35)] hover:shadow-[0_2px_16px_rgba(46,139,139,0.5)] cursor-pointer"
          >
            <span className="text-base leading-none">{currentLangObj.flag}</span>
            <span className="text-white font-bold">{currentLangObj.nativeName}</span>
            <ChevronDown
              className={`w-4 h-4 text-[#2E8B8B] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mounted && isOpen && (
            <div
              role="listbox"
              className="absolute right-0 mt-2 w-52 rounded-xl bg-[#3c4041] border border-[#525759] shadow-[0_20px_40px_rgba(0,0,0,0.5)] py-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#A6B0B8] border-b border-[#4d5254]">
                Select Language
              </div>
              <div className="py-1">
                {LANGUAGES.map((lang) => {
                  const isSelected = lang.code === currentLang;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectLang(lang)}
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-[13px] transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#2f3233] text-[#F8904D] font-bold"
                          : "text-[#E5E9EC] hover:bg-[#2f3233] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <span className="font-semibold">{lang.nativeName}</span>
                        <span className="text-[11px] text-[#A6B0B8] font-normal">
                          ({lang.name})
                        </span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#F8904D]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden container for Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
    </div>
  );
}
