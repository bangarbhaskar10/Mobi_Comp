export type Category = "mobile" | "laptop";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  ram: string;
  storage: string;
  storageType?: "SSD" | "HDD" | "Hybrid";
  processor?: string;
};

export type Provider =
  | "Amazon"
  | "Flipkart"
  | "Croma"
  | "Vijay Sales"
  | "Reliance Digital";

export type ProviderListing = {
  provider: Provider;
  productId: string;
  productName: string;
  price: number;
  rating: number;
  url: string;
  offers: string[];
};

export type CompareResponse = {
  product: Product;
  listings: ProviderListing[];
  bestPrice: number;
  bestProviders: Provider[];
  lastUpdated: string;
};
