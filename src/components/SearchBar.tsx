"use client";

import { useMemo, useRef, useState } from "react";
import clsx from "clsx";

export type SearchOption = {
  id: string;
  name: string;
  brand: string;
  ram: string;
  storage: string;
  storageType?: string;
  processor?: string;
};

type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  options: SearchOption[];
  onSelect: (option: SearchOption) => void;
  loading: boolean;
};

export const SearchBar = ({
  query,
  onQueryChange,
  options,
  onSelect,
  loading,
}: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  const filtered = useMemo(() => options.slice(0, 6), [options]);

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-lg">
        <span className="text-muted text-sm">Search</span>
        <input
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            onQueryChange(value);
            setOpen(true);
          }}
          onFocus={() => {
            if (blurTimeout.current) clearTimeout(blurTimeout.current);
            setOpen(true);
          }}
          onBlur={() => {
            blurTimeout.current = setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && filtered.length > 0) {
              onSelect(filtered[0]);
              setOpen(false);
            }
          }}
          placeholder="Search mobile or laptop model..."
          className="selection-ring w-full bg-transparent text-lg text-text placeholder:text-muted focus:outline-none"
        />
        {loading ? (
          <span className="text-xs text-muted">Loading...</span>
        ) : null}
      </div>
      {open && filtered.length > 0 ? (
        <div className="absolute z-20 mt-2 w-full rounded-2xl bg-surface-2 p-2 shadow-2xl">
          {filtered.map((option) => (
            <button
              key={option.id}
              className={clsx(
                "w-full text-left px-4 py-3 rounded-xl transition",
                "hover:bg-white/5",
              )}
              onMouseDown={(event) => {
                event.preventDefault();
                onSelect(option);
                setOpen(false);
              }}
            >
              <div className="text-sm font-semibold text-text">
                {option.name}
              </div>
              <div className="text-xs text-muted">
                {option.brand} • {option.ram} • {option.storage}
                {option.storageType ? ` • ${option.storageType}` : ""}
                {option.processor ? ` • ${option.processor}` : ""}
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
