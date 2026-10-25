/*
  Iconos de línea del sistema. Reemplazan al emoji como lenguaje visual: el
  brochure usa trazo fino monocromo, que hereda el color del contexto y no
  arrastra el estilo de la fuente de emoji de cada sistema operativo.

  `name` acepta el nombre semántico o el emoji que se usaba antes, así los
  datos de lib/constants no tienen que cambiar.
*/

type Props = {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const P: Record<string, string> = {
  building:    "M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 21V9h4a1 1 0 011 1v11M4 21h17M8 8h3M8 12h3M8 16h3",
  lock:        "M6 11V8a6 6 0 1112 0v3M5 11h14a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8a1 1 0 011-1z",
  key:         "M15 7a4 4 0 11-3.3 6.3L4 21H3v-3l7.7-7.7A4 4 0 0115 7z",
  folder:      "M3 7a1 1 0 011-1h5l2 2h9a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z",
  users:       "M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M9.5 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM21 19v-1a4 4 0 00-3-3.9M16.5 3.6a3.5 3.5 0 010 6.8",
  user:        "M19 20v-1a5 5 0 00-5-5h-4a5 5 0 00-5 5v1M12 11a4 4 0 100-8 4 4 0 000 8z",
  box:         "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8",
  cart:        "M3 4h2l2.4 11a1 1 0 001 .8h9.2a1 1 0 001-.8L21 8H6M9 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z",
  bag:         "M6 8h12l1 12a1 1 0 01-1 1H6a1 1 0 01-1-1L6 8zM9 8V6a3 3 0 016 0v2",
  money:       "M3 7a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7zM12 15a3 3 0 100-6 3 3 0 000 6z",
  card:        "M3 8a1 1 0 011-1h16a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8zM3 11h18M7 15h3",
  clipboard:   "M9 4h6v3H9V4zM7 5H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h-2M8 12h8M8 16h5",
  bolt:        "M13 2L5 14h6l-1 8 8-12h-6l1-8z",
  offline:     "M4 7a14 14 0 0116 0M7 11a9 9 0 019.5-1.2M12 19a.6.6 0 100-1.2.6.6 0 000 1.2zM3 3l18 18",
  layers:      "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  shield:      "M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
  robot:       "M8 7h8a2 2 0 012 2v7a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2zM12 4v3M9 12h.01M15 12h.01M10 16h4M3 11v3M21 11v3",
  store:       "M4 9h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V9zM3 9l2-5h14l2 5M9 20v-6h6v6",
  chart:       "M4 20V10M10 20V4M16 20v-7M22 20H2",
  trend:       "M3 17l5-5 4 3 5-6M14 9h5v5",
  phone:       "M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",
  monitor:     "M3 5a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5zM9 20h6M12 16v4",
  globe:       "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.4 2.5 15.6 0 18M12 3C9.5 5.4 9.5 18.6 12 21",
  link:        "M10 13a4 4 0 005.7 0l2.6-2.6a4 4 0 00-5.7-5.7l-1 1M14 11a4 4 0 00-5.7 0l-2.6 2.6a4 4 0 005.7 5.7l1-1",
  palette:     "M12 3a9 9 0 000 18c1.2 0 1.8-.8 1.8-1.7 0-1.5 1-2.1 2.4-2.1H18a3 3 0 003-3 9 9 0 00-9-8.2zM7.5 11a1 1 0 100-2 1 1 0 000 2zM11 8.5a1 1 0 100-2 1 1 0 000 2zM15.5 10a1 1 0 100-2 1 1 0 000 2z",
  clock:       "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3.5 2",
  calendar:    "M4 6a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6zM4 10h16M8 3v4M16 3v4",
  chat:        "M4 5a1 1 0 011-1h14a1 1 0 011 1v9a1 1 0 01-1 1H9l-5 4V5z",
  trophy:      "M8 4h8v5a4 4 0 01-8 0V4zM8 6H5a3 3 0 003 3M16 6h3a3 3 0 01-3 3M10 17h4M9 21h6M12 13v4",
  target:      "M12 3a9 9 0 100 18 9 9 0 000-18zM12 8a4 4 0 100 8 4 4 0 000-8zM12 12h.01",
  flame:       "M12 21c3.3 0 6-2.4 6-5.5 0-4-6-12.5-6-12.5S6 11.5 6 15.5C6 18.6 8.7 21 12 21zM12 17a2 2 0 002-2c0-1.4-2-4-2-4s-2 2.6-2 4a2 2 0 002 2z",
  star:        "M12 3l2.9 5.9 6.1.9-4.5 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.8l6.1-.9L12 3z",
  eye:         "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 15a3 3 0 100-6 3 3 0 000 6z",
  gear:        "M12 9a3 3 0 100 6 3 3 0 000-6zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  bulb:        "M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0012 3z",
  refresh:     "M20 11a8 8 0 00-13.7-4.9L3 9M4 13a8 8 0 0013.7 4.9L21 15M3 5v4h4M21 19v-4h-4",
  search:      "M11 4a7 7 0 100 14 7 7 0 000-14zM16 16l5 5",
  warning:     "M12 4l9 16H3l9-16zM12 10v4M12 17h.01",
  crown:       "M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8z",
  receipt:     "M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6M9 16h3",
  briefcase:   "M3 8a1 1 0 011-1h16a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8zM9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 12h18",
  leaf:        "M20 4C9 4 4 9.5 4 16c0 1.6.4 3 1 4 1-6 5-10 11-11-5 2-8 5.5-9 11 7 1 13-3 13-16z",
  cloud:       "M7 18h10a4 4 0 00.5-8 6 6 0 00-11.4 1.6A3.5 3.5 0 007 18z",
  sun:         "M12 7a5 5 0 100 10 5 5 0 000-10zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon:        "M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z",
  check:       "M5 13l4 4L19 7",
  close:       "M6 6l12 12M18 6L6 18",
  menu:        "M4 7h16M4 12h16M4 17h16",
  chevronDown: "M6 9l6 6 6-6",
  arrowRight:  "M5 12h14M13 6l6 6-6 6",
  arrowUp:     "M12 19V5M6 11l6-6 6 6",
  arrowDown:   "M12 5v14M6 13l6 6 6-6",
  download:    "M12 3v12M8 11l4 4 4-4M4 19h16",
  ban:         "M12 3a9 9 0 100 18 9 9 0 000-18zM6 6l12 12",
  question:    "M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 9.5a2.5 2.5 0 015 .5c0 1.7-2.5 2-2.5 4M12 17h.01",
  flag:        "M5 21V4h14l-3 4 3 4H5",
  sparkle:     "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z",
  barcode:     "M4 6v12M7 6v12M10.5 6v12M14 6v12M17 6v12M20 6v12",
  printer:     "M7 9V4h10v5M7 14h10v6H7v-6zM7 17H5a1 1 0 01-1-1v-5a1 1 0 011-1h14a1 1 0 011 1v5a1 1 0 01-1 1h-2",
  scale:       "M12 4v3M5 7h14M7 7l-3 6a3 3 0 006 0L7 7zM17 7l-3 6a3 3 0 006 0L17 7zM9 20h6",
  fingerprint: "M12 4a8 8 0 00-8 8c0 1.5.3 2.9.9 4.1M20 12a8 8 0 00-4.2-7M7.6 19.6A9.6 9.6 0 017 16a5 5 0 0110 0c0 1.3-.3 2.5-.8 3.6M12 16v3.5",
  database:    "M12 4c4.4 0 8 1.1 8 2.5S16.4 9 12 9 4 7.9 4 6.5 7.6 4 12 4zM4 6.5v11C4 18.9 7.6 20 12 20s8-1.1 8-2.5v-11M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5",
  sheet:       "M6 3h12a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1zM5 9h14M5 15h14M11 9v12",
  cursor:      "M5 3l5.5 16 2.3-6.4L19 10.3 5 3z",
  bread:       "M5 10a3 3 0 013-3h8a3 3 0 013 3c0 1.4-1 2.3-1 3.5V18a1 1 0 01-1 1H7a1 1 0 01-1-1v-4.5C6 12.3 5 11.4 5 10zM10 7v3M14 7v3",
  basket:      "M3 9h18l-1.6 9a1 1 0 01-1 .9H6.6a1 1 0 01-1-.9L4 9zM8 9l2-5M16 9l-2-5M10 13v3M14 13v3",
  cake:        "M4 20h16M5 20v-6a2 2 0 012-2h10a2 2 0 012 2v6M9 12V9M12 12V8M15 12V9M4 16h16",
  dot:         "M12 8a4 4 0 100 8 4 4 0 000-8z",
};

// Lo que había antes -> nombre semántico.
const FROM_EMOJI: Record<string, string> = {
  "🏢": "building", "🏭": "building", "🏪": "store", "🖥": "monitor", "🖥️": "monitor",
  "💻": "monitor", "🔐": "lock", "🔒": "lock", "🔑": "key", "🗂": "folder", "🗂️": "folder",
  "👥": "users", "👤": "user", "👨": "user", "👨‍💼": "user", "📦": "box",
  "🛒": "cart", "🛍": "bag", "🛍️": "bag", "💰": "money", "💸": "money", "💳": "card",
  "📋": "clipboard", "📝": "clipboard", "⚡": "bolt", "📶": "offline", "🧩": "layers",
  "🏗": "layers", "🏗️": "layers", "🇲🇽": "flag", "🛡": "shield", "🤖": "robot",
  "📊": "chart", "📈": "trend", "📱": "phone", "🌐": "globe", "🔗": "link",
  "🎨": "palette", "⏱": "clock", "📅": "calendar", "💬": "chat", "🏆": "trophy",
  "🎯": "target", "🔥": "flame", "⭐": "star", "💯": "target", "👁": "eye", "👁️": "eye",
  "👀": "eye", "⚙": "gear", "⚙️": "gear", "🔧": "gear", "💡": "bulb", "🔄": "refresh",
  "🔁": "refresh", "🔍": "search", "⚠": "warning", "⚠️": "warning", "👑": "crown",
  "🧾": "receipt", "💼": "briefcase", "🌿": "leaf", "☁": "cloud", "☁️": "cloud",
  "☀": "sun", "☀️": "sun", "🌙": "moon", "🚫": "ban", "🤔": "question",
  "🎉": "sparkle", "✓": "check", "✕": "close", "☰": "menu",
  "▾": "chevronDown", "→": "arrowRight", "🚦": "dot",
  "🥖": "bread", "🥗": "basket", "🎂": "cake", "🧺": "basket",
};

export function Icon({ name, size = 20, className, strokeWidth = 1.7 }: Props) {
  const key = P[name] ? name : FROM_EMOJI[name];
  const d = key ? P[key] : P.dot;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
