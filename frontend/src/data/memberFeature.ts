// types
export type MemberFeature = {
  id: string;
  title: string;
  icon?: string; // 插圖或 icon
  description?: string; // 桌機版顯示的一句話介紹
  badgeKey?: string; // API 數字對應名稱，如 unreadCount
};

// full list
export const memberFeatures: MemberFeature[] = [
  {
    id: 'profile',
    title: '個人資料',
    icon: '/icons/profile.svg',
    description: '查看或編輯您的個人資料與親友名單',
  },
  {
    id: 'notifications',
    title: '訊息通知',
    icon: '/icons/notification.svg',
    description: '查看通知與最新消息',
    badgeKey: 'unreadMessages',
  },
  {
    id: 'dinoCard',
    title: '我的恐龍卡',
    icon: '/icons/dino-card.svg',
    description: '管理綁定的恐龍卡資訊',
  },
  {
    id: 'bonus',
    title: '紅利點數查詢',
    icon: '/icons/bonus.svg',
    description: '查看累積點數與兌換紀錄',
  },
  {
    id: 'tickets',
    title: '票務訂單查詢',
    icon: '/icons/ticket.svg',
    description: '查詢您所有的票務訂單',
    badgeKey: 'ticketCount', // 可顯示未使用或未完成
  },
  {
    id: 'events',
    title: '活動報名查詢',
    icon: '/icons/events.svg',
    description: '查看活動報名資訊與進度',
    badgeKey: 'eventCount',
  },
  {
    id: 'schedule',
    title: '行程收藏與規劃',
    icon: '/icons/calendar.svg',
    description: '管理收藏的展覽與已報名行程',
  },
];

export default memberFeatures;
