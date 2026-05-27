import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Leaf, MapPin, Phone, Clock, ChefHat, Sparkles, UtensilsCrossed } from "lucide-react";
import { menu } from "@/data/menu";
import { MenuItemCard } from "@/components/MenuItemCard";
import { CartProvider } from "@/hooks/useCart";
import { CartWidget } from "@/components/CartWidget";

export function MenuApp() {
  return (
    <CartProvider>
      <MenuAppInner />
      <CartWidget />
    </CartProvider>
  );
}

function MenuAppInner() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [activeId, setActiveId] = useState(menu[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    menu.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Sticky nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-hero text-primary-foreground shadow-soft">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold tracking-tight">
                <span className="text-primary">Ideal</span>{" "}
                <span className="text-secondary">Kitchen</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Pure Veg · QR Menu
              </div>
            </div>
          </a>
          <nav className="hidden gap-1 md:flex">
            {menu.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeId === c.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeId === c.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-hero shadow-soft"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {c.title.split(" ")[0]}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} id="top" className="relative overflow-hidden bg-gradient-leaf">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
          <Leaf className="absolute left-[10%] top-[15%] h-14 w-14 text-primary/30 animate-float-slow" />
          <Leaf
            className="absolute right-[12%] top-[60%] h-10 w-10 text-secondary/40 animate-float-slow"
            style={{ animationDelay: "1.5s" }}
          />
          <Sparkles className="absolute right-[20%] top-[20%] h-8 w-8 text-secondary/50 animate-spin-slow" />
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16 md:pb-28 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
              <span className="block h-2 w-2 rounded-full bg-primary animate-pulse" />
              100% Pure Vegetarian
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              <span className="text-primary">Ideal</span>{" "}
              <span className="text-secondary">Kitchen</span>
              <span className="block text-2xl font-medium text-muted-foreground sm:text-3xl md:mt-2">
                Authentic South Indian, freshly made.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Crispy dosas, fluffy idlies, and timeless tiffin classics — served hot from
              our kitchen to your table. Scan, browse, savour.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tiffins"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
              >
                <ChefHat className="h-4 w-4" />
                Explore the Menu
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#visit"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-card"
              >
                <MapPin className="h-4 w-4 text-primary" />
                Visit Us
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3 sm:gap-6"
            >
              {[
                { k: "40+", v: "Menu Items" },
                { k: "100%", v: "Pure Veg" },
                { k: "Daily", v: "Fresh Batter" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border bg-card/70 px-3 py-4 text-center backdrop-blur"
                >
                  <div className="text-xl font-bold text-primary-deep sm:text-2xl">{s.k}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {s.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <svg
          className="block h-12 w-full text-background sm:h-16"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,100 L0,100 Z"
          />
        </svg>
      </section>

      {/* Quick category chips (mobile) */}
      <div className="sticky top-[60px] z-40 -mt-1 border-b bg-background/90 backdrop-blur md:hidden">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {menu.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeId === c.id
                  ? "bg-gradient-hero text-primary-foreground shadow-soft"
                  : "border bg-card text-muted-foreground"
              }`}
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>

      {/* Menu sections */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {menu.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32 py-10 first:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-wrap items-end justify-between gap-4"
            >
              <div className="max-w-xl">
                {category.badge && (
                  <span className="inline-flex items-center rounded-full bg-secondary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary">
                    {category.badge}
                  </span>
                )}
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  {category.title}
                </h2>
                {category.subtitle && (
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    {category.subtitle}
                  </p>
                )}
              </div>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:block" />
              <div className="text-xs font-medium text-muted-foreground">
                {category.items.length} item{category.items.length !== 1 ? "s" : ""}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.items.map((item, i) => (
                <MenuItemCard key={item.slug} item={item} index={i} />
              ))}
            </div>
          </section>
        ))}

        {/* Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-secondary/30 bg-secondary/10 p-6 text-center sm:p-8"
        >
          <Sparkles className="mx-auto mb-3 h-6 w-6 text-secondary" />
          <p className="text-sm font-semibold text-foreground sm:text-base">
            Parcel Charges Extra ₹5 · Prices in Indian Rupees · Taxes as applicable
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Dosa items are priced as Plain / with Ghee.
          </p>
        </motion.div>
      </main>

      {/* Visit / footer */}
      <footer id="visit" className="relative mt-10 overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <Leaf className="absolute left-8 top-8 h-24 w-24 animate-float-slow" />
          <Leaf
            className="absolute right-10 bottom-10 h-32 w-32 animate-float-slow"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6" />
              <span className="text-xl font-bold">Ideal Kitchen</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-primary-foreground/80">
              A neighbourhood pure-veg kitchen serving the soul of South India,
              one fresh plate at a time.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="text-primary-foreground/90">
                Your restaurant address goes here
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4" />
              <span className="text-primary-foreground/90">+91 00000 00000</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4" />
              <span className="text-primary-foreground/90">7:00 AM – 10:30 PM, Daily</span>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-semibold uppercase tracking-wider text-primary-foreground/90">
              Order Tip
            </div>
            <p className="mt-3 text-primary-foreground/80">
              Show this screen to your server, or note your favourites and place the
              order at the counter.
            </p>
          </div>
        </div>
        <div className="relative border-t border-primary-foreground/20 px-4 py-4 text-center text-xs text-primary-foreground/70 sm:px-6">
          © {new Date().getFullYear()} Ideal Kitchen · Pure Veg ·
          Made with <Leaf className="mx-1 inline h-3 w-3" /> fresh ingredients
        </div>
      </footer>
    </div>
  );
}
