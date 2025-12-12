export interface NavChildItem {
  title: string;
  href: string;
}

export interface NavItem {
  title: string;
  children: NavChildItem[];
}

export const navData: NavItem[] = [
  {
    title: '最新消息',
    children: [
      { title: '最新消息', href: '#' },
      { title: '更新日誌', href: '#' },
      { title: '活動行事曆', href: '#' },
      { title: '新聞中心', href: '#' },
      { title: '影音中心', href: '#' },
      { title: '活動剪影', href: '#' },
      { title: '聯合推廣', href: '#' },
    ],
  },
  {
    title: '參觀與服務',
    children: [
      { title: '開放時間', href: '#' },
      { title: '票價資訊', href: '#' },
      { title: '交通與停車', href: '#' },
      { title: '入館與優惠', href: '#' },
      { title: '附屬空間', href: '#' },
      { title: '導覽及服務', href: '#' },
      { title: '常見問答', href: '#' },
      { title: '遺失物公告', href: '#' },
    ],
  },
  {
    title: '展覽與劇場',
    children: [
      { title: '當期展覽', href: '#' },
      { title: '展區資訊', href: '#' },
      { title: '劇場資訊', href: '#' },
      { title: '巡迴展', href: '#' },
      { title: '展覽回顧', href: '#' },
    ],
  },
  {
    title: '學習與推廣',
    children: [
      { title: '博物館教育', href: '#' },
      { title: '活動報名與預約', href: '#' },
      { title: '學校服務', href: '#' },
      { title: '科普傳播頻道', href: '#' },
      { title: '智慧探索體驗', href: '#' },
      { title: '學習主題', href: '#' },
    ],
  },
  {
    title: '研究典藏與出版',
    children: [
      { title: '關於典藏', href: '#' },
      { title: '科博典藏網', href: '#' },
      { title: '出版品查詢', href: '#' },
      { title: '研究人員與著作', href: '#' },
      { title: '圖書館服務', href: '#' },
      { title: '彭鏡毅博士紀念獎', href: '#' },
    ],
  },
  {
    title: '關於科博館',
    children: [
      { title: '使命與策略目標', href: '#' },
      { title: '現任館長', href: '#' },
      { title: '科博標識', href: '#' },
      { title: '組織與職掌', href: '#' },
      { title: '歷史與沿革', href: '#' },
      { title: '行政服務', href: '#' },
      { title: '加入我們', href: '#' },
      { title: '資訊中心', href: '#' },
      { title: '性別平等專區', href: '#' },
      { title: '諮詢信箱', href: '#' },
    ],
  },
];

export default navData;
