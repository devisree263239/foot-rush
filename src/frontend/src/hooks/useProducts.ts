import { useQuery } from "@tanstack/react-query";
import type { Product } from "../data/products";
import { PRODUCTS } from "../data/products";
import { useActor } from "./useActor";

// Maps a backend Product record to the frontend Product interface.
// The new backend (post-rewrite) returns:
//   id: bigint, price: number (Float), sizes: bigint[], rating: number,
//   reviews: bigint, badge: [] | [string], displayCategory: string, features: string[]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBackendProduct(bp: any): Product {
  return {
    id: Number(bp.id),
    name: bp.name,
    category: bp.category as Product["category"],
    displayCategory: bp.displayCategory ?? bp.category,
    price:
      typeof bp.price === "bigint" ? Number(bp.price) / 100 : Number(bp.price),
    sizes: Array.isArray(bp.sizes)
      ? bp.sizes.map((s: unknown) =>
          typeof s === "bigint"
            ? Number(s)
            : typeof s === "object" && s !== null && "size" in s
              ? Number((s as { size: bigint }).size)
              : Number(s),
        )
      : [],
    rating: typeof bp.rating === "number" ? bp.rating : 4.5,
    reviews:
      typeof bp.reviews === "bigint"
        ? Number(bp.reviews)
        : Number(bp.reviews ?? 0),
    description: bp.description ?? "",
    features: Array.isArray(bp.features) ? bp.features : [],
    badge: Array.isArray(bp.badge) ? bp.badge[0] : bp.badge,
    imageUrl: bp.imageUrl ?? "",
  };
}

export function useProducts() {
  const { actor, isFetching } = useActor();

  const query = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return PRODUCTS;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const backendProducts = await (actor as any).getAllProducts();
        if (!backendProducts || backendProducts.length === 0) return PRODUCTS;
        return backendProducts.map(mapBackendProduct);
      } catch {
        return PRODUCTS;
      }
    },
    enabled: !!actor && !isFetching,
    placeholderData: PRODUCTS,
  });

  return {
    products: query.data ?? PRODUCTS,
    isLoading: query.isLoading || query.isFetching,
  };
}
