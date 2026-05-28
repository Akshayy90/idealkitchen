import { BADGE_META, type DishBadge } from "@/data/menu";

export function DishBadges({
  badges,
  size = "sm",
  max,
}: {
  badges?: DishBadge[];
  size?: "xs" | "sm";
  max?: number;
}) {
  if (!badges || badges.length === 0) return null;
  const shown = max ? badges.slice(0, max) : badges;
  const pad = size === "xs" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-0.5 text-[10px]";
  return (
    <div className="flex flex-wrap gap-1">
      {shown.map((b) => {
        const meta = BADGE_META[b];
        return (
          <span
            key={b}
            className={`inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-wider ${pad} ${meta.tone}`}
          >
            <span aria-hidden>{meta.emoji}</span>
            {meta.label}
          </span>
        );
      })}
    </div>
  );
}

export function SpiceMeter({ level }: { level?: 0 | 1 | 2 | 3 }) {
  if (!level) return null;
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Spice level ${level} of 3`}
      title={`Spice level ${level}/3`}
    >
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`text-[11px] leading-none ${
            n <= level ? "opacity-100" : "opacity-25 grayscale"
          }`}
        >
          🌶️
        </span>
      ))}
    </span>
  );
}
