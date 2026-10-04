"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, X } from "lucide-react";
import { useJourneyFilters } from "@/feature/journey/api/useJourney";
import { travelExperienceIcon } from "@/components/shared/TravelExperiencePills";

interface CityOption {
  id: number;
  slug: string;
  title: string;
  stateTitle?: string | null;
}

interface ExpOption {
  id: number;
  slug: string;
  title: string;
}

interface Suggestion {
  kind: "exp" | "city";
  key: string;
  title: string;
  item: ExpOption | CityOption;
}

export default function HeroSearchBar() {
  const router = useRouter();
  const { cities, experiences } = useJourneyFilters();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const q = query.trim().toLowerCase();

  const citySuggestions = useMemo(
    () =>
      q ? cities.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 6) : cities.slice(0, 5),
    [q, cities]
  );

  const expSuggestions = useMemo(
    () =>
      q
        ? experiences.filter((e) => e.title.toLowerCase().includes(q)).slice(0, 6)
        : experiences.slice(0, 4),
    [q, experiences]
  );

  const merged = useMemo<Suggestion[]>(() => {
    const rows: Suggestion[] = [];
    const max = Math.max(expSuggestions.length, citySuggestions.length);
    for (let i = 0; i < max; i++) {
      if (i < expSuggestions.length) {
        const e = expSuggestions[i];
        rows.push({ kind: "exp", key: `e-${e.slug}`, title: e.title, item: e });
      }
      if (i < citySuggestions.length) {
        const c = citySuggestions[i];
        rows.push({ kind: "city", key: `c-${c.slug}`, title: c.title, item: c });
      }
    }
    return rows;
  }, [expSuggestions, citySuggestions]);

  const toggleCity = (c: CityOption) => {
    setSelectedCities((prev) => (prev.includes(c.slug) ? prev : [...prev, c.slug]));
  };

  const toggleExp = (e: ExpOption) => {
    setSelectedExperiences((prev) => (prev.includes(e.title) ? prev : [...prev, e.title]));
  };

  const go = () => {
    const params = new URLSearchParams();
    if (selectedCities.length > 0) params.set("city", selectedCities.join(","));
    if (selectedExperiences.length > 0) params.set("exp", selectedExperiences.join(","));
    if (selectedStates.length > 0) params.set("state", selectedStates.join(","));
    const qs = params.toString();
    router.push(qs ? `/tour-packages?${qs}` : "/tour-packages");
  };

  const cityLabel = (slug: string) => cities.find((c) => c.slug === slug)?.title || slug;
  const expLabel = (title: string) => title;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-r from-[#2E8B8B]/60 via-[#2E8B8B]/40 to-[#2E8B8B]/60 p-[1.5px] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.55)]">
        <div className="bg-white rounded-[14px] p-1.5 sm:p-2.5">
          <div className="flex flex-row items-center gap-0">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#2E8B8B]" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                onKeyDown={(e) => e.key === "Enter" && go()}
                placeholder="Where do you want to go? Try 'Jaipur'..."
                className="w-full h-11 sm:h-14 rounded-l-xl rounded-r-none border border-r-0 border-[#1C1C1C]/10 bg-[#f8f8f8] pl-10 sm:pl-12 pr-2 sm:pr-4 text-base sm:text-lg font-medium text-[#1C1C1C] placeholder-[#aaa] outline-none focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all"
              />

              {open && merged.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.18)] z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                  <div className="py-2 max-h-72 overflow-y-auto">
                    {merged.map((r) => {
                      if (r.kind === "exp") {
                        return (
                          <button
                            key={r.key}
                            type="button"
                            onMouseDown={(ev) => {
                              ev.preventDefault();
                              toggleExp(r.item as ExpOption);
                              setQuery("");
                             go();
                              go();
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-[#1C1C1C] hover:bg-[#f5f5f5] transition-colors"
                          >
                            <span className="w-4 h-4 shrink-0 text-[#F8904D]">
                              {travelExperienceIcon(r.title)}
                            </span>
                            <span className="flex-1 truncate">{r.title}</span>
                          </button>
                        );
                      }
                      return (
                        <button
                          key={r.key}
                          type="button"
                          onMouseDown={(ev) => {
                            ev.preventDefault();
                            toggleCity(r.item as CityOption);
                            setQuery("");
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-left text-sm text-[#1C1C1C] hover:bg-[#f5f5f5] transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-[#2E8B8B] shrink-0" />
                          <span className="flex-1 truncate">{r.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={go}
              className="h-11 sm:h-14 btn-gold px-4 sm:px-8 rounded-r-xl rounded-l-none font-extrabold text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 transition-transform active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

          {(selectedCities.length > 0 ||
            selectedExperiences.length > 0 ||
            selectedStates.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 mt-2 px-1 pb-1">
              {selectedCities.map((slug) => (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1C] bg-[#eef6f6] border border-[#2E8B8B]/25 rounded-full px-3 py-1.5"
                >
                  <MapPin className="w-3 h-3 text-[#2E8B8B]" />
                  {cityLabel(slug)}
                  <button
                    type="button"
                    onClick={() => setSelectedCities((prev) => prev.filter((s) => s !== slug))}
                    className="text-[#1C1C1C]/50 hover:text-[#F8904D] transition-colors"
                    aria-label={`Remove ${cityLabel(slug)}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {selectedExperiences.map((title) => (
                <span
                  key={title}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1C] bg-[#fdf0e6] border border-[#F8904D]/25 rounded-full px-3 py-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#F8904D]" />
                  {expLabel(title)}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedExperiences((prev) => prev.filter((t) => t !== title))
                    }
                    className="text-[#1C1C1C]/50 hover:text-[#F8904D] transition-colors"
                    aria-label={`Remove ${title}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {selectedStates.map((title) => (
                <span
                  key={title}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1C1C] bg-[#eef6f6] border border-[#2E8B8B]/25 rounded-full px-3 py-1.5"
                >
                  <MapPin className="w-3 h-3 text-[#2E8B8B]" />
                  {title}
                  <button
                    type="button"
                    onClick={() => setSelectedStates((prev) => prev.filter((s) => s !== title))}
                    className="text-[#1C1C1C]/50 hover:text-[#F8904D] transition-colors"
                    aria-label={`Remove ${title}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
