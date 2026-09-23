declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const CTA_COOKIE_KEY = "cta_source";
const CTA_STORAGE_KEY = "last_cta_source";

type TrackingContext = {
  cta_source: string;
  medium: string;
  landing_page: string;
  referrer: string;
  user_agent: string;
};

function safeSetCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getQueryParam(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

const MEDIUM_RULES: Array<{ match: RegExp; medium: string }> = [
  { match: /chatgpt|openai|chat\.openai/i, medium: "ai/chatgpt" },
  { match: /claude|anthropic/i, medium: "ai/claude" },
  { match: /facebook|fb\.com|fbclid/i, medium: "social/facebook" },
  { match: /instagram|instagr/i, medium: "social/instagram" },
  { match: /linkedin/i, medium: "social/linkedin" },
  { match: /twitter|x\.com|t\.co/i, medium: "social/x" },
  { match: /youtube|youtu\.be/i, medium: "social/youtube" },
  { match: /whatsapp|wa\.me/i, medium: "social/whatsapp" },
  { match: /t\.me|telegram/i, medium: "social/telegram" },
  { match: /google|bing|yandex|duckduckgo/i, medium: "search/organic" },
  { match: /mail\.google|outlook|yahoo\.com|gmail/i, medium: "email" },
];

export function detectMedium(): string {
  const utmMedium = getQueryParam("utm_medium");
  if (utmMedium) return utmMedium;

  const gclid = getQueryParam("gclid");
  if (gclid) return "paid/google-ads";
  const mbclid = getQueryParam("msclkid");
  if (mbclid) return "paid/bing-ads";
  const fbclid = getQueryParam("fbclid");
  if (fbclid) return "paid/facebook-ads";

  const referrer = typeof document !== "undefined" ? document.referrer : "";
  if (!referrer) return "direct";

  for (const rule of MEDIUM_RULES) {
    if (rule.match.test(referrer)) return rule.medium;
  }

  try {
    return `referral/${new URL(referrer).hostname.replace(/^www\./, "")}`;
  } catch {
    return "referral/unknown";
  }
}

export function trackCtaClick(ctaId: string) {
  if (typeof window === "undefined") return;

  safeSetCookie(CTA_COOKIE_KEY, ctaId);
  try {
    sessionStorage.setItem(CTA_STORAGE_KEY, ctaId);
  } catch {
    /* ignore storage errors */
  }

  const medium = detectMedium();

  if (typeof window.gtag === "function") {
    window.gtag("event", "cta_click", {
      cta_id: ctaId,
      medium,
      page_title: document.title,
    });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "cta_click",
      cta_id: ctaId,
      medium,
    });
  }

  window.dispatchEvent(
    new CustomEvent("cta-click", {
      detail: { cta_id: ctaId, medium },
    })
  );
}

export function getTrackingContext(): TrackingContext {
  let ctaSource = "";
  try {
    ctaSource = sessionStorage.getItem(CTA_STORAGE_KEY) || "";
  } catch {
    ctaSource = "";
  }

  if (!ctaSource && typeof document !== "undefined") {
    const match = document.cookie.match(
      new RegExp(`(^| )${CTA_COOKIE_KEY}=([^;]+)`)
    );
    ctaSource = match ? decodeURIComponent(match[2]) : "";
  }

  return {
    cta_source: ctaSource,
    medium: detectMedium(),
    landing_page:
      typeof window !== "undefined" ? window.location.pathname + window.location.search : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    user_agent:
      typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : "",
  };
}