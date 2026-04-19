const TELEGRAM_API_BASE = "https://api.telegram.org";

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const readString = (value, maxLength = 1000) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const readNumber = (value) => {
  if (typeof value !== "number") return null;
  return Number.isFinite(value) ? value : null;
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildMapsLink = (address) =>
  address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : "";

const formatMoney = (value) => `${new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 0 }).format(value)} $`;

const formatServiceList = (serviceWanted) => {
  const items = String(serviceWanted || "")
    .split(/[\n,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (items.length === 0) return "- Non précisé";
  return items.map((item) => `- ${escapeHtml(item)}`).join("\n");
};

const formatTelegramMessage = ({
  fullName,
  phone,
  email,
  address,
  googleMapsLink,
  serviceWanted,
  estimatedTotal,
  message,
}) => {
  const safeName = escapeHtml(fullName || "Non fourni");
  const safePhone = escapeHtml(phone || "Non fourni");
  const safeEmail = escapeHtml(email || "Non fourni");
  const safeAddress = escapeHtml(address || "Non fournie");
  const serviceList = formatServiceList(serviceWanted);
  const safeEstimatedTotal =
    estimatedTotal !== null ? escapeHtml(formatMoney(estimatedTotal)) : "Sur estimation";
  const safeMessage = escapeHtml(message || "Aucun message");
  const mapsLine = googleMapsLink
    ? `<a href="${escapeHtml(googleMapsLink)}">Ouvrir dans Google Maps</a>`
    : "Google Maps: Adresse non fournie";

  return [
    "<b>Nouvelle soumission Ventipure</b>",
    "",
    "<b>Client</b>",
    `Nom: ${safeName}`,
    `Téléphone: ${safePhone}`,
    `Courriel: ${safeEmail}`,
    "",
    "<b>Localisation</b>",
    `📍 Adresse: ${safeAddress}`,
    mapsLine,
    "",
    "<b>Service souhaité</b>",
    serviceList,
    `Total estimé: ${safeEstimatedTotal}`,
    "",
    "<b>Message</b>",
    safeMessage,
  ].join("\n");
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { success: false, error: "Method not allowed" });
  }

  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  const botKey = process.env.TELEGRAM_BOT_KEY;

  if (!channelId || !botKey) {
    return jsonResponse(500, {
      success: false,
      error: "Telegram environment variables are not configured",
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { success: false, error: "Invalid JSON body" });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return jsonResponse(400, { success: false, error: "Invalid submission data" });

  const fullName = readString(payload.fullName ?? payload.name, 200);
  const phone = readString(payload.phone, 100);
  const email = readString(payload.email, 200);
  const address = readString(payload.address, 500);
  const serviceWanted = readString(payload.serviceWanted, 1000);
  const estimatedTotal = readNumber(payload.estimatedTotal);
  const message = readString(payload.message, 2000);

  if (!fullName || !address || !serviceWanted) {
    return jsonResponse(400, {
      success: false,
      error: "Missing required fields",
    });
  }

  if (!phone && !email) {
    return jsonResponse(400, {
      success: false,
      error: "A phone number or email address is required",
    });
  }

  const googleMapsLink = buildMapsLink(address);
  const text = formatTelegramMessage({
    fullName,
    phone,
    email,
    address,
    googleMapsLink,
    serviceWanted,
    estimatedTotal,
    message,
  });

  try {
    const telegramResponse = await fetch(`${TELEGRAM_API_BASE}/bot${botKey}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: channelId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!telegramResponse.ok) {
      const details = await telegramResponse.text();
      console.error("Telegram sendMessage failed", {
        status: telegramResponse.status,
        details,
      });

      return jsonResponse(502, {
        success: false,
        error: "Telegram request failed",
      });
    }

    return jsonResponse(200, {
      success: true,
      googleMapsLink,
      message: "Submission sent",
    });
  } catch (error) {
    console.error("Telegram submission error", error);

    return jsonResponse(502, {
      success: false,
      error: "Unable to send Telegram message",
    });
  }
};
