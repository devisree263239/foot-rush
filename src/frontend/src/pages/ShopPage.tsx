import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useSearch } from "@tanstack/react-router";
import { Loader2, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { DISPLAY_CATEGORIES } from "../data/products";
import { useProducts } from "../hooks/useProducts";

const SIZES = [6, 7, 8, 9, 10, 11, 12, 13];

export function ShopPage() {
  const search = useSearch({ from: "/shop" }) as { category?: string };
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    search.category ? [search.category] : [],
  );
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { products, isLoading } = useProducts();

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const toggleSize = (size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (c) =>
            p.displayCategory.toLowerCase() === c.toLowerCase() ||
            p.category.toLowerCase() === c.toLowerCase(),
        );
      const sizeMatch =
        selectedSizes.length === 0 ||
        selectedSizes.some((s) => p.sizes.includes(s));
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      return catMatch && sizeMatch && priceMatch;
    });
  }, [products, selectedCategories, selectedSizes, priceRange]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-semibold text-sm uppercase tracking-wide mb-3 text-foreground">
          Category
        </h3>
        <div className="space-y-2">
          {DISPLAY_CATEGORIES.filter((c) => c !== "All").map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategories.includes(cat.toLowerCase())}
                onCheckedChange={() => toggleCategory(cat.toLowerCase())}
                data-ocid="shop.checkbox"
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-sm uppercase tracking-wide mb-3 text-foreground">
          Size
        </h3>
        <div className="grid grid-cols-4 gap-1.5">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              data-ocid="shop.toggle"
              className={`text-xs font-medium py-2 rounded-md border transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-sm uppercase tracking-wide mb-3 text-foreground">
          Price: ₹{priceRange[0].toLocaleString("en-IN")} – ₹
          {priceRange[1].toLocaleString("en-IN")}
        </h3>
        <Slider
          min={0}
          max={20000}
          step={500}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
          data-ocid="shop.toggle"
        />
      </div>

      {(selectedCategories.length > 0 || selectedSizes.length > 0) && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            setSelectedCategories([]);
            setSelectedSizes([]);
          }}
          data-ocid="shop.secondary_button"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-background border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-3xl uppercase text-foreground">
              All Shoes
            </h1>
            {isLoading && (
              <Loader2
                size={18}
                className="text-primary animate-spin"
                data-ocid="shop.loading_state"
              />
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            {filtered.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-sm uppercase">
                  Filters
                </h2>
                <SlidersHorizontal
                  size={16}
                  className="text-muted-foreground"
                />
              </div>
              <FilterContent />
            </div>
          </aside>

          <div className="lg:hidden mb-4 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="gap-2"
              data-ocid="shop.secondary_button"
            >
              <SlidersHorizontal size={16} /> Filters
              {selectedCategories.length + selectedSizes.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5">
                  {selectedCategories.length + selectedSizes.length}
                </span>
              )}
            </Button>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-card rounded-xl border border-border p-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Filters</span>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    data-ocid="shop.close_button"
                  >
                    <X size={18} />
                  </button>
                </div>
                <FilterContent />
              </motion.div>
            )}
          </div>

          <div className="flex-1">
            {isLoading && filtered.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
                  <Skeleton key={i} className="h-80 rounded-xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20" data-ocid="shop.empty_state">
                <p className="text-4xl mb-3">👟</p>
                <h3 className="font-display font-bold text-xl mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
