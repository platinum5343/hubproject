interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "/delivery/icons/home.png",
    href: "/delivery",
  },
  {
    id: "scheduling",
    label: "Scheduling",
    icon: "/delivery/icons/calendar.png",
    href: "/delivery/scheduled-delivery",
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: "/delivery/icons/wallet.png",
    href: "/delivery/wallet",
  },
  {
    id: "notification",
    label: "Notification",
    icon: "/delivery/icons/notification-tab.png",
    href: "/delivery/notification",
  },
  {
    id: "account",
    label: "Account",
    icon: "/delivery/icons/profile-circle.png",
    href: "/delivery/account",
    mobileOnly: true,
  },
  // {
  //   id: "support-mobile",
  //   label: "Support",
  //   icon: "/delivery/icons/message.png",
  //   href: "/delivery/support",
  //   mobileOnly: true,
  // },
];

export const bottomItems: MenuItem[] = [
  {
    id: "logout",
    label: "Log out",
    icon: "/delivery/icons/logout.png",
    href: "/delivery/logout",
    mobileOnly: true,
  },
  {
    id: "support",
    label: "Support",
    icon: "/delivery/icons/message.png",
    href: "/delivery/support",
    // desktopOnly: true,
  },
];
