export type Category = "Wedding" | "Casual" | "Gift" | "Preserved";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number; // MYR
  category: Category;
  description: string;
  imageUrl: string;
  featured: boolean;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Eternal Rose Bridal Bouquet",
    slug: "eternal-rose-bridal-bouquet",
    price: 280,
    category: "Wedding",
    description:
      "A breathtaking cascade of fresh white and blush roses, interspersed with delicate baby's breath and eucalyptus. Designed to complement any bridal gown, this bouquet is the centrepiece of your most cherished day. Each stem is hand-selected for peak bloom.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 10,
  },
  {
    id: "2",
    name: "Rosy Rendezvous",
    slug: "rosy-rendezvous",
    price: 95,
    category: "Casual",
    description:
      "A cheerful hand-tied bunch of garden roses in warm coral and peachy tones. Perfect for a spontaneous date night, a housewarming, or simply because you deserve flowers. Wrapped in kraft paper and tied with a satin ribbon.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 20,
  },
  {
    id: "3",
    name: "Golden Celebration Box",
    slug: "golden-celebration-box",
    price: 160,
    category: "Gift",
    description:
      "An elegant bloom box brimming with sunflowers, yellow tulips, and chamomile daisies. The golden palette radiates warmth and joy — ideal for birthdays, anniversaries, promotions, or any milestone worth celebrating.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 15,
  },
  {
    id: "4",
    name: "Dusty Mauve Preserved Arrangement",
    slug: "dusty-mauve-preserved-arrangement",
    price: 220,
    category: "Preserved",
    description:
      "Timeless beauty that lasts for months. A curated selection of preserved roses, dried bunny tails, and pampas grass in muted mauve and sage tones. Housed in a ceramic pot, this arrangement requires zero maintenance while keeping your space looking effortlessly chic.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 8,
  },
  {
    id: "5",
    name: "Blushing Peonies Bundle",
    slug: "blushing-peonies-bundle",
    price: 130,
    category: "Casual",
    description:
      "Lush, full-bloom peonies in the softest blush pink, bundled together with sprigs of wax flower and maidenhair fern. Their heady fragrance fills any room instantly. Best enjoyed fresh within the first week of delivery.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 12,
  },
  {
    id: "6",
    name: "Love Letter Arrangement",
    slug: "love-letter-arrangement",
    price: 185,
    category: "Gift",
    description:
      "A romantic composition of deep red roses, wine-toned ranunculus, and burgundy dahlias arranged in a vintage-style vase. Include a personalised handwritten note card to make your feelings felt long before words are spoken.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 10,
  },
  {
    id: "7",
    name: "Sakura Dream Wreath",
    slug: "sakura-dream-wreath",
    price: 200,
    category: "Preserved",
    description:
      "Inspired by the fleeting beauty of Japanese cherry blossoms, this wall wreath combines preserved pink sakura branches, dried lavender, and white cotton stems on a willow base. A poetic accent piece for any home.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 6,
  },
  {
    id: "8",
    name: "Champagne Toast Bridal Wrist",
    slug: "champagne-toast-bridal-wrist",
    price: 75,
    category: "Wedding",
    description:
      "A delicate wrist corsage featuring miniature cream spray roses, white lisianthus buds, and pearl pin accents. Designed to complement the bridal party's ensemble, secured comfortably with an adjustable satin band.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 18,
  },
];

export const categories: Category[] = ["Wedding", "Casual", "Gift", "Preserved"];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
