export type ShopCategory = "women" | "men" | "kids" | "others";

export type EcoTag =
  | "MadeInAfrica"
  | "SmallBatch"
  | "ArtisanMade"
  | "Recycled"
  | "Organic"
  | "Deadstock";

export interface BrandMock {
  id: string;
  name: string;
  origin: string;
  tagline: string;
}

export interface ProductMock {
  id: string;
  name: string;
  slug: string;
  category: ShopCategory;
  price: number;
  currency: "NGN" | "GHS" | "KES" | "ZAR" | "USD";
  compareAtPrice?: number;
  brand: BrandMock;
  imageUrl: string;
  secondaryImageUrl?: string;
  ecoTags: EcoTag[];
  caption: string;
  isNew?: boolean;
}

export const BRANDS: BrandMock[] = [
  {
    id: "adire_atelier",
    name: "Adire Atelier",
    origin: "Abeokuta, NG",
    tagline: "Indigo stories. Modern silhouettes.",
  },
  {
    id: "kente_studio",
    name: "Kente Studio",
    origin: "Kumasi, GH",
    tagline: "Heritage woven into everyday drip.",
  },
  {
    id: "sahara_street",
    name: "Sahara Street",
    origin: "Nairobi, KE",
    tagline: "Streetwear with sun-baked confidence.",
  },
  {
    id: "cape_couture",
    name: "Cape Couture",
    origin: "Cape Town, ZA",
    tagline: "Minimal. Sculpted. Effortless.",
  },
];

const placeholder = "/placeholder.svg";
const demo = {
  hero: "/demo/ankara-dress.svg",
  ankaraDress: "/demo/ankara-dress.svg",
  adireWrapTop: "/demo/adire-wrap-top.svg",
  kenteShirt: "/demo/kente-panel-shirt.svg",
  streetCargo: "/demo/street-cargo.svg",
  kidsDashiki: "/demo/kids-dashiki-set.svg",
  earrings: "/demo/beaded-earrings.svg",
  linenCoord: "/demo/linen-coord.svg",
  headwrap: "/demo/headwrap.svg",
};

export const PRODUCTS: ProductMock[] = [
  {
    id: "p1",
    name: "Ankara Bodycon Midi Dress",
    slug: "ankara-bodycon-midi-dress",
    category: "women",
    price: 28500,
    currency: "NGN",
    compareAtPrice: 35000,
    brand: BRANDS[0],
    imageUrl: demo.ankaraDress,
    secondaryImageUrl: demo.adireWrapTop,
    ecoTags: ["SmallBatch", "MadeInAfrica"],
    caption: "Bold print, clean lines — made for night outs in Lagos.",
    isNew: true,
  },
  {
    id: "p2",
    name: "Adire Wrap Top (Indigo)",
    slug: "adire-wrap-top-indigo",
    category: "women",
    price: 19000,
    currency: "NGN",
    brand: BRANDS[0],
    imageUrl: demo.adireWrapTop,
    secondaryImageUrl: demo.ankaraDress,
    ecoTags: ["ArtisanMade", "MadeInAfrica"],
    caption: "Hand-dyed indigo energy. Pair with denim or a maxi skirt.",
    isNew: true,
  },
  {
    id: "p3",
    name: "Kente Panel Shirt",
    slug: "kente-panel-shirt",
    category: "men",
    price: 320,
    currency: "GHS",
    brand: BRANDS[1],
    imageUrl: demo.kenteShirt,
    secondaryImageUrl: demo.streetCargo,
    ecoTags: ["MadeInAfrica", "SmallBatch"],
    caption: "Classic fit with a heritage pop — office to weekend.",
    isNew: true,
  },
  {
    id: "p4",
    name: "Sahara Street Utility Cargo",
    slug: "sahara-street-utility-cargo",
    category: "men",
    price: 5400,
    currency: "KES",
    brand: BRANDS[2],
    imageUrl: demo.streetCargo,
    secondaryImageUrl: demo.kenteShirt,
    ecoTags: ["Recycled"],
    caption: "Heavy rotation piece. Built to move, built to last.",
  },
  {
    id: "p5",
    name: "Kids Dashiki Set (2pc)",
    slug: "kids-dashiki-set-2pc",
    category: "kids",
    price: 18000,
    currency: "NGN",
    brand: BRANDS[0],
    imageUrl: demo.kidsDashiki,
    secondaryImageUrl: demo.kidsDashiki,
    ecoTags: ["MadeInAfrica", "SmallBatch"],
    caption: "Play-ready comfort with culture in every stitch.",
    isNew: true,
  },
  {
    id: "p6",
    name: "Beaded Statement Earrings",
    slug: "beaded-statement-earrings",
    category: "others",
    price: 95,
    currency: "GHS",
    brand: BRANDS[1],
    imageUrl: demo.earrings,
    secondaryImageUrl: demo.earrings,
    ecoTags: ["ArtisanMade", "SmallBatch"],
    caption: "Bright beads, big mood — finish the look instantly.",
  },
  {
    id: "p7",
    name: "Cape Couture Linen Co-ord",
    slug: "cape-couture-linen-co-ord",
    category: "women",
    price: 1299,
    currency: "ZAR",
    brand: BRANDS[3],
    imageUrl: demo.linenCoord,
    secondaryImageUrl: demo.linenCoord,
    ecoTags: ["Organic"],
    caption: "Soft linen with a sculpted fit — day parties approved.",
  },
  {
    id: "p8",
    name: "Afro-Print Headwrap",
    slug: "afro-print-headwrap",
    category: "others",
    price: 7500,
    currency: "NGN",
    brand: BRANDS[0],
    imageUrl: demo.headwrap,
    secondaryImageUrl: demo.headwrap,
    ecoTags: ["Deadstock", "SmallBatch"],
    caption: "Wrap it. Own it. Elevate any outfit in seconds.",
    isNew: true,
  },
];

export function getCategoryTitle(category: ShopCategory): string {
  switch (category) {
    case "women":
      return "Women";
    case "men":
      return "Men";
    case "kids":
      return "Kids";
    case "others":
      return "Others";
  }
}

export function formatMoney(amount: number, currency: ProductMock["currency"]): string {
  const symbol =
    currency === "NGN"
      ? "₦"
      : currency === "GHS"
        ? "GH₵"
        : currency === "KES"
          ? "KSh"
          : currency === "ZAR"
            ? "R"
            : "$";
  return `${symbol}${amount.toLocaleString()}`;
}

export const SHOP_DEMO = { ...demo, placeholder };

