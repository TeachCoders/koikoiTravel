import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosError,
} from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

const config: CreateAxiosDefaults = {
  baseURL: API_BASE,
  timeout: 15000,
  withCredentials: true,
};

const apiClient: AxiosInstance = axios.create(config);

let csrfToken: string | null = null;

export const fetchCsrfToken = async () => {
  try {
    const res = await apiClient.get("/auth/csrf-token");
    csrfToken = res.data?.csrfToken || null;
  } catch {
    csrfToken = null;
  }
};

export const getCsrfToken = () => csrfToken;

apiClient.interceptors.request.use((req) => {
  if (["post", "put", "patch", "delete"].includes(req.method || "") && csrfToken) {
    req.headers["X-CSRF-Token"] = csrfToken;
  }
  // When browsing from a logged-in admin/staff browser, tell backend to bypass Redis cache
  // so admins always see fresh real-time data instead of cached responses
  if (typeof document !== "undefined" && document.cookie.includes("admin_logged_in")) {
    req.headers["Cache-Control"] = "no-cache";
    req.headers["Pragma"] = "no-cache";
    req.headers["X-Bypass-Cache"] = "1";
  }
  return req;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 403 && error.response?.data) {
      const data = error.response.data as Record<string, unknown>;
      if (typeof data === "object" && data !== null && "csrf" in data) {
        csrfToken = null;
        fetchCsrfToken();
      }
    }

    // Session-expiry bounce – ONLY for protected /dashboard pages.
    // Public visitors (browsing tour packages, blogs, destinations) should NEVER
    // be abruptly redirected to /auth when a background fetch or guest check fails.
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const isDashboardPage = pathname.startsWith("/dashboard");
      const alreadyOnAuthPage = pathname.startsWith("/auth");

      if (isDashboardPage && !alreadyOnAuthPage) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
