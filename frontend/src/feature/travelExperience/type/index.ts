export interface Banner {
  id: number;
  bannerTitle: string;
  bannerTag: string;
  images: string[];
}

export interface TravelExperienceCity {
  id: number;
  title: string;
  slug: string;
  thumbImg?: string;
  state?: {
    id: number;
    title: string;
    slug: string;
    country?: { id: number; title: string; slug: string };
  };
}

export interface TravelExperienceJourney {
  id: number;
  title: string;
  slug: string;
  thumbImg?: string;
  destination?: string;
}

export interface TravelExperience {
  id: number;
  title: string;
  slug: string;
  seoDescription: string;
  moreDescription?: string;
  overView?: string;
  seoKeyword?: string;
  canonical?: string;
  seoTitle?: string;
  h1Title?: string;
  thumbImg?: string;
  type?: string;
  idealFor?: string;
  duration?: string;
  budgetRange?: string;
  highlights?: string;
  isActive: boolean;
  displayOrder?: number;
  banner?: Banner | null;
  faqs?: { id?: number; ques: string; ans: string }[];
  cities?: TravelExperienceCity[];
  cityOrder?: number[];
  journeys?: TravelExperienceJourney[];
  featuredJourneyOrder?: number[];
}

export interface TravelExperiencePayload {
  title: string;
  slug?: string;
  seoDescription: string;
  moreDescription?: string;
  overView?: string;
  seoKeyword?: string;
  canonical?: string;
  seoTitle?: string;
  h1Title?: string;
  thumbImg?: string;
  type?: string;
  idealFor?: string;
  duration?: string;
  budgetRange?: string;
  highlights?: string;
  isActive?: boolean;
  displayOrder?: number;
  bannerTitle?: string;
  bannerTag?: string;
  bannerImages?: string[];
  faqs?: { ques: string; ans: string }[];
  cityIds?: number[];
  journeyIds?: number[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
