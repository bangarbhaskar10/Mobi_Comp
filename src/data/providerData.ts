import { ProviderListing } from "@/lib/types";
import { products } from "@/data/products";

const providerSearchUrl = (provider: string, productName: string) => {
  const query = encodeURIComponent(productName);
  switch (provider) {
    case "Amazon":
      return `https://www.amazon.in/s?k=${query}`;
    case "Flipkart":
      return `https://www.flipkart.com/search?q=${query}`;
    case "Croma":
      return `https://www.croma.com/searchB?q=${query}`;
    case "Vijay Sales":
      return `https://www.vijaysales.com/search/${query}`;
    case "Reliance Digital":
      return `https://www.reliancedigital.in/search?q=${query}`;
    default:
      return "#";
  }
};

const providerOffsets = {
  Amazon: 0,
  Flipkart: -900,
  Croma: 1400,
  "Vijay Sales": 600,
  "Reliance Digital": 350,
} as const;

const providerRatings = {
  Amazon: 4.6,
  Flipkart: 4.5,
  Croma: 4.3,
  "Vijay Sales": 4.2,
  "Reliance Digital": 4.3,
} as const;

const providerOffers = {
  Amazon: ["Bank discount", "No-cost EMI"],
  Flipkart: ["Exchange bonus", "Axis Bank EMI"],
  Croma: ["No-cost EMI", "Extra warranty"],
  "Vijay Sales": ["Bank cashback", "Exchange offer"],
  "Reliance Digital": ["No-cost EMI", "Loyalty points"],
} as const;

const basePrices: Record<string, number> = {
  "m-iphone-15-128": 52999,
  "m-iphone-15-256": 58999,
  "m-iphone-15-pro-256": 119990,
  "m-s23-256": 59999,
  "m-s24-256": 72999,
  "m-pixel-8-128": 67999,
  "m-oneplus-12-256": 64999,
  "m-oneplus-12r-128": 38999,
  "m-redmi-note13-128": 25999,
  "m-redmi-note13-256": 28999,
  "m-realme-gt-neo-256": 33999,
  "m-vivo-v30-256": 37999,
  "m-oppo-reno11-256": 36999,
  "m-moto-edge-50-256": 44999,
  "l-macbook-air-m2-256": 98990,
  "l-macbook-air-m2-512": 114990,
  "l-dell-inspiron-i5-512": 65990,
  "l-dell-vostro-i3-256": 41990,
  "l-hp-pavilion-ryzen5-512": 62990,
  "l-hp-victus-i5-512": 74990,
  "l-lenovo-ideapad-i3-256": 39990,
  "l-lenovo-loq-i7-1tb": 94990,
  "l-asus-vivobook-i7-1tb": 82990,
  "l-asus-rog-ryzen7-1tb": 119990,
  "l-acer-aspire-i5-512": 56990,
  "l-msi-thin-i7-1tb": 99990,
};

export const providerListings: ProviderListing[] = products.flatMap((product) => {
  const basePrice = basePrices[product.id] ?? 49999;
  return (Object.keys(providerOffsets) as Array<keyof typeof providerOffsets>).map(
    (provider) => {
      const price = Math.max(
        19999,
        basePrice + providerOffsets[provider] + Math.round(Math.random() * 400),
      );
      return {
        provider,
        productId: product.id,
        productName: product.name,
        price,
        rating: providerRatings[provider],
        url: providerSearchUrl(provider, product.name),
        offers: providerOffers[provider],
      };
    },
  );
});
