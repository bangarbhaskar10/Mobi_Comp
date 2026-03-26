import { NextRequest, NextResponse } from "next/server";
import { getFiltersForCategory, searchProducts } from "@/lib/catalog";
import { MemoryCache } from "@/lib/cache";
import { Category } from "@/lib/types";

const cache = new MemoryCache(1000 * 60 * 5);

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") ?? "mobile") as Category;
  const query = searchParams.get("query") ?? "";

  const filterInput = {
    brand: searchParams.get("brand") ?? undefined,
    ram: searchParams.get("ram") ?? undefined,
    storage: searchParams.get("storage") ?? undefined,
    storageType: searchParams.get("storageType") ?? undefined,
    processor: searchParams.get("processor") ?? undefined,
  };

  const cacheKey = JSON.stringify({ category, query, filterInput });
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  const results = searchProducts(category, query, filterInput).map((product) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    ram: product.ram,
    storage: product.storage,
    storageType: product.storageType,
    processor: product.processor,
  }));

  const response = {
    results,
    filters: getFiltersForCategory(category),
  };

  cache.set(cacheKey, response);

  return NextResponse.json(response);
};
