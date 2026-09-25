import type { Metadata } from "next";
import Link from "next/link";
import { Search, Sparkles, ChevronRight, ChevronLeft, Compass, MapPin } from "lucide-react";
import BlogCard from "@/feature/blog/components/BlogCard";
import JsonLd from "@/components/shared/JsonLd";
import { itemListSchema, breadcrumbSchema } from "@/lib/jsonLd";
import type { BlogPost } from "@/feature/blog/type";
import { SERVER_API_BASE } from "@/feature/destinations/api/public-server";

export const revalidate = 60;

const POSTS_PER_PAGE = 12;

function buildPageHref(page: number, search: string): string {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const wanted = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) result.push("…");
    result.push(p);
    prev = p;
  }
  return result;
}

export const metadata: Metadata = {
  title: "Travel Guides & News — Destination Guides and India Tour Tips | KoiKoi Travel",
  description:
    "Explore expert destination guides, the latest travel news, budgeting tips, and hidden insights for India tours — curated by KoiKoi Travel.",
  alternates: { canonical: "/blog" },
  openGraph: {
title: "Travel Guides & News — Destination Guides and India Tour Tips | KoiKoi Travel",
    description:
      "Explore expert destination guides, the latest travel news, budgeting tips, and hidden insights for India tours — curated by KoiKoi Travel.",
    url: "/blog",
    type: "website",
  },
};

function isNewsPost(p: BlogPost): boolean {
  return (p.category || "").toLowerCase().includes("news");
}

