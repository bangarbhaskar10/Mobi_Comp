"use client";

import clsx from "clsx";
import { ProviderListing } from "@/lib/types";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

type PriceTableProps = {
  listings: ProviderListing[];
  bestPrice: number;
};

export const PriceTable = ({ listings, bestPrice }: PriceTableProps) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-surface shadow-2xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-2 text-muted">
          <tr>
            <th className="px-6 py-4">Platform</th>
            <th className="px-6 py-4">Current Price</th>
            <th className="px-6 py-4">Offers</th>
            <th className="px-6 py-4">Rating</th>
            <th className="px-6 py-4">Direct Link</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => {
            const isBest = listing.price === bestPrice;
            return (
              <tr
                key={`${listing.provider}-${listing.productId}`}
                className={clsx(
                  "border-b border-white/5",
                  isBest ? "bg-emerald-500/15" : "hover:bg-white/5",
                )}
              >
                <td className="px-6 py-4 font-semibold">{listing.provider}</td>
                <td className={clsx("px-6 py-4 text-lg", isBest && "font-bold")}>
                  {formatPrice(listing.price)}
                  {isBest ? (
                    <span className="ml-2 inline-flex items-center rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-semibold text-emerald-200">
                      🔥 Best Price
                    </span>
                  ) : null}
                </td>
                <td className="px-6 py-4 text-muted">
                  {listing.offers.join(" • ")}
                </td>
                <td className="px-6 py-4">{listing.rating.toFixed(1)}</td>
                <td className="px-6 py-4">
                  <a
                    className={clsx(
                      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition",
                      isBest
                        ? "bg-emerald-400/20 text-emerald-200"
                        : "bg-white/10 text-text",
                    )}
                    href={listing.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Store
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
