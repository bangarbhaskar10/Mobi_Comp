"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Filters } from "@/components/Filters";
import { PriceTable } from "@/components/PriceTable";
import { SearchBar, SearchOption } from "@/components/SearchBar";
import { Toggle } from "@/components/Toggle";
import { CompareResponse } from "@/lib/types";

const initialFilters = {
  brand: "",
  ram: "",
  storage: "",
  storageType: "",
  processor: "",
};

const emptyFilterOptions = {
  brands: [] as string[],
  ram: [] as string[],
  storage: [] as string[],
  storageType: [] as string[],
  processor: [] as string[],
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function Home() {
  const [category, setCategory] = useState<"mobile" | "laptop">("mobile");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [filterOptions, setFilterOptions] = useState(emptyFilterOptions);
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [selected, setSelected] = useState<SearchOption | null>(null);
  const [comparison, setComparison] = useState<CompareResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleCategoryChange = (value: "mobile" | "laptop") => {
    setCategory(value);
    setSelected(null);
    setComparison(null);
    setFilters(initialFilters);
    setQuery("");
  };

  const fetchOptions = useCallback(async () => {
    setSearchLoading(true);
    const params = new URLSearchParams({
      category,
      query,
      ...(filters.brand && { brand: filters.brand }),
      ...(filters.ram && { ram: filters.ram }),
      ...(filters.storage && { storage: filters.storage }),
      ...(filters.storageType && { storageType: filters.storageType }),
      ...(filters.processor && { processor: filters.processor }),
    });

    const response = await fetch(`/api/search-products?${params.toString()}`);
    const data = await response.json();
    setOptions(data.results ?? []);
    setFilterOptions(data.filters ?? emptyFilterOptions);
    setSearchLoading(false);
  }, [category, query, filters]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchOptions();
    }, 250);

    return () => clearTimeout(timeout);
  }, [fetchOptions]);

  const handleCompare = async (option: SearchOption) => {
    setSelected(option);
    setLoading(true);
    const params = new URLSearchParams({
      category,
      product: option.id,
    });
    const response = await fetch(`/api/compare-prices?${params.toString()}`);
    const data = await response.json();
    setComparison(data);
    setLoading(false);
  };

  const bestSummary = useMemo(() => {
    if (!comparison) return null;
    const best = comparison.listings.at(0);
    if (!best) return null;
    return {
      provider: best.provider,
      price: best.price,
      offers: best.offers.slice(0, 2),
    };
  }, [comparison]);

  return (
    <div className="min-h-screen px-4 py-10 md:px-10">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="gradient-border">
          <div className="gradient-inner rounded-[23px] p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted">
                  Live Price Intelligence
                </p>
                <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
                  Mobi_Comp
                </h1>
                <p className="mt-2 max-w-xl text-muted">
                  Compare the latest mobile and laptop prices across India&apos;s
                  top retailers. Find the lowest price instantly.
                </p>
              </div>
              <Toggle value={category} onChange={handleCategoryChange} />
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <SearchBar
                query={query}
                onQueryChange={setQuery}
                options={options}
                onSelect={handleCompare}
                loading={searchLoading}
              />
              <Filters
                category={category}
                filters={filterOptions}
                values={filters}
                onChange={(key, value) =>
                  setFilters((prev) => ({ ...prev, [key]: value }))
                }
              />
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-10 w-full max-w-6xl">
        {!selected ? (
          <div className="rounded-3xl bg-surface p-10 text-center text-muted shadow-xl">
            Start typing a model name to see real-time prices.
          </div>
        ) : null}

        {loading ? (
          <div className="mt-6 rounded-3xl bg-surface p-10 text-center text-muted shadow-xl">
            Fetching latest prices from all platforms...
          </div>
        ) : null}

        {!loading && comparison ? (
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-surface p-6 shadow-xl">
                <p className="text-xs uppercase text-muted">Selected Model</p>
                <p className="mt-2 text-xl font-semibold text-text">
                  {comparison.product.name}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {comparison.product.brand} • {comparison.product.ram} •{" "}
                  {comparison.product.storage}
                  {comparison.product.storageType
                    ? ` • ${comparison.product.storageType}`
                    : ""}
                  {comparison.product.processor
                    ? ` • ${comparison.product.processor}`
                    : ""}
                </p>
              </div>
              <div className="rounded-3xl bg-emerald-500/15 p-6 shadow-xl">
                <p className="text-xs uppercase text-emerald-200">
                  Lowest Price
                </p>
                <p className="mt-2 text-2xl font-bold text-emerald-100">
                  {formatPrice(comparison.bestPrice)}
                </p>
                <p className="mt-1 text-sm text-emerald-200">
                </p>
              </div>
              <div className="rounded-3xl bg-surface p-6 shadow-xl">
                <p className="text-xs uppercase text-muted">Top Offers</p>
                <div className="mt-2 space-y-2 text-sm">
                  {bestSummary?.offers.map((offer) => (
                    <p key={offer} className="text-text">
                      {offer}
                    </p>
                  )) ?? <p className="text-muted">No offers detected</p>}
                </div>
              </div>
            </div>
            <PriceTable
              listings={comparison.listings}
              bestPrice={comparison.bestPrice}
            />
            <p className="text-xs text-muted">
              Last updated: {new Date(comparison.lastUpdated).toLocaleString("en-IN")}
            </p>
          </div>
        ) : null}
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl">
        <div className="rounded-3xl bg-surface-2 p-8 text-sm text-muted shadow-xl">
          <p className="text-text font-semibold">Integration Ready</p>
          <p className="mt-2">
            This build uses structured mock data and parallel fetchers so you can
            plug in compliant scraping or affiliate feeds for real-time pricing
            without changing the UI or comparison logic.
          </p>
        </div>
      </section>
    </div>
  );
}
