import { createFileRoute } from "@tanstack/react-router";
import { MenuApp } from "@/components/MenuApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ideal Kitchen — Pure Veg South Indian Menu" },
      {
        name: "description",
        content:
          "Scan, browse and order from Ideal Kitchen's pure vegetarian South Indian menu — dosas, idlies, tiffins, kids specials and combos.",
      },
      { property: "og:title", content: "Ideal Kitchen — Pure Veg Menu" },
      {
        property: "og:description",
        content:
          "Authentic South Indian, freshly made. Browse our full QR menu of dosas, idlies, tiffins and more.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <MenuApp />;
}
