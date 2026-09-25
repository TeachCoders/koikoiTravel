// Format a blog publish date (supports both "YYYY-MM-DD" and full ISO) into
// a clean, readable format like "September 24, 2026".
export function formatBlogDate(dateString: string | null | undefined): string {
  if (!dateString) return "";
  const value = dateString.length <= 10 ? `${dateString}T00:00:00Z` : dateString;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Utility to format ISO UTC strings into Indian local time (+05:30)
export function formatLocalDateTime(
  isoString: string | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!isoString) return "—";

  const date = new Date(isoString);

  const defaultOpts: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  };

  return new Intl.DateTimeFormat("en-IN", { ...defaultOpts, ...options }).format(date);
}
