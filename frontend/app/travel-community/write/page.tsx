// app/travel-community/write/page.tsx
"use client";

import { useState } from "react";
import {
  Book,
  Video,
  Camera,
  Hash,
  Send,
  Eye,
  ImagePlus,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/app/components/Breadcrumb";

export default function TravelWritePage() {
  const router = useRouter();
  const [tab, setTab] = useState<"travelogue" | "video" | "photo">(
    "travelogue",
  );

  // 共用狀態
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // 各別內容狀態
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  // 🔹 送出：仍為 demo，但預留 API 串接骨架
  const handleSubmit = async () => {
    const payload = {
      type: tab,
      title,
      content,
      tags,
      videoUrl,
      photoCaption,
      imagesCount: images.length,
    };

    try {
      // TODO: 將下列 console 替換成實際 API 呼叫
      console.info("預備送出的旅遊分享內容", payload);
      alert("已送出！目前為 Demo，尚未串接後端。");
      router.push("/travel-community");
    } catch (error) {
      console.error("送出旅遊分享失敗", error);
      alert("送出失敗，請稍後再試。");
    }
  };

  const tabLabel =
    tab === "travelogue" ? "遊記" : tab === "video" ? "影片" : "隨手拍";
  const previewBody =
    tab === "photo"
      ? photoCaption || "還沒寫下照片故事。"
      : content || "還沒撰寫內容。";
  const previewMediaHint =
    tab === "video"
      ? videoUrl || "尚未貼上影片連結"
      : images.length
      ? `已選擇 ${images.length} 張圖片`
      : "尚未上傳圖片";

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1F2E3C]">
      <main className="mx-auto w-full max-w-[1312px] space-y-6 px-4 lg:px-0 py-10">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "旅遊分享", href: "/travel-community" },
            { label: "撰寫分享" },
          ]}
        />

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full rounded-[28px] border border-[#BA9A60] bg-white p-6 text-sm text-[#1F2E3C]/70 lg:w-[240px] lg:rounded-[32px] lg:border-r">
            <div className="mb-8 flex items-center gap-2 text-lg font-bold text-[#1F2E3C]">
              <Book className="text-[#DCBB87]" size={20} />
              開始分享
            </div>
            <nav className="flex flex-col gap-6">
              <a className="hover:text-[#DCBB87] transition-colors">收藏管理</a>
              <a className="hover:text-[#DCBB87] transition-colors">發表列表</a>
              <a className="hover:text-[#DCBB87] transition-colors">通知列表</a>
            </nav>
          </aside>

          <section className="relative flex-1 rounded-[32px] border border-[#DCBB87] bg-white p-10 shadow-sm">
            {/* 返回按鈕 */}
            <button
              onClick={() => router.push("/travel-community")}
              className="absolute right-10 top-10 flex items-center gap-2 text-sm text-[#1F2E3C]/70 hover:text-[#DCBB87]"
            >
              <ArrowLeft size={16} />
              返回分享列表
            </button>

            <h1 className="mb-6 text-2xl font-bold text-[#1F2E3C]">
              {tab === "travelogue"
                ? "發表遊記"
                : tab === "video"
                ? "發表影片"
                : "隨手拍分享"}
            </h1>

            {/* Tabs */}
            <div className="mb-8 flex gap-4">
              {[
                { key: "travelogue", label: "遊記", icon: <Book size={16} /> },
                { key: "video", label: "影片", icon: <Video size={16} /> },
                { key: "photo", label: "隨手拍", icon: <Camera size={16} /> },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key as any)}
                  className={`flex items-center gap-2 rounded-md border px-6 py-2 ${
                    tab === t.key
                      ? "border-[#DCBB87] bg-[#DCBB87] text-white"
                      : "border-[#DCBB87] text-[#1F2E3C] hover:bg-[#DCBB87]/10"
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            {/* ===== 標題 & 標籤（遊記／影片用） ===== */}
            {(tab === "travelogue" || tab === "video") && (
              <div className="mb-6">
                <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                  標題
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`請輸入${tab === "video" ? "影片" : "文章"}標題`}
                  className="w-full border border-[#DCBB87] rounded-md p-3 text-sm focus:ring-1 focus:ring-[#DCBB87] outline-none"
                />
              </div>
            )}

            {(tab === "travelogue" || tab === "video") && (
              <div className="mb-6">
                <label className="block text-sm mb-2 text-[#1F2E3C]/80 flex items-center gap-2">
                  <Hash size={16} className="text-[#DCBB87]" /> 標籤
                </label>

                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="請輸入標籤"
                    className="flex-1 border border-[#DCBB87] rounded-md p-2 text-sm focus:ring-1 focus:ring-[#DCBB87] outline-none"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-[#DCBB87] text-white rounded-md hover:bg-[#BA9A60]"
                  >
                    新增
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm border border-[#DCBB87] rounded-full text-[#1F2E3C]/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ===== 遊記：內容 + 圖片 ===== */}
            {tab === "travelogue" && (
              <>
                <div className="mb-6">
                  <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                    文章內容
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="今天想寫些什麼..."
                    className="w-full h-[240px] border border-[#DCBB87] rounded-md p-3 text-sm resize-none focus:ring-1 focus:ring-[#DCBB87] outline-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm mb-2 text-[#1F2E3C]/80 flex items-center gap-2">
                    <ImagePlus size={16} className="text-[#DCBB87]" /> 上傳圖片
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-[#1F2E3C]/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#DCBB87]/10 file:text-[#1F2E3C] hover:file:bg-[#DCBB87]/20"
                  />

                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className="border border-[#DCBB87] rounded-md h-[120px] flex items-center justify-center text-sm text-[#1F2E3C]/50"
                        >
                          {img.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ===== 影片 ===== */}
            {tab === "video" && (
              <>
                <div className="mb-6">
                  <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                    影片連結 (YouTube)
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="請貼上影片連結"
                    className="w-full border border-[#DCBB87] rounded-md p-3 text-sm focus:ring-1 focus:ring-[#DCBB87] outline-none"
                  />
                  {videoUrl && (
                    <div className="mt-4 aspect-video w-full border border-[#DCBB87] rounded-md overflow-hidden">
                      <iframe
                        src={videoUrl.replace("watch?v=", "embed/")}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ===== 隨手拍 ===== */}
            {tab === "photo" && (
              <>
                <div className="mb-6">
                  <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                    想說些什麼？
                  </label>
                  <textarea
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    placeholder="今天拍到什麼有趣的畫面？"
                    className="w-full h-[120px] border border-[#DCBB87] rounded-md p-3 text-sm resize-none focus:ring-1 focus:ring-[#DCBB87] outline-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm mb-2 text-[#1F2E3C]/80">
                    上傳圖片
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-[#1F2E3C]/70 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#DCBB87]/10 file:text-[#1F2E3C] hover:file:bg-[#DCBB87]/20"
                  />

                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className="border border-[#DCBB87] rounded-md h-[120px] flex items-center justify-center text-sm text-[#1F2E3C]/50"
                        >
                          {img.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* 按鈕列 */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 border border-[#DCBB87] text-[#1F2E3C] px-6 py-2 rounded-md hover:bg-[#DCBB87]/10"
              >
                <Eye size={16} /> 預覽
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-[#DCBB87] text-white px-6 py-2 rounded-md hover:bg-[#BA9A60]"
              >
                <Send size={16} /> 送出
              </button>
            </div>
          </section>
        </div>
      </main>
      <PreviewModal
        open={showPreview}
        mode={tab}
        onClose={() => setShowPreview(false)}
        tabLabel={tabLabel}
        title={title || `未命名${tabLabel}`}
        body={previewBody}
        tags={tags}
        mediaHint={previewMediaHint}
        videoUrl={videoUrl}
        images={images}
      />
    </div>
  );
}

interface PreviewModalProps {
  open: boolean;
  mode: "travelogue" | "video" | "photo";
  onClose: () => void;
  tabLabel: string;
  title: string;
  body: string;
  tags: string[];
  mediaHint: string;
  videoUrl: string;
  images: File[];
}

function PreviewModal({
  open,
  mode,
  onClose,
  tabLabel,
  title,
  body,
  tags,
  mediaHint,
  videoUrl,
  images,
}: PreviewModalProps) {
  if (!open) return null;
  const firstImage = images[0];
  const moreCount = Math.max(images.length - 1, 0);
  const embedUrl =
    videoUrl && videoUrl.includes("watch?v=")
      ? videoUrl.replace("watch?v=", "embed/")
      : videoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-[32px] bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-[#F1E8DC] pb-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#DCBB87]">
              PREVIEW
            </p>
            <p className="text-sm text-[#1F2E3C]/60">送出前先檢查看看</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#DCBB87] px-4 py-1 text-sm text-[#1F2E3C] hover:bg-[#FDF6EC]"
          >
            關閉
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-[28px] border border-[#EAD9C2] bg-[#FFFBF4] p-4">
            {mode === "video" && embedUrl ? (
              <div className="aspect-video w-full overflow-hidden rounded-[20px] border border-[#DCBB87]/40 bg-black/80">
                <iframe src={embedUrl} className="h-full w-full" allowFullScreen />
              </div>
            ) : firstImage ? (
              <div className="flex h-[320px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#DCBB87]/70 bg-white text-sm text-[#1F2E3C]/70">
                <span className="font-semibold">{firstImage.name}</span>
                {moreCount > 0 && <span>+{moreCount} 張</span>}
              </div>
            ) : (
              <div className="flex h-[320px] items-center justify-center rounded-[20px] border border-dashed border-[#DCBB87]/70 bg-white text-sm text-[#1F2E3C]/60">
                {mediaHint}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-[#FDF6EC] px-3 py-1 text-xs font-semibold text-[#C08A46]">
              {tabLabel}
            </span>
            <h3 className="text-2xl font-bold text-[#1F2E3C]">{title}</h3>
            <p className="whitespace-pre-wrap text-sm leading-7 text-[#1F2E3C]/85">
              {body}
            </p>
            {mode === "video" && videoUrl && (
              <p className="text-xs text-[#1F2E3C]/60">
                影片連結：{videoUrl}
              </p>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#DCBB87] px-3 py-1 text-xs text-[#1F2E3C]/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
