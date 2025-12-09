"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { useToast } from "@/app/context/toast-context";

// 💡 UI 基礎元件
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded bg-[#1F2E3C] text-white hover:bg-[#DCBB87] hover:text-[#1F2E3C] transition disabled:opacity-60 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full border border-[#BA9A60] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BA9A60] ${className}`}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl border border-[#BA9A60] bg-white p-6 shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`text-center text-2xl font-semibold mb-4 text-[#1F2E3C] ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => <div>{children}</div>;

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "M",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNameGuide, setShowNameGuide] = useState(false);

  // ✅ 驗證邏輯
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isStrongPassword = (v) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(v);

  const validateRegistration = (data) => {
    const errs = [];
    if (!data.firstName.trim()) errs.push("請輸入姓氏");
    if (!data.lastName.trim()) errs.push("請輸入名字");
    if (!data.birthDate) errs.push("請選擇出生日期");
    if (!data.gender) errs.push("請選擇性別");
    if (!data.email.trim()) errs.push("請輸入電子信箱");
    else if (!isEmail(data.email)) errs.push("電子信箱格式不正確");
    if (!data.password) errs.push("請輸入密碼");
    else if (!isStrongPassword(data.password))
      errs.push("密碼需包含大小寫、數字與符號，且至少 8 碼");
    if (!data.confirmPassword) errs.push("請再次輸入密碼");
    else if (data.password !== data.confirmPassword)
      errs.push("兩次輸入的密碼不一致");
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errs = validateRegistration(formData);
    if (errs.length) {
      setError(errs[0]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3007/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          birthDate: formData.birthDate,
          gender: formData.gender,
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = payload.message || payload.error || "此信箱已註冊";
        setError(msg);
        return;
      }

      showToast({
        title: "註冊成功",
        message: "請使用此帳號登入 Stelwing 會員中心。",
        type: "success",
      });
      setTimeout(() => router.push("/member-center/login"), 1500);
    } catch (err) {
      console.error(err);
      setError("伺服器連線錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F6F7] py-10">
      <Card className="w-[460px]">
        <CardHeader>註冊新會員</CardHeader>
        <CardContent>
          <p className="text-xs text-left text-red-500 mb-2">* 必填項目</p>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            {/* 姓名 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lastName"
                  className="flex items-center gap-1 text-[#1F2E3C] font-medium mb-2"
                >
                  <span className="text-red-500">*</span>
                  姓氏
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="請輸入姓氏"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="flex items-center gap-1 text-[#1F2E3C] font-medium mb-2"
                >
                  <span className="text-red-500">*</span>
                  名字
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="請輸入名字"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-[#916a2b]">
              <span>
                ⚠️ 請務必與護照所示資料完全相同，以免影響訂票及報到。
              </span>
              <button
                type="button"
                onClick={() => setShowNameGuide((prev) => !prev)}
                className="text-[#885628] hover:text-[#DCBB87] transition"
                aria-label="旅客姓名輸入說明"
              >
                <Info size={16} />
              </button>
            </div>
            {showNameGuide && (
              <div className="rounded-lg border border-[#DCBB87] bg-[#FFF8ED] p-4 text-xs text-[#5c4526] space-y-2">
                <div className="font-semibold text-sm">旅客姓名輸入說明</div>
                <ul className="list-disc pl-4 space-y-1">
                  <li>姓氏欄位填寫護照上的姓，名字欄位填寫護照上的名。</li>
                  <li>若有中間名，請直接輸入在名字欄位，例如：EMMY SNOW。</li>
                  <li>若護照只有名或只有姓，缺少的欄位可填入 FNU。</li>
                </ul>
              </div>
            )}

            {/* 出生日期 */}
            <div>
              <label
                htmlFor="birthDate"
                className="flex items-center gap-1 text-[#1F2E3C] font-medium mb-2"
              >
                <span className="text-red-500">*</span>
                出生日期
              </label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* 性別 */}
            <div>
              <label className="flex items-center gap-1 text-[#1F2E3C] font-medium mb-2">
                <span className="text-red-500">*</span>
                性別
              </label>
              <div className="flex gap-6">
                {[
                  { key: "M", label: "男性" },
                  { key: "F", label: "女性" },
                ].map((option) => (
                  <label key={option.key} className="flex items-center gap-2 text-[#1F2E3C]">
                    <input
                      type="radio"
                      name="gender"
                      value={option.key}
                      checked={formData.gender === option.key}
                      onChange={handleChange}
                      required
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* 信箱 */}
            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-1 text-[#1F2E3C] font-medium mb-2"
              >
                <span className="text-red-500">*</span>
                <span>電子信箱（註冊後無法修改）</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* 密碼 */}
            <div>
              <label htmlFor="password" className="block text-[#1F2E3C] font-medium mb-2">
                密碼
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="需包含大小寫、數字與符號，至少 8 碼"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* 確認密碼 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[#1F2E3C] font-medium mb-2">
                確認密碼
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="再次輸入密碼"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "送出中…" : "註冊"}
            </Button>

            <p className="text-center text-sm text-[#1F2E3C] mt-2">
              已有帳號？
              <Link href="/member-center/login" className="text-[#BA9A60] font-medium hover:underline ml-1">
                前往登入
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
