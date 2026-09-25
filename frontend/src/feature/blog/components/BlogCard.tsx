import Link from "next/link";
import { ArrowRight, CalendarDays, UserRound } from "lucide-react";
import { stripHtml } from "@/lib/utils";
import { formatBlogDate } from "@/lib/dateUtils";
import type { BlogPost } from "@/feature/blog/type";
import { FallbackImage } from "@/components/shared/FallbackImage";

export default function BlogCard({ post }: { post: BlogPost }) {
  const rawExcerpt = stripHtml(post.seoDescription || post.moreDescription || "").trim();
  const excerpt = rawExcerpt
    ? (rawExcerpt.length > 110 ? `${rawExcerpt.slice(0, 110)}...` : rawExcerpt)
    : "Explore complete itinerary details, top attractions, travel tips and expert recommendations in this guide.";

  const formattedDate = formatBlogDate(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-500 ease-out h-full"
    >
      {/* Clean image — no text over it */}
      <div className="relative h-[240px] overflow-hidden bg-slate-100 shrink-0">
        <FallbackImage
          src={post.thumbImg}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          theme="light"
        />
      </div>

      <div className="flex flex-col flex-1 p-6 bg-white relative z-10">
        {(post.categories?.length ? post.categories : post.category ? [post.category] : []).map(
          (cat) => (
            <span
              key={cat}
              className="inline-flex self-start items-center px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#2E8B8B] bg-teal-50 rounded-full mb-2 last:mb-3"
            >
              {cat}
            </span>
          )
        )}

        <h3 className="text-[18px] font-bold text-[#1C1C1C] leading-snug group-hover:text-[#2E8B8B] transition-colors line-clamp-2">
          {post.title}
        </h3>

        {(post.author?.trim() || formattedDate) && (
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] font-semibold text-[#a0a0a0]">
            {post.author?.trim() && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap truncate">
                <UserRound size={12} /> {post.author.trim()}
              </span>
            )}
            {formattedDate && (
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap truncate">
                <CalendarDays size={12} /> {formattedDate}
              </span>
            )}
          </div>
        )}

        <p className="mt-3 text-[14px] text-[#666] leading-relaxed line-clamp-2 flex-1">
          {excerpt}
        </p>

        <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#F8904D]">
            Read Article
          </span>
          <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:bg-[#F8904D] group-hover:border-[#F8904D] group-hover:shadow-md transition-all duration-300">
            <ArrowRight size={15} className="text-[#F8904D] group-hover:text-white transition-all duration-300 group-hover:-rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
}