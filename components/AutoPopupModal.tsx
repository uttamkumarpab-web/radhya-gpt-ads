"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import FormPopup from "./FormPopup";
import { trackCtaClick } from "@/lib/track";

const INITIAL_DELAY_MS = 5000;
const REPEAT_DELAY_MS = 20000;
const SUBMITTED_KEY = "lead_submitted";

const POPUP_TITLE = "Get Free Counselling for Online MBA";

export default function AutoPopupModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SUBMITTED_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [hasOpened, setHasOpened] = useState(false);
  const pathname = usePathname();
  const timerRef = useRef<number | null>(null);

  const active = !submitted && pathname === "/";

  useEffect(() => {
    if (submitted) return;
    const onSubmitted = () => {
      setSubmitted(true);
      setOpen(false);
    };
    window.addEventListener("lead-submitted", onSubmitted);
    return () => window.removeEventListener("lead-submitted", onSubmitted);
  }, [submitted]);

  const closePopup = useCallback(() => {
    setOpen(false);
    setHasOpened(true);
  }, []);

  useEffect(() => {
    if (!active || open) return;

    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const schedule = (delay: number) => {
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        if (document.hidden) return;
        setOpen(true);
        if (!hasOpened) trackCtaClick("auto-popup-form");
      }, delay);
    };

    const onVisibility = () => {
      if (document.hidden) clearTimer();
      else schedule(hasOpened ? REPEAT_DELAY_MS : INITIAL_DELAY_MS);
    };
    document.addEventListener("visibilitychange", onVisibility);

    schedule(hasOpened ? REPEAT_DELAY_MS : INITIAL_DELAY_MS);

    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active, open, hasOpened]);

  return open ? (
    <FormPopup open onClose={closePopup} title={POPUP_TITLE} />
  ) : null;
}