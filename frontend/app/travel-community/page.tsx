// app/travel-community/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageTabs from "./components/PageTabs";
import FilterSidebar from "./components/FilterSidebar";
import Masonry from "./components/Masonry";
import Breadcrumb from "@/app/components/Breadcrumb";
import { PenSquare } from "lucide-react";
import {
  defaultFilterState,
  FilterState,
  mockPosts,
  PostType,
} from "./data/posts";

const filterByTimeRange = (createdAt: string, range: FilterState["timeRange"]) => {
  if (range === "all") return true;
  const target = new Date(createdAt);
  const now = new Date();

  if (range === "year") {
    return target.getFullYear() === now.getFullYear();
  }

  const diffMs = now.getTime() - target.getTime();
  const dayInMs = 24 * 60 * 60 * 1000;
  const diffDays = diffMs / dayInMs;

  if (range === "7d") return diffDays <= 7;
  if (range === "30d") return diffDays <= 30;
  return true;
};

const filterByMileage = (miles: number, tier: FilterState["mileageTier"]) => {
  if (tier === "all") return true;
  return miles >= Number(tier);
};

export default function TravelCommunityPage() {
  const [activeTab, setActiveTab] = useState<PostType>("全部");
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("");
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(defaultFilterState);
  const [applyMessage, setApplyMessage] = useState<string | null>(null);

  const handleFilterChange = (update: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...update }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setApplyMessage("已套用最新篩選條件");
    setTimeout(() => setApplyMessage(null), 2200);
  };

  const visiblePosts = useMemo(() => {
    const keywordLower = keyword.trim().toLowerCase();

    const result = mockPosts
      .filter((post) => {
        if (activeTab !== "全部" && post.type !== activeTab) {
          return false;
        }

        if (country && post.country !== country) {
          return false;
        }

        if (keywordLower) {
          const haystack = `${post.title} ${post.summary} ${post.location} ${post.tags.join(" ")}`.toLowerCase();
          if (!haystack.includes(keywordLower)) {
            return false;
          }
        }

        if (!filterByTimeRange(post.createdAt, appliedFilters.timeRange)) {
          return false;
        }

        if (!filterByMileage(post.miles, appliedFilters.mileageTier)) {
          return false;
        }

        if (
          appliedFilters.selectedTags.length > 0 &&
          !appliedFilters.selectedTags.some((tag) => post.tags.includes(tag))
        ) {
          return false;
        }

        if (
          appliedFilters.selectedCategories.length > 0 &&
          !appliedFilters.selectedCategories.some((category) =>
            post.categories.includes(category),
          )
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (appliedFilters.sort) {
          case "popular":
            return b.likes - a.likes;
          case "miles":
            return b.miles - a.miles;
          case "shares":
            return b.shares - a.shares;
          default:
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
      });

    return result;
  }, [activeTab, country, keyword, appliedFilters]);

  return (
    <main className="space-y-6 relative">
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "旅遊分享" },
        ]}
      />

      {/* 次導航 */}
      <PageTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        keyword={keyword}
        onKeywordChange={setKeyword}
        country={country}
        onCountryChange={setCountry}
        onSearchSubmit={handleApplyFilters}
      />

      {applyMessage && (
        <div className="rounded-full bg-[var(--sw-primary)]/5 text-[var(--sw-primary)] text-sm px-4 py-2 inline-flex items-center">
          {applyMessage}
        </div>
      )}

      {/* 內容區：左側固定篩選 + 右側瀑布流 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 左側 */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onApply={handleApplyFilters}
              appliedMessage={applyMessage}
            />
          </div>
        </aside>

        {/* 右側 */}
        <section className="col-span-12 lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-sm text-[#1F2E3C]/60">
            <span>
              共 {visiblePosts.length} 則{activeTab === "全部" ? "" : activeTab}
              分享
            </span>
            {keyword && (
              <button
                className="text-[var(--sw-primary)] underline"
                onClick={() => setKeyword("")}
              >
                清除關鍵字
              </button>
            )}
          </div>

          {visiblePosts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[rgba(31,46,60,0.2)] p-10 text-center text-[#1F2E3C]/60">
              目前沒有符合條件的分享，換個條件試試吧！
            </div>
          ) : (
            <Masonry posts={visiblePosts} />
          )}
        </section>
      </div>

      {/* 懸浮撰寫按鈕 */}
      <Link
        href="/travel-community/write"
        className="fixed right-5 bottom-5 lg:right-10 lg:bottom-10 z-40 w-14 h-14 rounded-full bg-[var(--sw-accent)] text-white flex items-center justify-center shadow-[0_15px_35px_rgba(31,46,60,0.15)] hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(31,46,60,0.25)] transition"
        aria-label="撰寫新的旅遊分享"
      >
        <PenSquare size={22} />
      </Link>
    </main>
  );
}
