import { z } from "zod";
import createCmsRouter from "../utils/createCmsRouter.js";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  seoDescription: z.string().min(1, "Description is required").max(500),
  overView: z.string().max(1200, "Short seoDescription should be under 200 words").optional(),
  seoKeyword: z.string().optional(),
  canonical: z.string().optional(),
  seoTitle: z.string().optional(),
  h1Title: z.string().optional(),
  thumbImg: z.string().optional(),
  moreDescription: z.string().optional(),
  capital: z.string().optional(),
  language: z.string().optional(),
  famousFor: z.string().optional(),
  area: z.string().optional(),
  countryId: z.number().int().min(1, "Country is required"),
  isActive: z.boolean().optional(),
  showOnSite: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
  journeyIds: z.array(z.number().int()).optional(),
});

const journeySelect = {
  id: true,
  title: true,
  slug: true,
  thumbImg: true,
  destination: true,
  duration: true,
  noDays: true,
  pricePerPerson: true,
  discountPrice: true,
  displayOrder: true,
  isBestSelling: true,
  highlights: true,
  travelExperiences: { select: { id: true, title: true, slug: true } },
  cities: { select: { id: true, title: true, slug: true } },
};

export default createCmsRouter({
  modelName: "state",
  entityType: "State",
  schema,
  searchFields: ["title", "slug", "seoKeyword"],
  parentField: "countryId",
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
    showOnSite: true,
    displayOrder: true,
    countryId: true,
  },
  parentInclude: { model: "country", select: { id: true, title: true, slug: true } },
  childInclude: {
    model: "cities",
    // _count.journeys lets the destinations page label each city with its
    // itinerary count without a second round trip. City.journeys is a real
    // relation and Journey.isActive gates which tours actually count.
    select: {
      id: true,
      title: true,
      slug: true,
      thumbImg: true,
      displayOrder: true,
      isActive: true,
      _count: { select: { journeys: { where: { isActive: true } } } },
    },
  },
  relations: [
    {
      field: "journeys",
      inputKey: "journeyIds",
      orderField: "featuredJourneyOrder",
      select: journeySelect,
    },
  ],
  tourCountWhere: (id) => ({ isActive: true, OR: [{ cities: { some: { stateId: id } } }, { states: { some: { id } } }] }),
});
