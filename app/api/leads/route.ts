import type { NextRequest } from "next/server";
import {
  findLeadByEmail,
  insertLead,
  isDbConfigured,
  type LeadRecord,
} from "@/lib/db";
import {
  isEmailConfigured,
  sendLeadNotification,
  sendUserConfirmationEmail,
} from "@/lib/email";
import { validateEmail, validateMobile, validateName } from "@/lib/validation";

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 45);
  return request.headers.get("x-real-ip")?.slice(0, 45) || null;
}

function str(value: unknown): string | null {
  const s = (value ?? "").toString().trim();
  return s === "" ? null : s.slice(0, 500);
}

function buildRecord(body: Record<string, unknown>, ip: string | null): LeadRecord {
  return {
    first_name: str(body.fname),
    last_name: str(body.lname),
    email: str(body.email),
    mobile: str(body.phone),
    education_level: str(body.education_level),
    location: str(body.location),
    cta_source: str(body.cta_source),
    medium: str(body.medium),
    utm_source: str(body.utm_source),
    utm_medium: str(body.utm_medium),
    utm_campaign: str(body.utm_campaign),
    utm_content: str(body.utm_content),
    utm_id: str(body.utm_id),
    utm_keyword: str(body.utm_keyword),
    utm_term: str(body.utm_term),
    utm_adgroup: str(body.utm_adgroup),
    gclid: str(body.gclid),
    fbclid: str(body.fbclid),
    gad_source: str(body.gad_source),
    msclkid: str(body.msclkid),
    landing_page: str(body.landing_page),
    page_url: str(body.page_url),
    referrer: str(body.referrer),
    user_agent: str(body.user_agent),
    ga_cookie: str(body._ga),
    fbc_cookie: str(body._fbc),
    fbp_cookie: str(body._fbp),
    gcl_aw_cookie: str(body._gcl_aw),
    ei_sid_cookie: str(body._ei_sid),
    event: str(body.event) || "form_submit",
    event_time: Number.isFinite(Number(body.timestamp))
      ? Number(body.timestamp)
      : null,
    ip_address: ip,
  };
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { status: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const validationError =
    validateName(str(body.fname) || "", "First Name") ||
    validateName(str(body.lname) || "", "Last Name") ||
    validateEmail(str(body.email) || "") ||
    validateMobile(str(body.phone) || "") ||
    (!(body.location || "").toString().trim() && "Please select your location.") ||
    (!(body.education_level || "").toString().trim() &&
      "Please select your education level.");

  if (validationError) {
    return Response.json(
      { status: false, message: validationError },
      { status: 400 }
    );
  }

  const lead = buildRecord(body, getClientIp(request));

  let leadId: number | null = null;

  if (isDbConfigured()) {
    try {
      const existing = await findLeadByEmail(lead.email as string);
      if (existing) {
        return Response.json(
          {
            status: false,
            message:
              "This email ID has already been used to submit an enquiry. Please use a different email ID.",
          },
          { status: 409 }
        );
      }
    } catch (err) {
      console.error("Duplicate check failed:", err);
    }

    try {
      const inserted = await insertLead(lead);
      leadId = (inserted as { id?: number })?.id ?? null;
    } catch (err) {
      console.error("Failed to save lead:", err);
      return Response.json(
        {
          status: false,
          message:
            "Unable to submit your enquiry right now. Please try again.",
        },
        { status: 500 }
      );
    }
  } else {
    console.warn(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set - lead not persisted."
    );
  }

  if (isEmailConfigured()) {
    try {
      await sendLeadNotification(lead);
    } catch (err) {
      console.error("Failed to send lead notification email:", err);
    }

    try {
      await sendUserConfirmationEmail(lead);
    } catch (err) {
      console.error("Failed to send user confirmation email:", err);
    }
  } else {
    console.warn("RESEND_API_KEY not set - emails skipped.");
  }

  return Response.json({ status: true, id: leadId });
}