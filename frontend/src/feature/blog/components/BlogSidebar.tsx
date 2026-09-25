import Link from "next/link";
import { CalendarDays, Tag, Sparkles } from "lucide-react";
import type { BlogPost } from "@/feature/blog/type";
import { formatBlogDate } from "@/lib/dateUtils";
import { SERVER_API_BASE } from "@/feature/destinations/api/public-server";
import { journeyPackageHref } from "@/feature/journey/filterOptions";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { QuoteModal } from "@/components/shared/QuoteModal";

async function fetchCategories(): Promise<{ name: string; slug: string }[]> {
  try {
    const url = `${SERVER_API_BASE}/blog-category?limit=100&isActive=true`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data || []).map((c: { name: string; slug: string }) => ({ name: c.name, slug: c.slug }));
  } catch {
    return [];
  }
}

async function fetchRecent(excludeId?: number): Promise<BlogPost[]> {
  try {
    const url = `${SERVER_API_BASE}/blog?limit=6&isActive=true`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data || []).filter((p: BlogPost) => p.id !== excludeId).slice(0, 5);
  } catch {
    return [];
  }
}

async function fetchTopJourneys(): Promise<any[]> {
  try {
    const url = `${SERVER_API_BASE}/journey?limit=100&isActive=true`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    let journeys = json?.data || [];
    journeys = journeys.filter((j: any) => (j.displayOrder ?? 0) > 0);
    journeys.sort((a: any, b: any) => (a.displayOrder ?? Number.MAX_SAFE_INTEGER) - (b.displayOrder ?? Number.MAX_SAFE_INTEGER));
    return journeys.slice(0, 10);
  } catch {
    return [];
  }
}

export default async function BlogSidebar({
  excludeId,
  tags,
}: {
  excludeId?: number;
  tags?: string[];
}) {
  const recent = await fetchRecent(excludeId);
  const topJourneys = await fetchTopJourneys();
  const categories = await fetchCategories();

  return (
    <aside className="space-y-8">
      {/* ===== FREE QUOTE POPUP TRIGGER ===== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2E8B8B] to-[#206b6b] rounded-3xl p-7 text-white shadow-xl">
        <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#F8904D]/30 blur-2xl pointer-events-none" />
        <span className="text-[11px] font-black uppercase tracking-widest text-[#F5B041] block">
          KoiKoi Travel
        </span>
        <h4 className="font-heading text-xl font-extrabold text-white leading-snug mt-1.5">
          Planning Your Trip?
        </h4>
        <p className="mt-1.5 text-sm text-teal-50/90 leading-relaxed">
          Share your travel details and get a tailor-made itinerary with the best prices.
        </p>
        <QuoteModal>
          <button
            type="button"
            className="mt-5 w-full bg-white text-[#2E8B8B] py-3 px-5 rounded-full text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all hover:bg-teal-50"
          >
            <Sparkles size={16} />
            Get Free Quote
          </button>
        </QuoteModal>
      </div>

      {/* ===== TAGS ===== */}
      {tags && tags.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/60 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <h3 className="font-heading text-lg font-extrabold text-[#1C1C1C] mb-5">Tags</h3>
          <div className="flex flex-wrap gap-2.5">
            {tags.map((t) => (
              <Link
                key={t}
                href={`/blog?search=${encodeURIComponent(t)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2E8B8B] bg-[#2E8B8B]/5 border border-[#2E8B8B]/10 rounded-full transition-all hover:bg-[#2E8B8B] hover:text-white hover:shadow-md hover:-translate-y-0.5"
              >
                <Tag size={12} /> {t}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ===== CATEGORIES ===== */}
      {categories.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/60 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <h3 className="font-heading text-lg font-extrabold text-[#1C1C1C] mb-5">Categories</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog?search=${encodeURIComponent(c.name)}`}
                className="flex items-center justify-center px-3 py-2.5 rounded-xl text-[13px] font-bold text-slate-700 bg-slate-50 border border-slate-100 text-center hover:text-white hover:bg-[#2E8B8B] hover:border-[#2E8B8B] transition-all"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ===== TOP 10 TOUR PACKAGES ===== */}
      {topJourneys.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/60 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <h3 className="font-heading text-xs font-black uppercase tracking-[0.2em] text-[#2E8B8B] mb-5 flex items-center justify-between">
            Top 10 Tour Packages
            <span className="text-[10px] font-black text-[#F8904D] bg-[#F8904D]/10 px-2.5 py-0.5 rounded-full">
              {topJourneys.length}
            </span>
          </h3>
          <ol className="mt-2 space-y-1">
            {topJourneys.map((j, i) => (
              <li key={j.id}>
                <Link
                  href={journeyPackageHref(j)}
                  className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <span className="mt-[2px] w-[26px] h-[26px] shrink-0 rounded-full bg-slate-100 text-[#1C1C1C] text-[11px] font-black flex items-center justify-center group-hover:bg-[#2E8B8B] group-hover:text-white transition-colors shadow-sm">
                    {i + 1}
                  </span>
                  <span className="text-[14px] font-bold text-slate-700 group-hover:text-[#2E8B8B] transition-colors leading-relaxed line-clamp-2">
                    {j.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ===== RECENT POSTS ===== */}
      <div className="bg-white rounded-3xl border border-slate-200/60 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        <h3 className="font-heading text-lg font-extrabold text-[#1C1C1C] mb-6">Recent Articles</h3>
        {recent.length === 0 ? (
          <p className="text-sm text-slate-400 font-medium">No posts yet.</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {recent.map((p) => (
              <li key={p.id} className="group">
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex items-center gap-4"
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-100 bg-slate-100">
                    <FallbackImage
                      src={p.thumbImg}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:opacity-0" />
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    {p.publishedAt && (
                      <p className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <CalendarDays size={12} /> {formatBlogDate(p.publishedAt)}
                      </p>
                    )}
                    <p className="text-[14px] font-bold text-[#1C1C1C] leading-snug transition-colors group-hover:text-[#2E8B8B] line-clamp-2">
                      {p.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
