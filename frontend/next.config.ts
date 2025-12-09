import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 關閉React Strict Mode工具(避免useEffect執行兩次)
  reactStrictMode: false,
  // eslint設定
  eslint: {
    // 忽略build時的eslint錯誤
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略build時的typescript錯誤
    ignoreBuildErrors: false,
  },
  images: {
    // 從遠端連結圖片用的設定
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  
    // ✅ 11/11若晴新增這行讓 Next.js 正常顯示 public 裡的 SVG、PNG，圖片壓縮優化，
    unoptimized: true,
  },
};

export default nextConfig;
