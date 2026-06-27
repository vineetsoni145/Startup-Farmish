import { mockDelay } from "./mockDelay";

const ADMIN_USERS = [
  "admin@farmish.demo",
  "owner@farmish.demo",
  "stock@farmish.demo",
  "dev@farmish.demo",
];

function isAdminEmail(email) {
  return ADMIN_USERS.includes(String(email || "").toLowerCase());
}

function normalizeContact(contact) {
  const value = String(contact || "").trim();
  if (!value) return null;
  return value;
}

function buildUserFromContact(contact, name = "") {
  const normalized = normalizeContact(contact);
  if (!normalized) return null;
  const isEmail = normalized.includes("@");
  const email = isEmail
    ? normalized.toLowerCase()
    : `${normalized}@farmish.demo`;
  const phone = isEmail ? "" : normalized;
  const role = isEmail && isAdminEmail(normalized) ? "admin" : "customer";
  const userName =
    role === "admin"
      ? "Farmish Admin"
      : name || (isEmail ? normalized.split("@")[0] : normalized);
  return { name: userName, email, phone, role };
}

/** Mirrors POST /auth/login */
export async function apiLogin({ contact, password }) {
  await mockDelay(450);
  const normalized = normalizeContact(contact);
  if (!normalized || !password) {
    return { ok: false, error: "Missing credentials" };
  }
  const user = buildUserFromContact(normalized);
  if (!user) {
    return { ok: false, error: "Invalid login contact" };
  }
  return {
    ok: true,
    data: {
      token: `mock_${Date.now()}`,
      user: {
        ...user,
        savedAddresses: user.savedAddresses || [],
      },
    },
  };
}

/** Mirrors POST /auth/register */
export async function apiRegister({ name, email, password, phone }) {
  await mockDelay(500);
  const normalizedEmail = normalizeContact(email);
  const normalizedPhone = normalizeContact(phone);
  if (!name || !password || (!normalizedEmail && !normalizedPhone)) {
    return { ok: false, error: "Fill all required fields" };
  }
  const contact = normalizedEmail || normalizedPhone;
  const user = buildUserFromContact(contact, name);
  return {
    ok: true,
    data: {
      token: `mock_${Date.now()}`,
      user: {
        ...user,
        savedAddresses: [],
      },
    },
  };
}

/** Mirrors POST /auth/otp — prototype stub */
export async function apiRequestOtp(contact) {
  await mockDelay(300);
  if (!contact) {
    return { ok: false, error: "Invalid contact" };
  }
  const value = String(contact).trim();
  if (value.includes("@")) {
    if (!isAdminEmail(value)) {
      return {
        ok: false,
        error: "Admin access is restricted to registered team members.",
      };
    }
    return {
      ok: true,
      data: {
        message:
          "OTP sent to your admin email. Use any code to complete this demo login.",
      },
    };
  }
  if (value.length < 6) {
    return { ok: false, error: "Invalid contact" };
  }
  return {
    ok: true,
    data: { message: "OTP sent (demo: any code works)" },
  };
}

export async function apiVerifyOtp({ contact, code }) {
  await mockDelay(300);
  if (!contact || !code || String(code).trim().length < 3) {
    return { ok: false, error: "Enter the OTP to continue" };
  }
  return {
    ok: true,
    data: { message: "OTP verified" },
  };
}
