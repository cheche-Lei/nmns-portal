"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "../data/posts";

const dateFormatter = new Intl.DateTimeFormat("zh-TW", {
  month: "short",
  day: "numeric",
});

export default function PostCard({ post }: { post: Post }) {
  const [error, setError] = useState(false);
  const badge = post.type;
  const isVideo = post.type === "影片";
  const createdLabel = dateFormatter.format(new Date(post.createdAt));

  return (
    <Link href={`/travel-community/${post.id}`}>
      <article
        className="
          mb-[18px]
          break-inside-avoid
          rounded-[var(--sw-r-lg)]
          border border-[rgba(31,46,60,0.08)]
          bg-white shadow-sm overflow-hidden
          cursor-pointer
          hover:shadow-md hover:-translate-y-[2px]
          transition
        "
      >
        {/* 圖片區 */}
        <div className="relative w-full pb-[140%] overflow-hidden bg-[var(--sw-primary)]">
          {!error && post.cover && (
            <img
              src={post.cover}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setError(true)}
            />
          )}

          {/* fallback */}
          {(!post.cover || error) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="w-2/3 h-[2px] bg-[var(--sw-accent)] mb-3 rounded-full opacity-80" />
              <span className="text-[var(--sw-white)] font-bold text-[14px] tracking-wider uppercase">
                No Image
              </span>
              <div className="flex gap-[3px] mt-3">
                <div className="w-1 h-1 bg-[var(--sw-accent)] rounded-full"></div>
                <div className="w-1 h-1 bg-[var(--sw-accent)] rounded-full"></div>
                <div className="w-1 h-1 bg-[var(--sw-accent)] rounded-full"></div>
              </div>
            </div>
          )}

          {/* 類型標籤 */}
          <div className="absolute left-2 top-2">
            <span
              className="
                rounded-full bg-white/85 backdrop-blur
                px-2 py-1 text-[11px] font-semibold
              "
            >
              {badge}
              {isVideo && post.duration ? `・${post.duration}` : ""}
            </span>
          </div>
        </div>

        {/* 內容 */}
        <div className="p-3 space-y-2">
          <div className="sw-h6 leading-tight text-[#1F2E3C]">
            {post.location ? `${post.location}｜` : ""}
            {post.title}
          </div>

          <p className="text-sm text-[#1F2E3C]/70 line-clamp-2">{post.summary}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[11px] rounded-full border border-[rgba(31,46,60,0.08)] text-[#1F2E3C]/70"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div>👤 {post.author}</div>
            <div className="flex items-center gap-2">
              <span>{createdLabel}</span>
              <span className="text-[#DCBB87] font-semibold">
                💳 {post.miles.toLocaleString()} 哩程
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
