const BLOCKED_NAMES = [
  "testuser",
  "uservalid",
  // Random/garbage names
  "asdfghjm", "hjfhfjf", "hjgh hjgh", "dgdgd", "ekdkd", "aga",
  "hbcwhwi", "gfj", "ljdeaj", "jhasg", "hghjfhjt", "hfbdehf",
  "ejnvjernj", "fjnjwern", "avssfb", "ddd", "dfbnm", "hjhhh",
  // Repeated/pattern-based
  "asdfghj", "abhdh",
  // Bot strings
  "insiijcyvuesyvlnpea", "gszzkablharyhrla", "lmenmssmorr jnenjfpwknkqp",
];

const BLOCKED_EMAILS = [
  "test@gmail.com",
  "test@yahoo.com",
  "test@hotmail.com",
  "test@test.com",
  "testing@gmail.com",
  "testing@test.com",
  "abc@gmail.com",
  "abcd@gmail.com",
  "asdf@gmail.com",
  "qwerty@gmail.com",
  "example@gmail.com",
  "example@example.com",
  "user@example.com",
  "name@example.com",
  "email@example.com",
  "your@email.com",
  "yourname@email.com",
  "email@email.com",
];

const BLOCKED_EMAIL_DOMAINS = [
  "mailinator.com",
  "yopmail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "grr.la",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "fakeinbox.com",
  "spam4.me",
  "maildrop.cc",
  "mohmal.com",
  "emailondeck.com",
  "tempr.email",
  "tmpmail.org",
  "1secmail.com",
];

// Detect garbage/random names using entropy + pattern checks
function isGarbageName(name: string) {
  const val = name.trim().toLowerCase();

  if (val.length < 2) return true;

  if (/[^a-z\s'-]/.test(val)) return true;

  if (/^(.)\1+$/.test(val.replace(/\s/g, ""))) return true;

  if (/[a-z]{4,}/.test(val)) {
    const alpha = val.replace(/[^a-z]/g, "");
    const vowels = (alpha.match(/[aeiou]/g) || []).length;
    const ratio = vowels / alpha.length;
    if (alpha.length >= 4 && ratio < 0.2) return true;
  }

  if (/^[A-Z]{3,}$/.test(name.trim()) && !/^[A-Z][a-z]/.test(name.trim())) {
    const upper = name.trim();
    const vowels = (upper.match(/[AEIOU]/g) || []).length;
    if (upper.length >= 3 && vowels / upper.length < 0.2) return true;
  }

  if (/[A-Z]/.test(name) && /[a-z]/.test(name) && name.trim().length > 8) {
    const vowels = (name.match(/[aeiouAEIOU]/g) || []).length;
    if (vowels / name.trim().length < 0.15) return true;
  }

  return false;
}

export function validateName(value: string, fieldLabel: string) {
  const val = value.trim();
  if (val === "") return `${fieldLabel} is required.`;
  if (/[^a-zA-Z\s'-]/.test(val)) return `${fieldLabel} must contain only letters.`;
  if (BLOCKED_NAMES.includes(val.toLowerCase())) return `Please enter a valid ${fieldLabel.toLowerCase()}.`;
  if (isGarbageName(val)) return `Please enter a valid ${fieldLabel.toLowerCase()}.`;
  return null;
}

export function validateEmail(value: string) {
  const val = value.trim();
  if (val === "") return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email address.";
  if (BLOCKED_EMAILS.includes(val.toLowerCase())) return "Please enter a valid email address.";
  const domain = val.toLowerCase().split("@")[1];
  if (BLOCKED_EMAIL_DOMAINS.includes(domain)) return "Please enter a valid email address.";
  return null;
}

export function validateMobile(value: string) {
  const val = value.trim();
  if (val === "") return "Mobile number is required.";
  if (!/^\d{10}$/.test(val)) return "Enter a valid 10-digit mobile number.";
  return null;
}
