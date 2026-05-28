import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { allItems, type MenuItem } from "@/data/menu";
import { SpiceMeter } from "@/components/DishBadges";

const exts = ["jpg", "jpeg", "png", "webp"];

export function ChefsPickSpotlight({ onOpenItem }: { onOpenItem: (item: MenuItem) => void }) {
  const picks = allItems.filter((i) => i.chefPick);
  const trackRef = useRef<HTMLDivElement>(null);

  if (picks.length === 0) return null;

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  // gentle auto-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    let paused = false;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("touchstart", onEnter, { passive: true });
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused) {
        el.scrollLeft += (dt / 1000) * 18;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchstart", onEnter);
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-5 flex items-end justify-between gap-3"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-hero px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-soft">
            <ChefHat className="h-3 w-3" /> Chef's Picks
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Today's Must-Try
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hand-picked favourites from our kitchen.
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="grid h-9 w-9 place-items-center rounded-full border bg-card text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="grid h-9 w-9 place-items-center rounded-full border bg-card text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {picks.map((item, i) => (
          <SpotlightCard key={item.slug} item={item} index={i} onOpen={() => onOpenItem(item)} />
        ))}
      </div>
    </section>
  );
}

function SpotlightCard({
  item,
  index,
  onOpen,
}: {
  item: MenuItem;
  index: number;
  onOpen: () => void;
}) {
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = `/menu-images/${item.slug}.${exts[extIdx]}`;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      whileHover={{ y: -4 }}
      className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl border bg-card text-left shadow-soft transition-shadow hover:shadow-glow sm:w-[60%] md:w-[44%] lg:w-[32%]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
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
            <Leaf className="h-12 w-12 text-primary-deep/60 animate-float-slow" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-hero px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-soft">
          <ChefHat className="h-3 w-3" /> Chef's Pick
        </span>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-primary-foreground">
          <div>
            <h3 className="text-lg font-bold leading-tight drop-shadow sm:text-xl">{item.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <SpiceMeter level={item.spice} />
              {item.price !== undefined && (
                <span className="text-sm font-semibold opacity-95">₹{item.price}</span>
              )}
            </div>
          </div>
          <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-bold text-primary-deep opacity-0 transition-opacity group-hover:opacity-100">
            View →
          </span>
        </div>
      </div>
      {item.description && (
        <p className="line-clamp-2 px-4 py-3 text-xs text-muted-foreground">{item.description}</p>
      )}
    </motion.button>
  );
}
