import { fetchAllProviders } from "@/lib/providers";
import { CompareResponse, Product, ProviderListing } from "@/lib/types";

export const comparePrices = async (product: Product): Promise<CompareResponse> => {
  const listings = await fetchAllProviders(product.id);
  const sorted = [...listings].sort((a, b) => a.price - b.price);
  const bestPrice = sorted[0]?.price ?? 0;
  const bestProviders = sorted
    .filter((listing) => listing.price === bestPrice)
    .map((listing) => listing.provider);

  return {
    product,
    listings: sorted,
    bestPrice,
    bestProviders,
    lastUpdated: new Date().toISOString(),
  };
};

export const dedupeListings = (listings: ProviderListing[]) => {
  const seen = new Set<string>();
  return listings.filter((listing) => {
    const key = `${listing.provider}-${listing.productId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
