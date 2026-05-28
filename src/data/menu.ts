export type DishBadge =
  | "spicy"
  | "sweet"
  | "crispy"
  | "kids"
  | "healthy"
  | "popular"
  | "chef"
  | "quick";

export type MenuItem = {
  name: string;
  slug: string;
  price?: number;
  priceGhee?: number;
  note?: string;
  description?: string;
  ingredients?: string[];
  badges?: DishBadge[];
  spice?: 0 | 1 | 2 | 3;
  pairWith?: string[]; // slugs
  chefPick?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "tiffins",
    title: "Tiffins & Specials",
    subtitle: "Traditional South Indian breakfast classics",
    items: [
      {
        name: "Idly",
        slug: "idly",
        price: 60,
        description:
          "Pillow-soft steamed rice cakes, served with fresh coconut chutney and warm sambar.",
        ingredients: ["Rice", "Urad dal", "Coconut chutney", "Sambar"],
        badges: ["healthy", "quick"],
        spice: 1,
        pairWith: ["ghee-pongal", "masala-dosa"],
      },
      {
        name: "Ghee Podi Idly (2pc)",
        slug: "ghee-podi-idly",
        price: 75,
        description:
          "Mini idlies tossed in aromatic gunpowder spice and pure ghee — a Telugu favourite.",
        ingredients: ["Idly", "Idly podi", "Pure ghee", "Curry leaves"],
        badges: ["spicy", "popular", "chef"],
        spice: 2,
        chefPick: true,
        pairWith: ["sambar-idly", "ghee-pongal"],
      },
      {
        name: "Mysore Bonda",
        slug: "mysore-bonda",
        price: 70,
        description:
          "Golden-fried fluffy lentil dumplings with a crackling crust and soft, airy centre.",
        ingredients: ["Urad dal", "Ginger", "Green chilli", "Curry leaves"],
        badges: ["crispy"],
        spice: 1,
      },
      {
        name: "Wada",
        slug: "wada",
        price: 70,
        description: "Crispy medu vada with a fluffy interior, served with chutney and sambar.",
        ingredients: ["Urad dal", "Black pepper", "Curry leaves"],
        badges: ["crispy"],
        spice: 1,
      },
      {
        name: "Idly (2pc) Ada (1pc)",
        slug: "idly-ada",
        price: 80,
        description: "Two soft idlies with one ada — the perfect light-yet-filling combo.",
        badges: ["healthy"],
        spice: 1,
      },
      {
        name: "Sambar Idly (2pc)",
        slug: "sambar-idly",
        price: 70,
        description: "Soft idlies soaked in warm, tangy sambar — comfort in a bowl.",
        badges: ["popular"],
        spice: 1,
      },
      {
        name: "Sambar Wada (2pc)",
        slug: "sambar-wada",
        price: 75,
        description: "Crisp vadas drowned in spiced sambar — soft, soaked and irresistible.",
        badges: ["popular"],
        spice: 2,
      },
      {
        name: "Sambar Idly (2pc), Wada (1pc)",
        slug: "sambar-idly-wada",
        note: "Ask staff",
        description: "Best of both worlds — soft idlies and a crisp vada in hot sambar.",
      },
      {
        name: "Kesaribath",
        slug: "kesaribath",
        price: 55,
        description: "Saffron-kissed sweet semolina, rich with ghee, cashews and raisins.",
        ingredients: ["Semolina", "Ghee", "Sugar", "Cashew", "Raisin", "Saffron"],
        badges: ["sweet", "kids"],
        spice: 0,
      },
      {
        name: "Karabath",
        slug: "karabath",
        price: 55,
        description: "Savoury Karnataka-style upma with vegetables, mustard and curry leaves.",
        badges: ["quick"],
        spice: 1,
      },
      {
        name: "Ghee Pongal",
        slug: "ghee-pongal",
        price: 90,
        description:
          "Rice and moong dal slow-cooked with pepper, cumin and a generous swirl of ghee.",
        ingredients: ["Rice", "Moong dal", "Pepper", "Cumin", "Ghee", "Cashew"],
        badges: ["chef", "healthy"],
        spice: 1,
        chefPick: true,
        pairWith: ["wada", "ghee-podi-idly"],
      },
      {
        name: "Ponganalu (6 Pc)",
        slug: "ponganalu",
        price: 80,
        description: "Pan-fried lentil dumplings — crisp outside, melt-in-mouth inside.",
        badges: ["crispy"],
        spice: 1,
      },
      {
        name: "Poori (2 Pc)",
        slug: "poori",
        price: 70,
        description: "Puffed golden pooris served hot with a flavourful potato curry.",
        badges: ["kids"],
        spice: 1,
      },
      {
        name: "Uggani & Bajji",
        slug: "uggani-bajji",
        price: 85,
        description:
          "Rayalaseema-style spiced puffed rice paired with hot mirchi bajji and a wedge of lime.",
        badges: ["spicy", "chef"],
        spice: 3,
        chefPick: true,
      },
    ],
  },
  {
    id: "dosa",
    title: "Dosa Varieties",
    subtitle: "Crispy, golden, made-to-order — Plain / with Ghee",
    items: [
      {
        name: "Plain Dosa",
        slug: "plain-dosa",
        price: 70,
        priceGhee: 85,
        description: "Paper-thin, lacy rice crepe — crisp, golden and timeless.",
        badges: ["crispy", "quick"],
        spice: 0,
        pairWith: ["sambar-idly"],
      },
      {
        name: "Karam Dosa",
        slug: "karam-dosa",
        price: 80,
        priceGhee: 95,
        description: "Crisp dosa smeared with fiery red karam chutney — bold and addictive.",
        badges: ["spicy", "popular"],
        spice: 3,
      },
      {
        name: "Masala Dosa",
        slug: "masala-dosa",
        price: 85,
        priceGhee: 100,
        description:
          "Classic crisp dosa wrapped around a spiced potato masala — a south-Indian icon.",
        badges: ["popular", "chef"],
        spice: 2,
        chefPick: true,
      },
      {
        name: "Podi Dosa",
        slug: "podi-dosa",
        price: 90,
        priceGhee: 105,
        description: "Dosa brushed with aromatic gunpowder and ghee — every bite is flavour-loaded.",
        badges: ["spicy"],
        spice: 2,
      },
      {
        name: "Onion Dosa",
        slug: "onion-dosa",
        price: 95,
        priceGhee: 115,
        description: "Crisp dosa topped with sweet sautéed onions and green chillies.",
        badges: ["crispy"],
        spice: 2,
      },
      {
        name: "Upma Dosa",
        slug: "upma-dosa",
        price: 95,
        priceGhee: 115,
        description: "Soft upma rolled into a hot dosa — a hearty two-in-one favourite.",
        spice: 1,
      },
      {
        name: "Set Dosa",
        slug: "set-dosa",
        price: 95,
        priceGhee: 115,
        description: "Three soft, spongy mini dosas — fluffy on the inside, lightly crisp outside.",
        badges: ["kids"],
        spice: 0,
      },
      {
        name: "Uthappam",
        slug: "uthappam",
        price: 100,
        priceGhee: 120,
        description: "Thick, fluffy dosa-pancake topped with onions, tomato and green chilli.",
        spice: 2,
      },
      {
        name: "Aakukoora Dosa",
        slug: "aakukoora-dosa",
        price: 105,
        priceGhee: 125,
        description: "Leafy-greens dosa — earthy, wholesome and packed with goodness.",
        badges: ["healthy"],
        spice: 1,
      },
      {
        name: "Pesarattu",
        slug: "pesarattu",
        price: 80,
        priceGhee: 100,
        description: "Andhra-style green-gram dosa — protein-rich and pleasantly tangy.",
        badges: ["healthy", "chef"],
        spice: 1,
        chefPick: true,
        pairWith: ["ghee-pongal"],
      },
      {
        name: "Upma Pesarattu",
        slug: "upma-pesarattu",
        price: 100,
        priceGhee: 120,
        description: "Pesarattu hugging a soft upma centre — Andhra classic comfort.",
        badges: ["healthy"],
        spice: 1,
      },
      {
        name: "Onion Pesarattu",
        slug: "onion-pesarattu",
        price: 100,
        priceGhee: 120,
        description: "Green-gram dosa loaded with crunchy onions and ginger.",
        badges: ["healthy"],
        spice: 2,
      },
      {
        name: "Korra Dosa",
        slug: "korra-dosa",
        price: 100,
        priceGhee: 120,
        description: "Foxtail-millet dosa — light, nutty and gut-friendly.",
        badges: ["healthy"],
        spice: 1,
      },
      {
        name: "Raagi Dosa",
        slug: "raagi-dosa",
        price: 100,
        priceGhee: 120,
        description: "Finger-millet dosa — rich in fibre, naturally wholesome.",
        badges: ["healthy"],
        spice: 1,
      },
      {
        name: "Beetroot Dosa",
        slug: "beetroot-dosa",
        price: 100,
        description: "Vibrant ruby-pink dosa — naturally sweet from fresh beetroot.",
        badges: ["healthy", "kids"],
        spice: 1,
      },
      {
        name: "Beetroot Paneer Dosa",
        slug: "beetroot-paneer-dosa",
        price: 120,
        description: "Beetroot dosa stuffed with spiced paneer — colourful and indulgent.",
        badges: ["chef"],
        spice: 1,
        chefPick: true,
      },
      {
        name: "Parota",
        slug: "parota",
        price: 120,
        description: "Flaky, layered parota served with rich kurma.",
        spice: 2,
      },
    ],
  },
  {
    id: "evening",
    title: "Evening Only",
    subtitle: "Available after 4:00 PM",
    badge: "Evening",
    items: [
      {
        name: "Punugulu (8 Pcs)",
        slug: "punugulu",
        price: 60,
        description: "Crisp fried dumplings of fermented batter — Andhra tea-time staple.",
        badges: ["crispy", "popular"],
        spice: 1,
      },
      {
        name: "Mirchi (4 pc)",
        slug: "mirchi",
        price: 60,
        description: "Long mild green chillies dipped in besan and fried golden.",
        badges: ["spicy", "crispy"],
        spice: 3,
      },
      {
        name: "Cut Mirchi",
        slug: "cut-mirchi",
        price: 70,
        description: "Bajji mirchi tossed with onions, lime and chaat masala — sweet, sour, hot.",
        badges: ["spicy", "popular"],
        spice: 3,
      },
      {
        name: "Alasanda Wada (4 pc)",
        slug: "alasanda-wada",
        price: 70,
        description: "Crunchy black-eyed-pea fritters with curry leaves and ginger.",
        badges: ["crispy"],
        spice: 2,
      },
      {
        name: "Bellem Payasam",
        slug: "bellem-payasam",
        price: 70,
        description: "Jaggery-sweetened lentil payasam with cardamom and ghee — warm and soothing.",
        badges: ["sweet", "kids"],
        spice: 0,
      },
    ],
  },
  {
    id: "weekend",
    title: "Saturday & Sunday Special",
    subtitle: "Weekend treat from our kitchen",
    badge: "Weekend",
    items: [
      {
        name: "Bellam Payasam",
        slug: "bellam-payasam",
        price: 60,
        description: "Slow-cooked weekend payasam — jaggery, milk, cardamom and a touch of ghee.",
        badges: ["sweet", "chef"],
        spice: 0,
        chefPick: true,
      },
    ],
  },
  {
    id: "kids",
    title: "Kids Special",
    subtitle: "Sweet picks the little ones love",
    badge: "Kids",
    items: [
      {
        name: "Chocolate Dosa",
        slug: "chocolate-dosa",
        price: 99,
        description: "Crispy dosa lavished with melty chocolate — a kid-favourite treat.",
        badges: ["sweet", "kids", "popular"],
        spice: 0,
      },
      {
        name: "Chocolate Idly (2 pcs)",
        slug: "chocolate-idly",
        price: 60,
        description: "Soft idlies drizzled with rich chocolate sauce.",
        badges: ["sweet", "kids"],
        spice: 0,
      },
    ],
  },
  {
    id: "combos",
    title: "Combo Meals",
    subtitle: "Mix & match favourites — Parcel charges extra ₹5",
    badge: "Combo",
    items: [
      {
        name: "Single Combo",
        slug: "single-combo",
        price: 89,
        description: "Pick any one tiffin — light, quick and pocket-friendly.",
        badges: ["quick"],
      },
      {
        name: "Two Combo",
        slug: "two-combo",
        price: 109,
        description: "Two tiffin picks together — perfect for sharing or trying more.",
        badges: ["popular"],
      },
      {
        name: "Three Combo",
        slug: "three-combo",
        price: 129,
        description: "Three tiffins on one plate — the full Ideal Kitchen experience.",
        badges: ["chef", "popular"],
        chefPick: true,
      },
    ],
  },
];

