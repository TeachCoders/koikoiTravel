import { z } from "zod";
import createCmsRouter from "../utils/createCmsRouter.js";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  seoDescription: z.string().min(1, "Description is required"),
  moreDescription: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.string().optional(),
  publishedAt: z.string().optional(),
  thumbImg: z.string().optional(),
  seoKeyword: z.string().optional(),
  canonical: z.string().optional(),
  seoTitle: z.string().optional(),
  h1Title: z.string().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export default createCmsRouter({
  modelName: "blogPost",
  entityType: "BlogPost",
  schema,
  searchFields: ["title", "slug", "seoKeyword", "category"],
  createDefaults: () => ({ publishedAt: new Date().toISOString().slice(0, 10) }),
  listSelect: {
    id: true,
    title: true,
    slug: true,
    thumbImg: true,
    author: true,
    category: true,
    categories: true,
    publishedAt: true,
    isActive: true,
    displayOrder: true,
  },
});
