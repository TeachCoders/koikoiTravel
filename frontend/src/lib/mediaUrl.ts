import { API_BASE } from "./apiClient";

export const userImageUrl = (path?: string | null) => {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  const clean = path.replace(/^\/+/, "").replace(/^(user|images)\//, "");
  return `${API_BASE}/user/${clean}`;
};