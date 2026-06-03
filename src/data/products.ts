export type Category = "Bestsellers" | "Convocation" | "Father's Day" | "Budget";
export type FlowerTag = "Rose" | "Lily" | "Daisy" | "Carnation" | "Chrysanthemum" | "Gerbera";

export interface SizePrices {
  S: number;
  M: number;
  L: number;
  XK: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sizePrices: SizePrices;
  categories: Category[]; // supports multiple — first is the primary/display category
  tags: FlowerTag[];      // hidden — used for search filtering
  description: string;
  imageUrl: string;
  featured: boolean;
  stock: number;
}

const DEFAULT_PRICES: SizePrices = { S: 109, M: 129, L: 159, XK: 179 };

export const products: Product[] = [
  {
    id: "1",
    name: "Blush Petals",
    slug: "blush-petals",
    sizePrices: { ...DEFAULT_PRICES },
    categories: ["Bestsellers", "Convocation"],
    tags: ["Rose", "Carnation", "Chrysanthemum"],
    description:
      "A delicate symphony of soft pink blooms, Blush Petals captures the warmth of sweet affection and heartfelt moments. Featuring elegant roses, charming carnations, and dainty chrysanthemums nestled among lush fillers, this arrangement radiates grace, tenderness, and timeless beauty.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 10,
  },
  {
    id: "2",
    name: "Sorry, I Love You",
    slug: "sorry-i-love-you",
    sizePrices: { S: 99, M: 159, L: 199, XK: 239 },
    categories: ["Bestsellers", "Father's Day"],
    tags: ["Rose"],
    description:
      "Some feelings are too big for words alone. Sorry, I Love You is a timeless arrangement of passionate red roses, paired with delicate baby's breath and wrapped in elegant black layers — a bouquet that speaks of regret, sincerity, devotion, and a love worth fighting for.",
    imageUrl: "/images/sorry-i-love-you.png",
    featured: true,
    stock: 10,
  },
  {
    id: "3",
    name: "Candyland",
    slug: "candyland",
    sizePrices: { S: 109, M: 139, L: 159, XK: 179 },
    categories: ["Bestsellers", "Convocation"],
    tags: ["Gerbera", "Rose", "Carnation", "Chrysanthemum"],
    description:
      "A joyful explosion of colour, Candyland brings together cheerful blooms in shades of pink, yellow, cream, and white to create a bouquet that feels like happiness wrapped in flowers. Featuring vibrant gerberas, sweet roses, delicate carnations, playful chrysanthemums, and dainty chamomile, every stem adds a touch of whimsy and charm.",
    imageUrl: "/images/Candyland.png",
    featured: true,
    stock: 10,
  },
  {
    id: "4",
    name: "Strawberry Matcha",
    slug: "strawberry-matcha",
    sizePrices: { S: 99, M: 129, L: 169, XK: 189 },
    categories: ["Bestsellers", "Budget"],
    tags: ["Rose", "Gerbera", "Chrysanthemum"],
    description:
      "Inspired by the beloved drink, Strawberry Matcha blends sweet blush pinks with refreshing shades of green to create a bouquet that feels both playful and comforting. Soft roses, cheerful gerberas, delicate chrysanthemums, and dainty fillers come together in a color palette reminiscent of fresh strawberries swirled into creamy matcha.",
    imageUrl: "/images/strawberry-matcha.png",
    featured: true,
    stock: 10,
  },
  {
    id: "5",
    name: "Wild Lily",
    slug: "wild-lily",
    sizePrices: { S: 109, M: 139, L: 169, XK: 199 },
    categories: ["Bestsellers", "Convocation"],
    tags: ["Lily", "Carnation", "Chrysanthemum"],
    description:
      "Bold, free-spirited, and effortlessly elegant, Wild Lily is a bouquet that celebrates beauty in its most natural form. Featuring striking pink lilies paired with soft carnations, delicate chrysanthemums, and fresh eucalyptus, this arrangement creates a stunning balance between grace and untamed charm.",
    imageUrl: "/images/wild-lily.png",
    featured: true,
    stock: 10,
  },
  {
    id: "6",
    name: "Velvet Whisper",
    slug: "velvet-whisper",
    sizePrices: { S: 109, M: 139, L: 159, XK: 189 },
    categories: ["Bestsellers", "Convocation"],
    tags: ["Rose", "Carnation", "Chrysanthemum"],
    description:
      "Soft as a secret and elegant as a handwritten love letter, Velvet Whisper is a bouquet that speaks through gentle beauty. Featuring blush roses, delicate carnations, romantic chrysanthemums, and airy fillers, this arrangement is wrapped in rich velvet-red tones that add depth and sophistication to every bloom.",
    imageUrl: "/images/velvet-whisper.png",
    featured: true,
    stock: 10,
  },
];

export const categories: Category[] = ["Bestsellers", "Convocation", "Father's Day", "Budget"];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
