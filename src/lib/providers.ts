import { providerListings } from "@/data/providerData";
import { Provider, ProviderListing } from "@/lib/types";

const providers: Provider[] = [
  "Amazon",
  "Flipkart",
  "Croma",
  "Vijay Sales",
  "Reliance Digital",
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProviderListings = async (
  provider: Provider,
  productId: string,
): Promise<ProviderListing[]> => {
  // Simulated latency to mimic real-world scraping/API calls
  await delay(100 + Math.random() * 250);
  return providerListings.filter(
    (listing) => listing.provider === provider && listing.productId === productId,
  );
};

export const fetchAllProviders = async (
  productId: string,
): Promise<ProviderListing[]> => {
  const results = await Promise.all(
    providers.map((provider) => fetchProviderListings(provider, productId)),
  );
  return results.flat();
};

export const providerList = providers;
