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

const buildMapsLink = (address) =>
  address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : "";

const formatTelegramMessage = ({ fullName, phone, email, address, googleMapsLink, serviceWanted }) => {
  const safeName = fullName || "Non fourni";
  const safePhone = phone || "Non fourni";
  const safeEmail = email || "Non fourni";
  const safeAddress = address || "Non fournie";
  const safeMapsLink = googleMapsLink || "Adresse non fournie";
  const safeService = serviceWanted || "Non pr\u00e9cis\u00e9";

  return [
    "Nouvelle soumission Ventipure",
    "",
    "Client",
    `Nom: ${safeName}`,
    `T\u00e9l\u00e9phone: ${safePhone}`,
    `Courriel: ${safeEmail}`,
    "",
    "Localisation",
    `\u{1F4CD} Adresse: ${safeAddress}`,
    `Ouvrir dans Google Maps: ${safeMapsLink}`,
    "",
    `Service souhait\u00e9: ${safeService}`,
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

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse(400, { success: false, error: "Invalid submission data" });
  }

  const fullName = readString(payload.fullName ?? payload.name, 200);
  const phone = readString(payload.phone, 100);
  const email = readString(payload.email, 200);
  const address = readString(payload.address, 500);
  const serviceWanted = readString(payload.serviceWanted, 1000);

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
