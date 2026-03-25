import { useQuery } from "@tanstack/react-query";
import type { Product } from "../data/products";
import { PRODUCTS } from "../data/products";
import { useActor } from "./useActor";

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

export function useProduct(id: number) {
  const { actor, isFetching } = useActor();
  const fallback = PRODUCTS.find((p) => p.id === id) ?? null;

  const query = useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return fallback;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getProduct(BigInt(id));
        // ?Product returns [] | [Product] in Candid
        const bp = Array.isArray(result) ? result[0] : result;
        if (!bp) return fallback;
        return mapBackendProduct(bp);
      } catch {
        return fallback;
      }
    },
    enabled: !!actor && !isFetching && id > 0,
    placeholderData: fallback,
  });

  return {
    product: query.data ?? fallback,
    isLoading: query.isLoading,
  };
}