// ---- Helpers ----
export const allItems: MenuItem[] = menu.flatMap((c) => c.items);

export function findItem(slug: string): MenuItem | undefined {
  return allItems.find((i) => i.slug === slug);
}

export const BADGE_META: Record<
  DishBadge,
  { label: string; emoji: string; tone: string }
> = {
  spicy: { label: "Spicy", emoji: "🌶️", tone: "bg-destructive/10 text-destructive border-destructive/30" },
  sweet: { label: "Sweet", emoji: "🍯", tone: "bg-secondary/15 text-secondary border-secondary/30" },
  crispy: { label: "Crispy", emoji: "🥡", tone: "bg-accent text-accent-foreground border-accent" },
  kids: { label: "Kids Fav", emoji: "👶", tone: "bg-primary/10 text-primary-deep border-primary/30" },
  healthy: { label: "Healthy", emoji: "💚", tone: "bg-primary/10 text-primary-deep border-primary/30" },
  popular: { label: "Popular", emoji: "🔥", tone: "bg-secondary/20 text-secondary border-secondary/40" },
  chef: { label: "Chef's Pick", emoji: "👨‍🍳", tone: "bg-gradient-hero text-primary-foreground border-transparent" },
  quick: { label: "Quick", emoji: "⏱️", tone: "bg-muted text-muted-foreground border-border" },
};
