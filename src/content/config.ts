import { z, defineCollection, reference } from "astro:content";

const source = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    Author: z.string(),
    datePublished: z.date(),
    price: z.number(),
    url: z.string().url(),
  }),
});

const mesurement = z.object({
  value: z.number(),
  unit: z.string(),
  dailyValue: z.number().optional(),
});

const fat = z.object({
  total: mesurement,
  saturated: mesurement,
  trans: mesurement,
});

const carbohydrates = z.object({
  total: mesurement,
  sugars: z.object({
    total: mesurement,
    added: mesurement,
  }),
});

const macros = z.object({
  ServingSize: mesurement,
  EstimatedServings: mesurement.optional(),
  fat: fat,
  cholesterol: mesurement,
  sodium: mesurement,
  carbohydrates: carbohydrates,
  protein: mesurement,
});

const ingredients = z.object({ name: z.string(), amount: mesurement });

const recipe = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    cuisine: z.string(),
    source: reference("books"),
    units: z.string(),
    macros: macros,
    ingredients: z.array(ingredients),
    tags: z.string().optional(),
    lastUpdated: z.date(),
    added: z.date(),
  }),
});

export const collections = {
  recipes: recipe,
  books: source,
};
