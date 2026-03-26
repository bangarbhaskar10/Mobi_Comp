import { filters, products } from "@/data/products";
import { Category, Product } from "@/lib/types";
import { normalizeText } from "@/lib/normalize";

export type FilterInput = {
  brand?: string;
  ram?: string;
  storage?: string;
  storageType?: string;
  processor?: string;
};

export const getFiltersForCategory = (category: Category) => filters[category];

export const searchProducts = (
  category: Category,
  query: string,
  filterInput: FilterInput,
): Product[] => {
  const normalizedQuery = normalizeText(query);

  return products
    .filter((product) => product.category === category)
    .filter((product) => {
      if (!normalizedQuery) return true;
      return normalizeText(product.name).includes(normalizedQuery);
    })
    .filter((product) => {
      if (filterInput.brand && product.brand !== filterInput.brand) return false;
      if (filterInput.ram && product.ram !== filterInput.ram) return false;
      if (filterInput.storage && product.storage !== filterInput.storage)
        return false;
      if (filterInput.storageType && product.storageType !== filterInput.storageType)
        return false;
      if (filterInput.processor && product.processor !== filterInput.processor)
        return false;
      return true;
    });
};

export const getProductById = (id: string) =>
  products.find((product) => product.id === id) ?? null;
