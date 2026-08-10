type IconName = "menu" | "close" | "mail" | "phone" | "pin" | "arrow" | "check" | "leaf" | "shield" | "box" | "globe" | "heart" | "facebook" | "instagram" | "linkedin" | "youtube";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M5 4h3l2 5-2 1.4a15 15 0 0 0 5.6 5.6L15 14l5 2v3c0 1-1 2-2 2C10.3 21 3 13.7 3 6c0-1 .9-2 2-2Z" />,
    pin: <><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    leaf: <path d="M20 4C11 4 5 8.5 5 15c0 2.7 1.7 5 4 5 6.5 0 11-7 11-16ZM4 20c3-5 7-8 12-10" />,
    shield: <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Zm-3 9 2 2 4-4" />,
    box: <><path d="m4 7 8-4 8 4v10l-8 4-8-4V7Z" /><path d="m4 7 8 4 8-4M12 11v10" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    heart: <path d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6A4.6 4.6 0 0 1 12 6.8a4.6 4.6 0 0 1 8.8 1.8Z" />,
    facebook: <path d="M14 8h3V4h-3c-3.1 0-5 1.9-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r=".8" fill="currentColor" /></>,
    linkedin: <><rect x="4" y="9" width="4" height="11" /><circle cx="6" cy="5" r="2" fill="currentColor" /><path d="M11 20v-6a4 4 0 0 1 8 0v6M11 9v11" /></>,
    youtube: <><path d="M21 12c0 3.4-.4 5.6-1 6.4-.6.6-2.9 1.1-8 1.1s-7.4-.5-8-1.1C3.4 17.6 3 15.4 3 12s.4-5.6 1-6.4C4.6 5 6.9 4.5 12 4.5s7.4.5 8 1.1c.6.8 1 3 1 6.4Z" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
