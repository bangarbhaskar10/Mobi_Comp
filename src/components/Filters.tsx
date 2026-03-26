"use client";

type FiltersProps = {
  category: "mobile" | "laptop";
  filters: {
    brands: string[];
    ram: string[];
    storage: string[];
    storageType?: string[];
    processor?: string[];
  };
  values: {
    brand: string;
    ram: string;
    storage: string;
    storageType: string;
    processor: string;
  };
  onChange: (key: keyof FiltersProps["values"], value: string) => void;
};

export const Filters = ({
  category,
  filters,
  values,
  onChange,
}: FiltersProps) => {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <select
        className="selection-ring rounded-xl bg-surface px-3 py-2 text-sm text-text"
        value={values.brand}
        onChange={(event) => onChange("brand", event.target.value)}
      >
        <option value="">All Brands</option>
        {filters.brands.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        className="selection-ring rounded-xl bg-surface px-3 py-2 text-sm text-text"
        value={values.ram}
        onChange={(event) => onChange("ram", event.target.value)}
      >
        <option value="">All RAM</option>
        {filters.ram.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        className="selection-ring rounded-xl bg-surface px-3 py-2 text-sm text-text"
        value={values.storage}
        onChange={(event) => onChange("storage", event.target.value)}
      >
        <option value="">All Storage</option>
        {filters.storage.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {category === "laptop" ? (
        <>
          <select
            className="selection-ring rounded-xl bg-surface px-3 py-2 text-sm text-text"
            value={values.storageType}
            onChange={(event) => onChange("storageType", event.target.value)}
          >
            <option value="">Storage Type</option>
            {filters.storageType?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="selection-ring rounded-xl bg-surface px-3 py-2 text-sm text-text"
            value={values.processor}
            onChange={(event) => onChange("processor", event.target.value)}
          >
            <option value="">Processor</option>
            {filters.processor?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </>
      ) : null}
    </div>
  );
};
