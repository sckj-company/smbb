import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

const PRODUCTS_TAG = "products";

export const getProducts = unstable_cache(
  async (type = "product") =>
    prisma.product.findMany({
      where: { type },
      orderBy: { createdAt: "desc" }
    }),
  ["products-list"],
  { tags: [PRODUCTS_TAG] }
);

export const getProductBySlug = unstable_cache(
  async (slug: string) =>
    prisma.product.findFirst({
      where: { OR: [{ id: slug }, { slug }] }
    }),
  ["product-detail"],
  { tags: [PRODUCTS_TAG] }
);

export { PRODUCTS_TAG };

export const getCatalogCounts = unstable_cache(
  async () =>
    Promise.all([
      prisma.product.count({ where: { type: "product" } }),
      prisma.product.count({ where: { type: "service" } })
    ]),
  ["catalog-counts"],
  { tags: [PRODUCTS_TAG] }
);

export const invalidateProducts = () => undefined;
