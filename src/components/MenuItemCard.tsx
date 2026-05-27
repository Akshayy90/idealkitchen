import { motion } from "framer-motion";
import { useState } from "react";
import { Leaf, Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/hooks/useCart";

const exts = ["jpg", "jpeg", "png", "webp"];

export function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = `/menu-images/${item.slug}.${exts[extIdx]}`;
  const { items, add, setQty } = useCart();

  const plainKey = item.priceGhee !== undefined ? `${item.slug}::plain` : item.slug;
  const gheeKey = `${item.slug}::ghee`;
  const plainQty = items.find((i) => i.key === plainKey)?.qty ?? 0;
  const gheeQty = items.find((i) => i.key === gheeKey)?.qty ?? 0;

  const canOrder = item.price !== undefined;
  const hasGhee = item.priceGhee !== undefined;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {!failed ? (
          <img
            src={src}
            alt={item.name}
            loading="lazy"
            onError={() => {
              if (extIdx < exts.length - 1) setExtIdx(extIdx + 1);
              else setFailed(true);
            }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-leaf">
            <div className="flex flex-col items-center gap-2 text-primary-deep/70">
              <Leaf className="h-10 w-10 animate-float-slow" strokeWidth={1.5} />
              <span className="text-xs font-medium uppercase tracking-wider">Photo coming soon</span>
            </div>
          </div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/95 px-2 py-1 text-[10px] font-semibold text-primary shadow-soft backdrop-blur">
          <span className="block h-2 w-2 rounded-sm border border-primary">
            <span className="block h-full w-full scale-50 rounded-full bg-primary" />
          </span>
          PURE VEG
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-tight text-foreground sm:text-lg">
            {item.name}
          </h3>
          <div className="shrink-0 text-right">
            {item.price !== undefined && (
              <div className="text-base font-bold text-primary-deep sm:text-lg">
                ₹{item.price}
                {hasGhee && (
                  <span className="ml-1 text-xs font-medium text-muted-foreground">
                    / <span className="text-secondary">₹{item.priceGhee}</span>
                  </span>
                )}
              </div>
            )}
            {hasGhee && (
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                plain / ghee
              </div>
            )}
            {item.note && !item.price && (
              <div className="text-xs italic text-muted-foreground">{item.note}</div>
            )}
          </div>
        </div>

        {canOrder && (
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            <QtyControl
              label={hasGhee ? "Plain" : "Add"}
              price={item.price!}
              qty={plainQty}
              onAdd={() =>
                add({
                  slug: item.slug,
                  name: item.name,
                  price: item.price!,
                  variant: hasGhee ? "plain" : undefined,
                })
              }
              onDec={() => setQty(plainKey, plainQty - 1)}
              onInc={() => setQty(plainKey, plainQty + 1)}
            />
            {hasGhee && (
              <QtyControl
                label="Ghee"
                price={item.priceGhee!}
                qty={gheeQty}
                variant="ghee"
                onAdd={() =>
                  add({
                    slug: item.slug,
                    name: item.name,
                    price: item.priceGhee!,
                    variant: "ghee",
                  })
                }
                onDec={() => setQty(gheeKey, gheeQty - 1)}
                onInc={() => setQty(gheeKey, gheeQty + 1)}
              />
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function QtyControl({
  label,
  price,
  qty,
  onAdd,
  onInc,
  onDec,
  variant,
}: {
  label: string;
  price: number;
  qty: number;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
  variant?: "ghee";
}) {
  const isGhee = variant === "ghee";
  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={`group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all active:scale-95 ${
          isGhee
            ? "border border-secondary/50 bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground"
            : "bg-gradient-hero text-primary-foreground shadow-soft hover:shadow-glow"
        }`}
      >
        <Plus className="h-3.5 w-3.5" />
        {label} · ₹{price}
      </button>
    );
  }
  return (
    <div
      className={`inline-flex flex-1 items-center justify-between gap-1 rounded-full px-1 py-1 text-xs font-semibold ${
        isGhee
          ? "border border-secondary/50 bg-secondary/15 text-secondary"
          : "bg-gradient-hero text-primary-foreground shadow-soft"
      }`}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label="Decrease"
        className="grid h-7 w-7 place-items-center rounded-full bg-background/20 transition hover:bg-background/40 active:scale-90"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="px-1 text-center text-[11px] leading-tight">
        <span className="block font-bold">{qty}×</span>
        <span className="block text-[9px] opacity-80">{label}</span>
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label="Increase"
        className="grid h-7 w-7 place-items-center rounded-full bg-background/20 transition hover:bg-background/40 active:scale-90"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
