export const SITE_CONFIG = {
  name: "KoiKoi Travel",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178",
  salesPhone: process.env.NEXT_PUBLIC_SALES_PHONE || "+919136739178",
  salesPhoneHref: "tel:+919136739178",
  email: "hello@koikoitravel.com",
  siteUrl: "https://koikoitravel.com",
} as const;

export const getWhatsAppUrl = (message?: string) => {
  const base = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
