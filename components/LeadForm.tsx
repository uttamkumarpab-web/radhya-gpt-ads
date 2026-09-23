"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { indianStates } from "@/data/states";
import { validateEmail, validateMobile, validateName } from "@/lib/validation";
import { getTrackingContext } from "@/lib/track";

const EDUCATION_LEVELS = [
  "10th Pass",
  "12th Pass",
  "Diploma",
  "Graduate (Completed)",
  "Undergraduate (Pursuing)",
  "Postgraduate (Completed)",
];

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_content",
  "utm_campaign",
  "utm_id",
  "utm_keyword",
  "utm_term",
  "utm_adgroup",
  "gclid",
  "fbclid",
  "gad_source",
  "msclkid",
];

type Sanitizer = (value: string) => string;

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    utm[key] = params.get(key) || "";
  });
  return utm;
}

const initialForm = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  educationLevel: "",
  location: "",
};

export default function LeadForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField =
    (field: keyof typeof initialForm, sanitizer?: Sanitizer) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [field]: sanitizer ? sanitizer(value) : value }));
    };

  const onlyLetters = (value: string) => value.replace(/[^a-zA-Z\s'-]/g, "");
  const onlyDigits = (value: string) => value.replace(/\D/g, "");

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = [
      validateName(form.fname, "First Name"),
      validateName(form.lname, "Last Name"),
      validateEmail(form.email),
      validateMobile(form.phone),
      !form.location && "Please select your location.",
      !form.educationLevel && "Please select your education level.",
    ].filter((e): e is string => Boolean(e));

    if (errors.length > 0) {
      showMessage(errors[0]);
      return;
    }

    setSubmitting(true);

    const { cta_source, medium, landing_page, referrer } =
      getTrackingContext();

    const payload = {
      fname: form.fname.trim(),
      lname: form.lname.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location,
      education_level: form.educationLevel,
      ...getUtmParams(),
      cta_source,
      medium,
      landing_page,
      page_url: window.location.pathname,
      referrer,
      user_agent: navigator.userAgent,
      _ga: getCookie("_ga"),
      _fbc: getCookie("_fbc"),
      _fbp: getCookie("_fbp"),
      _gcl_aw: getCookie("_gcl_aw"),
      _ei_sid: getCookie("_ei_sid"),
      timestamp: Math.floor(Date.now() / 1000),
      event: "form_submit",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status && data.id) {
  const oaiq = (
    window as Window & {
      oaiq?: (...args: unknown[]) => void;
    }
  ).oaiq;

  oaiq?.(
    "measure",
    "lead_created",
    {
      type: "customer_action",
    },
    {
      event_id: String(data.id),
    }
  );

  router.push("/thank-you");
  return;
}

      showMessage(data.message || "Something went wrong. Please try again.");
    } catch {
      showMessage("Unable to submit the form. Please try again.");
    }

    setSubmitting(false);
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded text-sm";
  const labelClass = "text-[#334C4C] text-sm";

  return (
    <div className="bg-white text-gray-800 rounded-3xl shadow-lg px-6 py-4 max-sm:px-5 max-sm:py-6 animate-soft-blink">
      <h2 className="text-center font-bold mb-2 text-[25px] text-[#3c087e]">
        Download Brochure for Online MBA
      </h2>
      <p className="text-center text-sm text-[#4A5565] mb-3">
        Get information about programs and admissions
      </p>

      {message && (
        <p className="text-white bg-red-500 text-sm mt-1 mb-3 px-[20px] py-[10px] rounded-lg text-center">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-1" noValidate>
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
          <div>
            <label htmlFor="first-name" className={labelClass}>
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              className={inputClass}
              placeholder="Enter Your First Name"
              value={form.fname}
              onChange={updateField("fname", onlyLetters)}
            />
          </div>
          <div>
            <label htmlFor="last-name" className={labelClass}>
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              className={inputClass}
              placeholder="Enter Your Last Name"
              value={form.lname}
              onChange={updateField("lname", onlyLetters)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email ID
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="Enter Your Email ID"
            value={form.email}
            onChange={updateField("email")}
          />
        </div>

        <div>
          <label htmlFor="mobile" className={labelClass}>
            Mobile Number
          </label>
          <input
            id="mobile"
            type="tel"
            className={inputClass}
            placeholder="Enter Your Mobile Number"
            maxLength={10}
            value={form.phone}
            onChange={updateField("phone", onlyDigits)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
          <div>
            <label htmlFor="education-level" className={labelClass}>
              Education Level
            </label>
            <select
              id="education-level"
              className={`${inputClass} ${form.educationLevel ? "text-gray-800" : "text-gray-500"}`}
              value={form.educationLevel}
              onChange={updateField("educationLevel")}
            >
              <option value="">Select Education Level</option>
              {EDUCATION_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className={labelClass}>
              Select Location
            </label>
            <select
              id="location"
              className={`${inputClass} ${form.location ? "text-gray-800" : "text-gray-500"}`}
              value={form.location}
              onChange={updateField("location")}
            >
              <option value="">Select Location</option>
              {indianStates.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="inline-flex justify-center items-center w-full mt-3">
          <button
            id="cta-form-submit"
            type="submit"
            disabled={submitting}
            className="w-[250px] max-sm:w-full bg-[#3c087e] text-white font-medium py-2 px-4 rounded transition duration-300 cursor-pointer disabled:opacity-70"
          >
            <svg
              className="inline-block mr-2 -mt-1"
              width="14"
              height="14"
              viewBox="0 0 512 512"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3.3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
            </svg>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
