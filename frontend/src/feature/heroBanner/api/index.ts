import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { HeroFullBanner } from "../type";

/**
 * Fetch all hero banners for Admin Dashboard.
 */
export const useAllHeroBanners = () => {
  return useQuery<{ success: boolean; data: HeroFullBanner[] }>({
    queryKey: ["heroFullBanners", "all"],
    queryFn: async () => {
      const res = await apiClient.get("/hero-full-banner/all");
      return res.data;
    },
  });
};

/**
 * Client-side hook to fetch hero banners for a specific entity / page.
 */
export const useHeroBanners = (
  entityType: string,
  options?: { entityId?: number; slug?: string; pageSlug?: string; enabled?: boolean }
) => {
  const entityId = options?.entityId;
  const slug = options?.slug || options?.pageSlug;
  const isEnabled = options?.enabled !== undefined ? options.enabled : true;

  return useQuery<{ success: boolean; data: HeroFullBanner[] }>({
    queryKey: ["heroFullBanners", entityType, entityId, slug],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("entityType", entityType);
      if (entityId !== undefined && entityId !== null && entityId > 0) {
        params.append("entityId", String(entityId));
      }
      if (slug) {
        params.append("slug", slug);
      }
      const res = await apiClient.get(`/hero-full-banner?${params.toString()}`);
      return res.data;
    },
    enabled: isEnabled && Boolean(entityType),
    staleTime: 60 * 1000,
  });
};

/**
 * Admin mutation to upload and create a new hero banner.
 */
export const useCreateHeroBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await apiClient.post("/hero-full-banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroFullBanners"] });
    },
  });
};

/**
 * Admin mutation to delete a hero banner.
 */
export const useDeleteHeroBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.delete(`/hero-full-banner/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heroFullBanners"] });
    },
  });
};
