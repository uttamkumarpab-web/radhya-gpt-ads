import { Resend } from "resend";
import type { LeadRecord } from "./db";

let resend: Resend | null = null;

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function getClient() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const ROWS: Array<[string, (l: LeadRecord) => string | null | undefined]> = [
  ["Name", (l) => `${l.first_name} ${l.last_name}`],
  ["Email", (l) => l.email],
  ["Phone", (l) => l.mobile],
  ["Location", (l) => l.location],
  ["Education Level", (l) => l.education_level],
  ["CTA Source", (l) => l.cta_source],
  ["Medium", (l) => l.medium],
  ["UTM Source", (l) => l.utm_source],
  ["UTM Medium", (l) => l.utm_medium],
  ["UTM Campaign", (l) => l.utm_campaign],
  ["Landing Page", (l) => l.landing_page],
  ["Referrer", (l) => l.referrer],
];

function buildAdminEmailHtml(lead: LeadRecord) {
  const rows = ROWS.map(
    ([label, get]) =>
      `<tr>
        <td style="padding:8px 12px;background:#f6f6f6;font-weight:600;white-space:nowrap;">${label}</td>
        <td style="padding:8px 12px;">${escapeHtml(String(get(lead) || "-"))}</td>
      </tr>`
  ).join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
      <div style="background:#3c087e;color:#fff;padding:16px 24px;">
        <h2 style="margin:0;font-size:18px;">New Online MBA Lead</h2>
        <p style="margin:4px 0 0;font-size:13px;">Radhya Education Academy</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">${rows}</table>
    </div>`;
}

function buildUserEmailHtml(lead: LeadRecord) {
  const firstName = escapeHtml(lead.first_name || "there");

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;border:1px solid #eee;border-radius:8px;overflow:hidden;">
      <div style="background:#3c087e;color:#fff;padding:16px 24px;">
        <h2 style="margin:0;font-size:18px;">Radhya Education Academy</h2>
        <p style="margin:4px 0 0;font-size:13px;">Online MBA Guidance &amp; Admissions</p>
      </div>
      <div style="padding:24px;font-size:14px;color:#333;line-height:1.6;">
        <p>Thank you, ${firstName}!</p>
        <p>We have received your enquiry regarding the <strong>Online MBA Degree Programme</strong>.</p>
        <p>Our admissions counsellor will get back to you shortly at <strong>${escapeHtml(lead.email || "")}</strong> or <strong>${escapeHtml(lead.mobile || "")}</strong>.</p>
        <br/>
        <p style="margin:0;">Team Radhya Education Academy</p>
      </div>
    </div>`;
}

const EMAIL_FROM = "MBA Online Info <noreply@mbaonlineinfo.com>";
const ADMIN_NOTIFICATION_EMAIL = "noreply@mbaonlineinfo.com";

export async function sendLeadNotification(lead: LeadRecord) {
  if (!process.env.LEAD_NOTIFICATION_EMAIL) {
    console.warn("LEAD_NOTIFICATION_EMAIL not set - admin notification skipped.");
    return null;
  }

  const { data, error } = await getClient().emails.send({
    from: EMAIL_FROM,
    to: [process.env.LEAD_NOTIFICATION_EMAIL],
    subject: `New Online MBA Lead - ${lead.first_name} ${lead.last_name} (${lead.mobile})`,
    html: buildAdminEmailHtml(lead),
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function sendUserConfirmationEmail(lead: LeadRecord) {
  const { data, error } = await getClient().emails.send({
    from: EMAIL_FROM,
    to: [lead.email as string],
    subject: "Thank You for Your Interest in Online MBA",
    html: buildUserEmailHtml(lead),
  });

  if (error) throw new Error(error.message);
  return data;
}