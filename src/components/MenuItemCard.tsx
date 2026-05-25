import { motion } from "framer-motion";
import { useState } from "react";
import { Leaf } from "lucide-react";
import type { MenuItem } from "@/data/menu";

const exts = ["jpg", "jpeg", "png", "webp"];

export function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = `/menu-images/${item.slug}.${exts[extIdx]}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow hover:shadow-glow"
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

      <div className="flex items-start justify-between gap-3 p-4">
        <h3 className="text-base font-semibold leading-tight text-foreground sm:text-lg">
          {item.name}
        </h3>
        <div className="shrink-0 text-right">
          {item.price !== undefined && (
            <div className="text-base font-bold text-primary-deep sm:text-lg">
              ₹{item.price}
              {item.priceGhee !== undefined && (
                <span className="ml-1 text-xs font-medium text-muted-foreground">
                  / <span className="text-secondary">₹{item.priceGhee}</span>
                </span>
              )}
            </div>
          )}
          {item.priceGhee !== undefined && (
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              plain / ghee
            </div>
          )}
          {item.note && !item.price && (
            <div className="text-xs italic text-muted-foreground">{item.note}</div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
