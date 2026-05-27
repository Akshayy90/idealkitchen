import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  variant?: "plain" | "ghee";
  price: number;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  orderId: string;
  add: (i: Omit<CartItem, "qty" | "key"> & { variant?: "plain" | "ghee" }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (o: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

const STORAGE_KEY = "ideal-kitchen-cart-v1";
const ORDER_KEY = "ideal-kitchen-order-v1";

function genOrderId() {
  const t = Date.now().toString(36).slice(-4).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `IK-${t}-${r}`;
}

function keyOf(slug: string, variant?: string) {
  return variant ? `${slug}::${variant}` : slug;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      const o = localStorage.getItem(ORDER_KEY);
      setOrderId(o || genOrderId());
    } catch {
      setOrderId(genOrderId());
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    if (orderId) {
      try {
        localStorage.setItem(ORDER_KEY, orderId);
      } catch {}
    }
  }, [orderId]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      items,
      count,
      total,
      orderId,
      open,
      setOpen,
      add: (i) => {
        const key = keyOf(i.slug, i.variant);
        setItems((prev) => {
          const ex = prev.find((p) => p.key === key);
          if (ex) return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + 1 } : p));
          return [...prev, { ...i, key, qty: 1 }];
        });
      },
      remove: (key) => setItems((prev) => prev.filter((p) => p.key !== key)),
      setQty: (key, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((p) => p.key !== key) : prev.map((p) => (p.key === key ? { ...p, qty } : p)),
        ),
      clear: () => {
        setItems([]);
        const id = genOrderId();
        setOrderId(id);
      },
    };
  }, [items, orderId, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
