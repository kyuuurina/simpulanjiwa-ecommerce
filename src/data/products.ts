export type Category = "Bestsellers" | "Convocation" | "Father's Day" | "Budget";
export type FlowerTag = "Rose" | "Lily" | "Daisy";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number; // MYR
  category: Category;
  tags: FlowerTag[]; // hidden — used for internal filtering
  description: string;
  imageUrl: string;
  featured: boolean;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Eternal Rose Bouquet",
    slug: "eternal-rose-bouquet",
    price: 280,
    category: "Bestsellers",
    tags: ["Rose"],
    description:
      "A breathtaking cascade of fresh white and blush roses, interspersed with delicate baby's breath and eucalyptus. One of our most-loved arrangements — hand-selected for peak bloom and wrapped to impress.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 10,
  },
  {
    id: "2",
    name: "Rosy Rendezvous",
    slug: "rosy-rendezvous",
    price: 95,
    category: "Budget",
    tags: ["Rose"],
    description:
      "A cheerful hand-tied bunch of garden roses in warm coral and peachy tones. Perfect for a spontaneous gift or simply because you deserve flowers. Wrapped in kraft paper and tied with a satin ribbon.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 20,
  },
  {
    id: "3",
    name: "Convocation Bloom Box",
    slug: "convocation-bloom-box",
    price: 160,
    category: "Convocation",
    tags: ["Lily", "Daisy"],
    description:
      "Celebrate your graduate's big day with an elegant bloom box of white lilies, cheerful daisies, and lush greenery. A keepsake arrangement worthy of the milestone.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 15,
  },
  {
    id: "4",
    name: "Scholar's Pride Bouquet",
    slug: "scholars-pride-bouquet",
    price: 220,
    category: "Convocation",
    tags: ["Rose", "Lily"],
    description:
      "A grand celebration bouquet of premium roses and lilies in crisp white and gold tones. The go-to choice for convocation ceremonies — bold, beautiful, and photo-ready.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: true,
    stock: 8,
  },
  {
    id: "5",
    name: "Dad's Day Daisy Bundle",
    slug: "dads-day-daisy-bundle",
    price: 130,
    category: "Father's Day",
    tags: ["Daisy"],
    description:
      "A warm, cheerful bundle of sunflowers and daisies in earthy tones — strong and bright, just like Dad. Simple, heartfelt, and unforgettable.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 12,
  },
  {
    id: "6",
    name: "For the Man of the House",
    slug: "man-of-the-house",
    price: 185,
    category: "Father's Day",
    tags: ["Lily"],
    description:
      "A refined arrangement of stargazer lilies and greenery in deep, rich tones. Because Dad deserves flowers too — and this one says it all without saying a word.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 10,
  },
  {
    id: "7",
    name: "Sweet Little Posy",
    slug: "sweet-little-posy",
    price: 55,
    category: "Budget",
    tags: ["Daisy"],
    description:
      "A petite and pretty posy of mixed daisies and seasonal blooms. Big on charm, easy on the wallet. Perfect for a small gesture that means a lot.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 25,
  },
  {
    id: "8",
    name: "Fan Favourite Wrap",
    slug: "fan-favourite-wrap",
    price: 120,
    category: "Bestsellers",
    tags: ["Rose", "Daisy"],
    description:
      "Our most-ordered hand wrap — a lush mix of roses and daisies in blush and cream, finished with our signature ribbon. A crowd-pleaser for any occasion.",
    imageUrl: "/images/simpulan-jiwa-studio.png",
    featured: false,
    stock: 18,
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
