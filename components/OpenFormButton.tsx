"use client";

import type { ReactNode } from "react";
import { trackCtaClick } from "@/lib/track";

type OpenFormButtonProps = {
  id?: string;
  label?: string;
  className?: string;
  children: ReactNode;
};

export default function OpenFormButton({
  id,
  label,
  className,
  children,
}: OpenFormButtonProps) {
  return (
    <button
      id={id}
      type="button"
      data-cta-id={id}
      data-cta-label={label}
      className={className}
      onClick={() => {
        trackCtaClick(id || label || "open-form");
        window.dispatchEvent(new CustomEvent("open-form-popup"));
      }}
    >
      {children}
    </button>
  );
}