import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2, Sparkles, Check, ChefHat } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export function CartWidget() {
  const { items, count, total, orderId, setQty, remove, clear, open, setOpen } = useCart();
  const [showCounter, setShowCounter] = useState(false);

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            key="fab"
            type="button"
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 40 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full bg-gradient-hero px-5 py-3 text-primary-foreground shadow-glow transition-transform hover:scale-105 active:scale-95 sm:bottom-8 sm:right-8"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              <motion.span
                key={count}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground shadow"
              >
                {count}
              </motion.span>
            </div>
            <span className="text-sm font-bold">View Order</span>
            <span className="rounded-full bg-background/20 px-2 py-0.5 text-xs font-semibold">
              ₹{total}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="ovl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setOpen(false);
                setShowCounter(false);
              }}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              key="sheet"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-background shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b bg-gradient-hero px-5 py-4 text-primary-foreground">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                    <ChefHat className="h-4 w-4" /> Your Order
                  </div>
                  <div className="text-xs text-primary-foreground/80">
                    {count} item{count !== 1 ? "s" : ""} · ₹{total}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    setShowCounter(false);
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full bg-background/15 transition hover:bg-background/30"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              {!showCounter ? (
                <>
                  <div className="flex-1 overflow-y-auto px-4 py-4">
                    {items.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                        <ShoppingBag className="h-12 w-12 opacity-40" />
                        <p className="text-sm">Your order is empty.</p>
                        <p className="text-xs">Tap “Add” on any item to build your order.</p>
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {items.map((it) => (
                          <motion.li
                            key={it.key}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            className="flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-soft"
                          >
                            <img
                              src={`/menu-images/${it.slug}.jpg`}
                              alt={it.name}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                              }}
                              className="h-14 w-14 shrink-0 rounded-xl object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-foreground">
                                {it.name}
                              </div>
                              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                                {it.variant ? it.variant : "regular"} · ₹{it.price}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 rounded-full border bg-background px-1 py-1">
                              <button
                                onClick={() => setQty(it.key, it.qty - 1)}
                                className="grid h-7 w-7 place-items-center rounded-full text-primary transition hover:bg-muted"
                                aria-label="Decrease"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-5 text-center text-sm font-bold">{it.qty}</span>
                              <button
                                onClick={() => setQty(it.key, it.qty + 1)}
                                className="grid h-7 w-7 place-items-center rounded-full text-primary transition hover:bg-muted"
                                aria-label="Increase"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => remove(it.key)}
                              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                              aria-label="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t bg-card/60 px-5 py-4 backdrop-blur">
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-base font-bold text-foreground">₹{total}</span>
                    </div>
                    <p className="mb-3 text-[11px] text-muted-foreground">
                      This is a demo order — show the next screen at the counter to place it.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={clear}
                        disabled={items.length === 0}
                        className="rounded-full border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition hover:bg-muted disabled:opacity-40"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setShowCounter(true)}
                        disabled={items.length === 0}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-hero px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:shadow-glow active:scale-[0.98] disabled:opacity-40"
                      >
                        <Sparkles className="h-4 w-4" />
                        Show at Counter
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <CounterView
                  orderId={orderId}
                  total={total}
                  items={items}
                  onBack={() => setShowCounter(false)}
                  onDone={() => {
                    clear();
                    setShowCounter(false);
                    setOpen(false);
                  }}
                />
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function CounterView({
  orderId,
  total,
  items,
  onBack,
  onDone,
}: {
  orderId: string;
  total: number;
  items: ReturnType<typeof useCart>["items"];
  onBack: () => void;
  onDone: () => void;
}) {
  const now = new Date();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-1 flex-col"
    >
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="rounded-3xl border-2 border-dashed border-primary/40 bg-gradient-leaf p-5 text-center shadow-soft">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary-deep/70">
            Show this to the counter
          </div>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="mt-2 text-4xl font-extrabold tracking-tight text-primary-deep sm:text-5xl"
          >
            {orderId}
          </motion.div>
          <div className="mt-1 text-xs text-muted-foreground">
            {now.toLocaleString()} · {items.reduce((s, i) => s + i.qty, 0)} items · ₹{total}
          </div>
        </div>

        <ul className="mt-5 divide-y rounded-2xl border bg-card">
          {items.map((it) => (
            <li key={it.key} className="flex items-center gap-3 px-4 py-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {it.qty}×
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground">{it.name}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {it.variant ?? "regular"}
                </div>
              </div>
              <div className="text-sm font-bold text-primary-deep">₹{it.qty * it.price}</div>
            </li>
          ))}
          <li className="flex items-center justify-between bg-muted/40 px-4 py-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Total
            </span>
            <span className="text-lg font-extrabold text-primary-deep">₹{total}</span>
          </li>
        </ul>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Demo order · Saved on this device so you can come back to it.
        </p>
      </div>

      <div className="flex gap-2 border-t bg-card/60 px-5 py-4 backdrop-blur">
        <button
          onClick={onBack}
          className="rounded-full border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition hover:bg-muted"
        >
          Back
        </button>
        <button
          onClick={onDone}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-hero px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-soft transition hover:shadow-glow active:scale-[0.98]"
        >
          <Check className="h-4 w-4" />
          Done — start new order
        </button>
      </div>
    </motion.div>
  );
}
