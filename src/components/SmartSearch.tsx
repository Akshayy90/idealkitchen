import { Search, X } from "lucide-react";
import { BADGE_META, type DishBadge } from "@/data/menu";

export type FilterKey = DishBadge | "under100" | "veg";

export const FILTERS: { key: FilterKey; label: string; emoji: string }[] = [
  { key: "chef", label: "Chef's Pick", emoji: "👨‍🍳" },
  { key: "popular", label: "Popular", emoji: "🔥" },
  { key: "under100", label: "Under ₹100", emoji: "💰" },
  { key: "spicy", label: "Spicy", emoji: "🌶️" },
  { key: "sweet", label: "Sweet", emoji: "🍯" },
  { key: "crispy", label: "Crispy", emoji: "🥡" },
  { key: "healthy", label: "Healthy", emoji: "💚" },
  { key: "kids", label: "Kids", emoji: "👶" },
  { key: "quick", label: "Quick", emoji: "⏱️" },
];

export function SmartSearch({
  query,
  setQuery,
  active,
  toggle,
  clear,
  resultCount,
}: {
  query: string;
  setQuery: (q: string) => void;
  active: Set<FilterKey>;
  toggle: (k: FilterKey) => void;
  clear: () => void;
  resultCount: number;
}) {
  const hasFilter = query.trim().length > 0 || active.size > 0;
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes, ingredients, flavours…"
          className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-11 text-sm text-foreground shadow-soft outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          aria-label="Search menu"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground transition hover:bg-border"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => {
          const on = active.has(f.key);
          return (
            <button
              key={f.key}
              onClick={() => toggle(f.key)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                on
                  ? "border-transparent bg-gradient-hero text-primary-foreground shadow-soft"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
              aria-pressed={on}
            >
              <span aria-hidden>{f.emoji}</span>
              {f.label}
            </button>
          );
        })}
        {hasFilter && (
          <button
            onClick={clear}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {hasFilter && (
        <div className="mt-2 text-xs text-muted-foreground">
          {resultCount} {resultCount === 1 ? "dish" : "dishes"} match your search
        </div>
      )}
    </div>
  );
}

export function matchesFilters(
  item: { name: string; description?: string; ingredients?: string[]; badges?: DishBadge[]; price?: number; chefPick?: boolean },
  query: string,
  active: Set<FilterKey>
): boolean {
  // Filters (AND across filters)
  for (const f of active) {
    if (f === "under100") {
      if (item.price === undefined || item.price >= 100) return false;
    } else if (f === "chef") {
      if (!(item.chefPick || item.badges?.includes("chef"))) return false;
    } else {
      if (!item.badges?.includes(f as DishBadge)) return false;
    }
  }
  // Query
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    item.name,
    item.description ?? "",
    (item.ingredients ?? []).join(" "),
    (item.badges ?? []).map((b) => BADGE_META[b].label).join(" "),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}
