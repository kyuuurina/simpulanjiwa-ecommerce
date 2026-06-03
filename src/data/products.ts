export type Category = "Bestsellers" | "Convocation" | "Father's Day" | "Budget";
export type FlowerTag = "Rose" | "Lily" | "Daisy";

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
  category: Category;
  tags: FlowerTag[]; // hidden — used for internal filtering
  description: string;
  imageUrl: string;
  featured: boolean;
  stock: number;
}

const DEFAULT_PRICES: SizePrices = { S: 109, M: 129, L: 159, XK: 179 };

export const products: Product[] = [
  // ── Bestsellers ────────────────────────────────────────────────────────────
  {
    id: "1",
    name: "Blush Petals",
    slug: "blush-petals",
    sizePrices: { ...DEFAULT_PRICES },
    category: "Bestsellers",
    tags: ["Rose"],
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
    category: "Bestsellers",
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
    category: "Bestsellers",
    tags: ["Daisy", "Rose"],
    description:
      "A joyful explosion of colour, Candyland brings together cheerful blooms in shades of pink, yellow, cream, and white to create a bouquet that feels like happiness wrapped in flowers. Featuring vibrant gerberas, sweet roses, delicate carnations, playful chrysanthemums, and dainty chamomile, every stem adds a touch of whimsy and charm.",
    imageUrl: "/images/candyland.png",
    featured: true,
    stock: 10,
  },
  {
    id: "4",
    name: "Strawberry Matcha",
    slug: "strawberry-matcha",
    sizePrices: { S: 99, M: 129, L: 169, XK: 189 },
    category: "Bestsellers",
    tags: ["Rose", "Daisy"],
    description:
      "Inspired by the beloved drink, Strawberry Matcha blends sweet blush pinks with refreshing shades of green to create a bouquet that feels both playful and comforting. Soft roses, cheerful gerberas, delicate chrysanthemums, and dainty fillers come together in a color palette reminiscent of fresh strawberries swirled into creamy matcha.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 10,
  },
  {
    id: "5",
    name: "Wild Lily",
    slug: "wild-lily",
    sizePrices: { S: 109, M: 139, L: 169, XK: 199 },
    category: "Bestsellers",
    tags: ["Lily"],
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
    category: "Bestsellers",
    tags: ["Rose"],
    description:
      "Soft as a secret and elegant as a handwritten love letter, Velvet Whisper is a bouquet that speaks through gentle beauty. Featuring blush roses, delicate carnations, romantic chrysanthemums, and airy fillers, this arrangement is wrapped in rich velvet-red tones that add depth and sophistication to every bloom.",
    imageUrl: "/images/velvet-whisper.png",
    featured: true,
    stock: 10,
  },

  // ── Convocation ────────────────────────────────────────────────────────────
  {
    id: "7",
    name: "Convocation Bloom Box",
    slug: "convocation-bloom-box",
    sizePrices: { ...DEFAULT_PRICES },
    category: "Convocation",
    tags: ["Lily", "Daisy"],
    description:
      "Celebrate your graduate's big day with an elegant bloom box of white lilies, cheerful daisies, and lush greenery. A keepsake arrangement worthy of the milestone.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 15,
  },
  {
    id: "8",
    name: "Scholar's Pride Bouquet",
    slug: "scholars-pride-bouquet",
    sizePrices: { ...DEFAULT_PRICES },
    category: "Convocation",
    tags: ["Rose", "Lily"],
    description:
      "A grand celebration bouquet of premium roses and lilies in crisp white and gold tones. The go-to choice for convocation ceremonies — bold, beautiful, and photo-ready.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 8,
  },

  // ── Father's Day ───────────────────────────────────────────────────────────
  {
    id: "9",
    name: "Dad's Day Daisy Bundle",
    slug: "dads-day-daisy-bundle",
    sizePrices: { ...DEFAULT_PRICES },
    category: "Father's Day",
    tags: ["Daisy"],
    description:
      "A warm, cheerful bundle of sunflowers and daisies in earthy tones — strong and bright, just like Dad. Simple, heartfelt, and unforgettable.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 12,
  },
  {
    id: "10",
    name: "For the Man of the House",
    slug: "man-of-the-house",
    sizePrices: { ...DEFAULT_PRICES },
    category: "Father's Day",
    tags: ["Lily"],
    description:
      "A refined arrangement of stargazer lilies and greenery in deep, rich tones. Because Dad deserves flowers too — and this one says it all without saying a word.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 10,
  },

  // ── Budget ─────────────────────────────────────────────────────────────────
  {
    id: "11",
    name: "Rosy Rendezvous",
    slug: "rosy-rendezvous",
    sizePrices: { ...DEFAULT_PRICES },
    category: "Budget",
    tags: ["Rose"],
    description:
      "A cheerful hand-tied bunch of garden roses in warm coral and peachy tones. Perfect for a spontaneous gift or simply because you deserve flowers. Wrapped in kraft paper and tied with a satin ribbon.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 20,
  },
  {
    id: "12",
    name: "Sweet Little Posy",
    slug: "sweet-little-posy",
    sizePrices: { ...DEFAULT_PRICES },
    category: "Budget",
    tags: ["Daisy"],
    description:
      "A petite and pretty posy of mixed daisies and seasonal blooms. Big on charm, easy on the wallet. Perfect for a small gesture that means a lot.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 25,
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