async function fetchPosts(
  search?: string,
  page = 1,
  limit = POSTS_PER_PAGE
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  try {
    const url = `${SERVER_API_BASE}/blog?limit=${limit}&page=${page}&isActive=true${search ? `&search=${encodeURIComponent(search)}` : ""}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return { posts: [], total: 0, totalPages: 0 };
    const json = await res.json();
    return {
      posts: json?.data || [],
      total: json?.pagination?.total || 0,
      totalPages: json?.pagination?.totalPages || 0,
    };
  } catch {
    return { posts: [], total: 0, totalPages: 0 };
  }
}

async function fetchNewsPosts(): Promise<BlogPost[]> {
  try {
    const url = `${SERVER_API_BASE}/blog?limit=4&isActive=true&search=${encodeURIComponent("news")}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data || []).filter(isNewsPost);
  } catch {
    return [];
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | string[]; page?: string | string[] }>;
}) {
  const { search, page: pageParam } = await searchParams;
  const searchTerm = Array.isArray(search) ? search[0] : search || "";
  const currentPage = Math.max(
    1,
    parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam || "1", 10) || 1
  );
  const [{ posts, total: totalPosts, totalPages }, newsPosts] = await Promise.all([
    fetchPosts(searchTerm || undefined, currentPage),
    fetchNewsPosts(),
  ]);
  const mainPosts = newsPosts.length > 0 ? posts.filter((p) => !isNewsPost(p)) : posts;
  
  const listSchemaData = itemListSchema(
    posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` }))
  );
  
  const breadcrumbData = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Travel Blog", path: "/blog" },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f8] font-sans">
      {posts.length > 0 && <JsonLd data={listSchemaData} />}
      <JsonLd data={breadcrumbData} />

      <main className="flex-1">
        {/* ===== PAGE HERO WITH SOLID TEAL BACKGROUND ===== */}
        <section className="relative overflow-hidden bg-[#2E8B8B]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-16 right-0 w-72 h-72 rounded-full bg-[#F8904D]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="relative w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-14 md:py-20">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F5B041] mb-3">
                  <Sparkles size={14} /> Travel Guides, News & Inspiration
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl md:text-[46px] font-extrabold text-white tracking-tight leading-tight">
                  India Travel Guides & News
                </h1>
                <p className="mt-3 text-white/85 font-medium max-w-xl text-[15px] leading-relaxed">
                  Expert destination guides and the latest travel news from India, curated by our team.
                </p>
              </div>

              <div className="lg:w-[420px] shrink-0">
                <form action="/blog" method="GET" className="relative">
                  <input
                    type="text"
                    name="search"
                    defaultValue={searchTerm}
                    placeholder="Search destination guides, travel tips..."
                    className="w-full bg-white rounded-full border-0 py-4 pl-12 pr-32 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 outline-none shadow-xl transition-all focus:ring-4 focus:ring-[#F8904D]/30"
                  />
                  <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F8904D] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#e07f3a] transition-colors">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===== BREADCRUMB ===== */}
        <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white shadow-sm">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-3.5 flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#2E8B8B] transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-300 shrink-0" />
            <span className="text-[#1C1C1C] font-semibold">Blog</span>
          </div>
        </nav>

        {/* ===== NEWS SECTION ===== */}
        {newsPosts.length > 0 && (
          <section className="relative overflow-hidden bg-[#141414] text-white mt-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F8904D]/15 via-transparent to-[#2E8B8B]/10 pointer-events-none" />
            <div className="relative max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-14 md:py-16">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-[#F5B041] text-xs font-black uppercase tracking-widest">Stay Updated</span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
                    Latest Travel News
                  </h2>
                </div>
                <Link
                  href="/blog?search=news"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#F8904D] hover:text-white transition-colors shrink-0"
                >
                  View All News <ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsPosts.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== POSTS GRID ===== */}
        <section className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-24">
          {searchTerm && (
            <div className="flex items-center gap-4 mb-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-[#1C1C1C]">
                Search results for <span className="text-[#2E8B8B]">&ldquo;{searchTerm}&rdquo;</span>
              </h2>
              <Link
                href="/blog"
                className="text-sm font-bold text-[#F8904D] hover:underline flex items-center gap-1 ml-auto bg-orange-50 px-3 py-1.5 rounded-full"
              >
                Clear Search
              </Link>
            </div>
          )}
          {mainPosts.length === 0 && newsPosts.length === 0 ? (
            <div className="text-center py-28 bg-white border border-slate-200 rounded-3xl shadow-sm">
              <Search size={48} className="mx-auto text-slate-300 mb-5" />
              {searchTerm ? (
                <p className="text-lg text-slate-500 font-medium">No posts found for &ldquo;{searchTerm}&rdquo;.</p>
              ) : (
                <p className="text-lg text-slate-500 font-medium">No blog posts yet — coming soon.</p>
              )}
            </div>
          ) : (
            mainPosts.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm font-semibold text-slate-500">
                  Showing{" "}
                  <span className="text-[#1C1C1C] font-bold">{(currentPage - 1) * POSTS_PER_PAGE + 1}</span>
                  {" – "}
                  <span className="text-[#1C1C1C] font-bold">
                    {Math.min(currentPage * POSTS_PER_PAGE, totalPosts)}
                  </span>
                  {" of "}
                  <span className="text-[#1C1C1C] font-bold">{totalPosts}</span>
                  {" articles"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {mainPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* ===== PAGINATION ===== */}
              {totalPages > 1 && (
                <nav
                  className="mt-16 flex items-center justify-center gap-2"
                  aria-label="Blog pagination"
                >
                  <Link
                    href={buildPageHref(currentPage - 1, searchTerm)}
                    aria-disabled={currentPage <= 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-[#1C1C1C] hover:bg-[#2E8B8B] hover:text-white hover:border-[#2E8B8B] transition-all ${
                      currentPage <= 1 ? "pointer-events-none opacity-40" : ""
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </Link>

                  {getPageNumbers(currentPage, totalPages).map((p, i) =>
                    p === "…" ? (
                      <span
                        key={`gap-${i}`}
                        className="w-10 h-10 flex items-center justify-center text-sm font-bold text-slate-400"
                      >
                        …
                      </span>
                    ) : (
                      <Link
                        key={p}
                        href={buildPageHref(p, searchTerm)}
                        aria-current={p === currentPage ? "page" : undefined}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          p === currentPage
                            ? "bg-[#F8904D] text-white shadow-lg shadow-[#F8904D]/30"
                            : "bg-white text-[#1C1C1C] border border-slate-200 hover:bg-[#2E8B8B] hover:text-white hover:border-[#2E8B8B]"
                        }`}
                      >
                        {p}
                      </Link>
                    )
                  )}

                  <Link
                    href={buildPageHref(currentPage + 1, searchTerm)}
                    aria-disabled={currentPage >= totalPages}
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-200 text-[#1C1C1C] hover:bg-[#2E8B8B] hover:text-white hover:border-[#2E8B8B] transition-all ${
                      currentPage >= totalPages ? "pointer-events-none opacity-40" : ""
                    }`}
                  >
                    <ChevronRight size={18} />
                  </Link>
                </nav>
              )}
            </>
            )
          )}
        </section>

        {/* ===== INTERNAL LINKING SEO CTA ===== */}
        <section className="bg-white border-t border-slate-200 py-16">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1C] tracking-tight">
              Ready to Turn Inspiration Into Reality?
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto text-base">
              Explore our hand-crafted holiday packages and custom trip itineraries designed for couples, families, and solo travelers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tour-packages"
                className="btn-primary px-7 py-3.5 text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#F8904D]/20"
              >
                <Compass size={16} />
                <span>Explore Tour Packages</span>
              </Link>
              <Link
                href="/travel-experiences"
                className="bg-slate-100 text-[#1C1C1C] hover:bg-[#2E8B8B] hover:text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all flex items-center gap-2"
              >
                <MapPin size={16} />
                <span>Browse Travel Experiences</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
