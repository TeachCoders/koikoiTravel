import { z } from "zod";
import createCmsRouter from "../utils/createCmsRouter.js";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  seoDescription: z.string().min(1, "Description is required").max(500),
  overView: z.string().optional(),
  seoKeyword: z.string().optional(),
  canonical: z.string().optional(),
  seoTitle: z.string().optional(),
  h1Title: z.string().optional(),
  thumbImg: z.string().optional(),
  moreDescription: z.string().optional(),
  type: z.string().optional(),
  idealFor: z.string().optional(),
  duration: z.string().optional(),
  budgetRange: z.string().optional(),
  highlights: z.string().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
  cityIds: z.array(z.number().int()).optional(),
  journeyIds: z.array(z.number().int()).optional(),
});

const journeySelect = {
  id: true,
  title: true,
  slug: true,
  thumbImg: true,
  destination: true,
};

const citySelect = {
  id: true,
  title: true,
  slug: true,
  thumbImg: true,
  state: {
    select: { id: true, title: true, slug: true, country: { select: { id: true, title: true, slug: true } } },
  },
};

export default createCmsRouter({
  modelName: "travelExperience",
  entityType: "TravelExperience",
  schema,
  searchFields: ["title", "slug", "seoKeyword"],
  listSelect: {
    id: true,
    title: true,
    slug: true,
    seoTitle: true,
    h1Title: true,
    seoKeyword: true,
    seoDescription: true,
    thumbImg: true,
    overView: true,
    isActive: true,
    displayOrder: true,
    cityOrder: true,
    cities: { select: citySelect },
  },
  relations: [
    {
      field: "cities",
      inputKey: "cityIds",
      orderField: "cityOrder",
      select: citySelect,
    },
    {
      field: "journeys",
      inputKey: "journeyIds",
      orderField: "featuredJourneyOrder",
      select: journeySelect,
    },
  ],
  tourCountWhere: (id) => ({ travelExperiences: { some: { id } } }),
});
