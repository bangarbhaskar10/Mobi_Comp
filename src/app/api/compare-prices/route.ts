import { NextRequest, NextResponse } from "next/server";
import { comparePrices } from "@/lib/compare";
import { getProductById, searchProducts } from "@/lib/catalog";
import { MemoryCache } from "@/lib/cache";
import { Category } from "@/lib/types";

const cache = new MemoryCache(1000 * 60 * 3);

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const category = (searchParams.get("category") ?? "mobile") as Category;
  const productId = searchParams.get("product");
  const productName = searchParams.get("name") ?? "";

  const cacheKey = JSON.stringify({ category, productId, productName });
  const cached = cache.get(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  const product =
    (productId ? getProductById(productId) : null) ??
    searchProducts(category, productName, {}).at(0) ??
    null;

  if (!product) {
    return NextResponse.json(
      { error: "Product not found." },
      { status: 404 },
    );
  }

  const comparison = await comparePrices(product);
  cache.set(cacheKey, comparison);
  return NextResponse.json(comparison);
};
