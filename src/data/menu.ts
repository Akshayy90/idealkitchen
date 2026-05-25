export type MenuItem = {
  name: string;
  slug: string;
  price?: number;
  priceGhee?: number;
  note?: string;
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
      { name: "Idly", slug: "idly", price: 60 },
      { name: "Ghee Podi Idly (2pc)", slug: "ghee-podi-idly", price: 75 },
      { name: "Mysore Bonda", slug: "mysore-bonda", price: 70 },
      { name: "Wada", slug: "wada", price: 70 },
      { name: "Idly (2pc) Ada (1pc)", slug: "idly-ada", price: 80 },
      { name: "Sambar Idly (2pc)", slug: "sambar-idly", price: 70 },
      { name: "Sambar Wada (2pc)", slug: "sambar-wada", price: 75 },
      { name: "Sambar Idly (2pc), Wada (1pc)", slug: "sambar-idly-wada", note: "Ask staff" },
      { name: "Kesaribath", slug: "kesaribath", price: 55 },
      { name: "Karabath", slug: "karabath", price: 55 },
      { name: "Ghee Pongal", slug: "ghee-pongal", price: 90 },
      { name: "Ponganalu (6 Pc)", slug: "ponganalu", price: 80 },
      { name: "Poori (2 Pc)", slug: "poori", price: 70 },
      { name: "Uggani & Bajji", slug: "uggani-bajji", price: 85 },
    ],
  },
  {
    id: "dosa",
    title: "Dosa Varieties",
    subtitle: "Crispy, golden, made-to-order — Plain / with Ghee",
    items: [
      { name: "Plain Dosa", slug: "plain-dosa", price: 70, priceGhee: 85 },
      { name: "Karam Dosa", slug: "karam-dosa", price: 80, priceGhee: 95 },
      { name: "Masala Dosa", slug: "masala-dosa", price: 85, priceGhee: 100 },
      { name: "Podi Dosa", slug: "podi-dosa", price: 90, priceGhee: 105 },
      { name: "Onion Dosa", slug: "onion-dosa", price: 95, priceGhee: 115 },
      { name: "Upma Dosa", slug: "upma-dosa", price: 95, priceGhee: 115 },
      { name: "Set Dosa", slug: "set-dosa", price: 95, priceGhee: 115 },
      { name: "Uthappam", slug: "uthappam", price: 100, priceGhee: 120 },
      { name: "Aakukoora Dosa", slug: "aakukoora-dosa", price: 105, priceGhee: 125 },
      { name: "Pesarattu", slug: "pesarattu", price: 80, priceGhee: 100 },
      { name: "Upma Pesarattu", slug: "upma-pesarattu", price: 100, priceGhee: 120 },
      { name: "Onion Pesarattu", slug: "onion-pesarattu", price: 100, priceGhee: 120 },
      { name: "Korra Dosa", slug: "korra-dosa", price: 100, priceGhee: 120 },
      { name: "Raagi Dosa", slug: "raagi-dosa", price: 100, priceGhee: 120 },
      { name: "Beetroot Dosa", slug: "beetroot-dosa", price: 100 },
      { name: "Beetroot Paneer Dosa", slug: "beetroot-paneer-dosa", price: 120 },
      { name: "Parota", slug: "parota", price: 120 },
    ],
  },
  {
    id: "evening",
    title: "Evening Only",
    subtitle: "Available after 4:00 PM",
    badge: "Evening",
    items: [
      { name: "Punugulu (8 Pcs)", slug: "punugulu", price: 60 },
      { name: "Mirchi (4 pc)", slug: "mirchi", price: 60 },
      { name: "Cut Mirchi", slug: "cut-mirchi", price: 70 },
      { name: "Alasanda Wada (4 pc)", slug: "alasanda-wada", price: 70 },
      { name: "Bellem Payasam", slug: "bellem-payasam", price: 70 },
    ],
  },
  {
    id: "weekend",
    title: "Saturday & Sunday Special",
    subtitle: "Weekend treat from our kitchen",
    badge: "Weekend",
    items: [
      { name: "Bellam Payasam", slug: "bellam-payasam", price: 60 },
    ],
  },
  {
    id: "kids",
    title: "Kids Special",
    subtitle: "Sweet picks the little ones love",
    badge: "Kids",
    items: [
      { name: "Chocolate Dosa", slug: "chocolate-dosa", price: 99 },
      { name: "Chocolate Idly (2 pcs)", slug: "chocolate-idly", price: 60 },
    ],
  },
  {
    id: "combos",
    title: "Combo Meals",
    subtitle: "Mix & match favourites — Parcel charges extra ₹5",
    badge: "Combo",
    items: [
      { name: "Single Combo", slug: "single-combo", price: 89 },
      { name: "Two Combo", slug: "two-combo", price: 109 },
      { name: "Three Combo", slug: "three-combo", price: 129 },
    ],
  },
];
