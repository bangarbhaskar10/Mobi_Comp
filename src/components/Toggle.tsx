"use client";

import clsx from "clsx";

type ToggleProps = {
  value: "mobile" | "laptop";
  onChange: (value: "mobile" | "laptop") => void;
};

export const Toggle = ({ value, onChange }: ToggleProps) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-surface-2 p-1 text-sm">
      {["mobile", "laptop"].map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option as "mobile" | "laptop")}
            className={clsx(
              "px-4 py-2 rounded-full transition",
              active
                ? "bg-accent text-ink font-semibold shadow"
                : "text-muted hover:text-text",
            )}
          >
            {option === "mobile" ? "Mobiles" : "Laptops"}
          </button>
        );
      })}
    </div>
  );
};
