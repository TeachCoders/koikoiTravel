export type HeroBannerEntityType =
  | "Home"
  | "Country"
  | "State"
  | "City"
  | "TravelExperience"
  | "Destinations";

export interface HeroFullBanner {
  id: number;
  entityType: HeroBannerEntityType | string;
  entityId: number;
  pageSlug?: string | null;
  image: string;
  mobileImage?: string | null;
  title?: string | null;
  subtitle?: string | null;
  altText?: string | null;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroBannerQuery {
  entityType: HeroBannerEntityType | string;
  entityId?: number;
  slug?: string;
  pageSlug?: string;
}
