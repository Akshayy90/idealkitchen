import { useState } from "react";
import { Leaf, Plus, Minus, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type MenuItem, findItem } from "@/data/menu";
import { DishBadges, SpiceMeter } from "@/components/DishBadges";
import { useCart } from "@/hooks/useCart";

const exts = ["jpg", "jpeg", "png", "webp"];

export function DishDetailDrawer({
  item,
  open,
  onClose,
  onOpenItem,
}: {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
  onOpenItem: (item: MenuItem) => void;
}) {
  return (
    <AnimatePresence>
      {open && item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            key={item.slug}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 z-[81] flex h-[100dvh] w-full flex-col overflow-y-auto bg-background shadow-2xl sm:max-w-md"
            role="dialog"
            aria-label={item.name}
          >
            <DrawerContent item={item} onClose={onClose} onOpenItem={onOpenItem} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function DrawerContent({
  item,
  onClose,
  onOpenItem,
}: {
  item: MenuItem;
  onClose: () => void;
  onOpenItem: (item: MenuItem) => void;
}) {
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = `/menu-images/${item.slug}.${exts[extIdx]}`;
  const { items, add, setQty } = useCart();

  const hasGhee = item.priceGhee !== undefined;
  const plainKey = hasGhee ? `${item.slug}::plain` : item.slug;
  const gheeKey = `${item.slug}::ghee`;
  const plainQty = items.find((i) => i.key === plainKey)?.qty ?? 0;
  const gheeQty = items.find((i) => i.key === gheeKey)?.qty ?? 0;

  const pairs = (item.pairWith ?? [])
    .map(findItem)
    .filter((x): x is MenuItem => Boolean(x));

  return (
    <>
      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-soft backdrop-blur transition hover:bg-background"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative aspect-[5/4] w-full overflow-hidden bg-muted">
        {!failed ? (
          <img
            src={src}
            alt={item.name}
            onError={() => {
              if (extIdx < exts.length - 1) setExtIdx(extIdx + 1);
              else setFailed(true);
            }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-leaf">
            <div className="flex flex-col items-center gap-2 text-primary-deep/70">
              <Leaf className="h-12 w-12 animate-float-slow" strokeWidth={1.5} />
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

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              {item.name}
            </h2>
            <SpiceMeter level={item.spice} />
          </div>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>

        {item.badges && item.badges.length > 0 && <DishBadges badges={item.badges} />}

        {item.price !== undefined && (
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Add to order
            </div>
            <div className="flex flex-col gap-2">
              <DrawerAddRow
                label={hasGhee ? "Plain" : "Add to order"}
                price={item.price}
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
                <DrawerAddRow
                  label="With Ghee"
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
          </div>
        )}

        {item.ingredients && item.ingredients.length > 0 && (
          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              What's in it
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full border bg-muted/60 px-2.5 py-1 text-xs text-foreground"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {pairs.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              Pair it with
            </div>
            <div className="flex flex-col gap-2">
              {pairs.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => onOpenItem(p)}
                  className="group flex items-center justify-between rounded-xl border bg-card px-3 py-2 text-left transition hover:border-primary/40 hover:bg-primary/5"
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground">{p.name}</div>
                    {p.description && (
                      <div className="line-clamp-1 text-xs text-muted-foreground">
                        {p.description}
                      </div>
                    )}
                  </div>
                  {p.price !== undefined && (
                    <div className="ml-3 shrink-0 text-sm font-bold text-primary-deep">
                      ₹{p.price}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {item.note && !item.price && (
          <div className="rounded-xl border border-dashed bg-muted/50 p-3 text-xs italic text-muted-foreground">
            {item.note}
          </div>
        )}
      </div>
    </>
  );
}

function DrawerAddRow({
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
        onClick={onAdd}
        className={`flex items-center justify-between gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
          isGhee
            ? "border border-secondary/50 bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground"
            : "bg-gradient-hero text-primary-foreground shadow-soft hover:shadow-glow"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> {label}
        </span>
        <span>₹{price}</span>
      </button>
    );
  }
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-full px-2 py-1.5 text-sm font-semibold ${
        isGhee
          ? "border border-secondary/50 bg-secondary/15 text-secondary"
          : "bg-gradient-hero text-primary-foreground shadow-soft"
      }`}
    >
      <button
        onClick={onDec}
        aria-label="Decrease"
        className="grid h-8 w-8 place-items-center rounded-full bg-background/20 transition hover:bg-background/40 active:scale-90"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="text-center">
        <span className="font-bold">{qty}× </span>
        <span className="opacity-90">{label}</span>
        <span className="ml-2 opacity-80">₹{price * qty}</span>
      </span>
      <button
        onClick={onInc}
        aria-label="Increase"
        className="grid h-8 w-8 place-items-center rounded-full bg-background/20 transition hover:bg-background/40 active:scale-90"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
