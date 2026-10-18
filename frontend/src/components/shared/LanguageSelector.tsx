"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

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

export default function LanguageSelector() {
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
          loadGoogleTranslateScript(() => {
            applyLanguageToDom(saved);
          });
        }
      }
    } catch {
      // localStorage disabled
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
    } catch {
      // ignore
    }

    if (langCode === "en") {
      clearCookie("googtrans");
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
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs sm:text-[13px] font-semibold transition-all shadow-xs cursor-pointer"
        aria-label="Select language"
      >
        <span className="text-sm sm:text-base leading-none" suppressHydrationWarning>{currentLangObj.flag}</span>
        <span className="hidden xl:inline text-xs font-semibold" suppressHydrationWarning>{currentLangObj.nativeName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {mounted && isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.15)] py-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
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
                  className={`w-full text-left px-3.5 py-1.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50 text-[#2E8B8B] font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <span className="font-semibold">{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400">({lang.name})</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#2E8B8B]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hidden container for Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
    </div>
  );
}
