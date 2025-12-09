// app/travel-community/components/FilterSidebar.tsx
"use client";

import {
  FilterState,
  mileageOptions,
  timeRangeOptions,
  tagOptions,
  categoryOptions,
} from "../data/posts";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (state: Partial<FilterState>) => void;
  onApply: () => void;
  appliedMessage?: string | null;
}

export default function FilterSidebar({
  filters,
  onChange,
  onApply,
  appliedMessage,
}: FilterSidebarProps) {
  const toggleValue = (list: string[], value: string) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  return (
    <div className="rounded-[12px] border border-[rgba(45,64,87,0.1)] bg-white p-5 shadow-sm flex flex-col gap-5">
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">排序方式</h3>
        <div className="space-y-2 text-sm text-[#1F2E3C]/80">
          {[
            { label: "最新", value: "newest" },
            { label: "最熱門", value: "popular" },
            { label: "最多哩程", value: "miles" },
            { label: "分享最多", value: "shares" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="sort"
                checked={filters.sort === option.value}
                onChange={() => onChange({ sort: option.value as FilterState["sort"] })}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Field label="發佈時間">
        <Select
          options={timeRangeOptions}
          value={filters.timeRange}
          onChange={(value) => onChange({ timeRange: value as FilterState["timeRange"] })}
        />
      </Field>

      <Field label="獎勵哩程">
        <Select
          options={mileageOptions}
          value={filters.mileageTier}
          onChange={(value) => onChange({ mileageTier: value as FilterState["mileageTier"] })}
        />
      </Field>

      <Field label="熱門標籤">
        <TagGroup
          tags={tagOptions}
          selected={filters.selectedTags}
          onToggle={(tag) =>
            onChange({ selectedTags: toggleValue(filters.selectedTags, tag) })
          }
        />
      </Field>

      <Field label="景點分類">
        <TagGroup
          tags={categoryOptions}
          selected={filters.selectedCategories}
          onToggle={(cat) =>
            onChange({
              selectedCategories: toggleValue(filters.selectedCategories, cat),
            })
          }
        />
      </Field>

      {appliedMessage && (
        <p className="text-xs text-[var(--sw-primary)]">{appliedMessage}</p>
      )}

      <button
        type="button"
        onClick={onApply}
        className="mt-1 h-11 rounded-full bg-[var(--sw-accent)] text-black text-sm font-normal tracking-[0.08em] shadow-[0_10px_25px_rgba(220,187,135,0.28)] hover:bg-[var(--sw-accent)]/90 transition"
      >
        套用篩選
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 w-full">
      <div className="text-sm font-semibold text-[#1F2E3C]/80">{label}</div>
      {children}
    </div>
  );
}

function Select({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      className="h-10 w-full rounded-[8px] border px-3 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function TagGroup({
  tags,
  selected,
  onToggle,
}: {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => {
        const isActive = selected.includes(t);
        return (
          <button
            key={t}
            type="button"
            onClick={() => onToggle(t)}
            className={`rounded-full border px-3 h-8 text-sm transition ${
              isActive
                ? "bg-[var(--sw-accent)] text-black border-[var(--sw-accent)]"
                : "hover:border-[var(--sw-accent)]"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
