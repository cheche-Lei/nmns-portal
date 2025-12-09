// app/travel-community/components/Masonry.tsx
"use client";

import PostCard from "./PostCard";
import { Post } from "../data/posts";

interface MasonryProps {
  posts: Post[];
  className?: string;
}

// 🔹 瀑布流：用 columns-* 做多欄
export default function Masonry({ posts, className = "" }: MasonryProps) {
  const baseClassName =
    "columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-5";

  return (
    <div className={`${baseClassName} ${className}`.trim()}>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
