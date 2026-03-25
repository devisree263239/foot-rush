export interface Product {
  id: number;
  name: string;
  category: "sneakers" | "boots" | "formal" | "sandals" | "heels";
  displayCategory: string;
  price: number;
  sizes: number[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  badge?: string;
  imageUrl: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sprint X Pro",
    category: "sneakers",
    displayCategory: "Running",
    price: 10999,
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.8,
    reviews: 142,
    description:
      "The Sprint X Pro is engineered for elite performance. Its lightweight frame and responsive cushioning make every stride feel effortless.",
    features: [
      "Responsive foam midsole",
      "Breathable mesh upper",
      "Reflective details",
      "Rubber outsole with grip zones",
    ],
    badge: "Best Seller",
    imageUrl: "/assets/generated/shoe-sprint-x-pro.dim_600x600.png",
  },
  {
    id: 2,
    name: "Rush Elite",
    category: "sneakers",
    displayCategory: "Training",
    price: 12499,
    sizes: [7, 8, 9, 10, 11, 12, 13],
    rating: 4.9,
    reviews: 98,
    description:
      "The Rush Elite is built for champions. Cross-training perfection with unparalleled support and style for any workout.",
    features: [
      "Multi-directional traction",
      "Adaptive lacing system",
      "Premium edition",
      "Reinforced heel counter",
    ],
    badge: "New",
    imageUrl: "/assets/generated/shoe-training-blue.dim_600x600.png",
  },
  {
    id: 3,
    name: "Lock Step 2K",
    category: "sneakers",
    displayCategory: "Lifestyle",
    price: 8999,
    sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.6,
    reviews: 67,
    description:
      "Street-ready style meets technical precision. The Lock Step 2K features a unique outsole pattern that grips any surface.",
    features: [
      "Unique grip outsole",
      "Premium canvas upper",
      "Memory foam insole",
      "Lifestyle design",
    ],
    imageUrl: "/assets/generated/shoe-lock-step-2k.dim_600x600.png",
  },
  {
    id: 4,
    name: "Rush Runner",
    category: "sneakers",
    displayCategory: "Basketball",
    price: 13299,
    sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.7,
    reviews: 203,
    description:
      "Dominate the court with the Rush Runner. High-top design for superior ankle support and explosive court performance.",
    features: [
      "High-top ankle support",
      "Cushioned collar",
      "Pivot zones on outsole",
      "Quick-lace system",
    ],
    badge: "Hot",
    imageUrl: "/assets/generated/shoe-rush-runner.dim_600x600.png",
  },
  {
    id: 5,
    name: "Key Stride Oxford",
    category: "formal",
    displayCategory: "Formal",
    price: 15799,
    sizes: [7, 8, 9, 10, 11],
    rating: 4.5,
    reviews: 45,
    description:
      "Unlock professional elegance with the Key Stride Oxford. Premium leather craftsmanship meets modern design sensibility.",
    features: [
      "Full-grain leather upper",
      "Leather sole",
      "Cushioned footbed",
      "Goodyear welt construction",
    ],
    imageUrl: "/assets/generated/shoe-formal-oxford.dim_600x600.png",
  },
  {
    id: 6,
    name: "Puzzle Pace",
    category: "sneakers",
    displayCategory: "Lifestyle",
    price: 8299,
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.4,
    reviews: 81,
    description:
      "Every piece fits. The Puzzle Pace features unique sole panels for dynamic traction and iconic street style.",
    features: [
      "Interlocking outsole design",
      "Canvas and suede upper",
      "Gel heel cushioning",
      "Pull-on loop",
    ],
    imageUrl: "/assets/generated/shoe-puzzle-pace.dim_600x600.png",
  },
  {
    id: 7,
    name: "Cipher Boot",
    category: "boots",
    displayCategory: "Boots",
    price: 18299,
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.8,
    reviews: 37,
    description:
      "All-terrain performance meets urban sophistication in this premium ankle boot for any adventure.",
    features: [
      "Waterproof upper",
      "Vibram outsole",
      "Side zip closure",
      "Padded ankle collar",
    ],
    badge: "Premium",
    imageUrl: "/assets/generated/shoe-cipher-boot.dim_600x600.png",
  },
  {
    id: 8,
    name: "Rush Trainer X",
    category: "sneakers",
    displayCategory: "Training",
    price: 9999,
    sizes: [7, 8, 9, 10, 11, 12, 13],
    rating: 4.6,
    reviews: 156,
    description:
      "Built for the grind. The Rush Trainer X delivers gym-to-street versatility with advanced cushioning technology.",
    features: [
      "Dual-density foam",
      "Flat heel for lifting",
      "Breathable knit upper",
      "Durable outsole",
    ],
    imageUrl: "/assets/generated/shoe-rush-trainer.dim_600x600.png",
  },
  {
    id: 9,
    name: "Nexus Glide",
    category: "sneakers",
    displayCategory: "Running",
    price: 11699,
    sizes: [7, 8, 9, 10, 11],
    rating: 4.7,
    reviews: 89,
    description:
      "Smooth transitions and cloud-like comfort define the Nexus Glide. Perfect for long-distance runners seeking efficiency.",
    features: [
      "Rocker geometry sole",
      "Energy-return foam",
      "Seamless upper",
      "Wide toe box",
    ],
    imageUrl: "/assets/generated/shoe-running-white.dim_600x600.png",
  },
  {
    id: 10,
    name: "Code Breaker Low",
    category: "sneakers",
    displayCategory: "Lifestyle",
    price: 7499,
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.3,
    reviews: 54,
    description:
      "Break the mold with the Code Breaker Low. Clean silhouette with hidden technical details for the discerning sneakerhead.",
    features: [
      "Vulcanized sole",
      "Premium leather",
      "Embossed logo",
      "OrthoLite insole",
    ],
    imageUrl: "/assets/generated/shoe-lifestyle-red.dim_600x600.png",
  },
  {
    id: 11,
    name: "Vertex Hoop Pro",
    category: "sneakers",
    displayCategory: "Basketball",
    price: 14199,
    sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.9,
    reviews: 112,
    description:
      "The Vertex Hoop Pro gives you the edge on court. Zoom cushioning and lockdown fit for elite basketball performance.",
    features: [
      "Zoom Air unit",
      "Bootie upper construction",
      "Herringbone traction",
      "Foam collar",
    ],
    badge: "New",
    imageUrl: "/assets/generated/shoe-basketball-black.dim_600x600.png",
  },
  {
    id: 12,
    name: "Pinnacle Derby",
    category: "formal",
    displayCategory: "Formal",
    price: 17499,
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.6,
    reviews: 29,
    description:
      "The Pinnacle Derby represents the summit of formal footwear. Handcrafted Italian leather with a modern athletic-inspired sole.",
    features: [
      "Handcrafted leather",
      "Cushioned latex insole",
      "Blake-stitched construction",
      "Low-profile rubber sole",
    ],
    imageUrl: "/assets/generated/shoe-key-stride.dim_600x600.png",
  },
];

export const DISPLAY_CATEGORIES = [
  "All",
  "Running",
  "Training",
  "Basketball",
  "Lifestyle",
  "Boots",
  "Formal",
];
