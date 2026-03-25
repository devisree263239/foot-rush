import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Key,
  Lock,
  RotateCcw,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useProduct } from "../hooks/useProduct";

export function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { product, isLoading } = useProduct(Number(id));
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  if (isLoading && !product) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">👟</p>
          <h2 className="font-display font-bold text-2xl mb-2">
            Product Not Found
          </h2>
          <Link to="/shop">
            <Button className="bg-primary text-primary-foreground">
              Back to Shop
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    toast.success(`${product.name} added to cart!`, {
      description: `Size ${selectedSize}`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/shop"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-8"
          data-ocid="product.link"
        >
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="bg-muted rounded-2xl overflow-hidden aspect-square relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {product.badge}
                </Badge>
              )}
              <div className="absolute bottom-4 right-4 text-primary/20">
                <Lock size={40} strokeWidth={1} />
              </div>
              <div className="absolute top-4 right-4 text-primary/20">
                <Key size={32} strokeWidth={1} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              {product.displayCategory}
            </p>
            <h1 className="font-display font-bold text-4xl text-foreground mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      star <= Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="font-display font-bold text-4xl text-foreground mb-6">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <p className="font-semibold text-sm mb-2">Select Size:</p>
              <div className="flex flex-wrap gap-2" data-ocid="product.panel">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    data-ocid="product.toggle"
                    className={`w-12 h-12 rounded-lg border-2 text-sm font-semibold transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2"
                onClick={handleAddToCart}
                data-ocid="product.primary_button"
              >
                {added ? <Check size={18} /> : <ShoppingCart size={18} />}
                {added ? "Added!" : "Add to Cart"}
              </Button>
              <Link to="/cart">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  data-ocid="product.secondary_button"
                >
                  View Cart
                </Button>
              </Link>
            </div>

            {product.features.length > 0 && (
              <div className="bg-secondary/30 rounded-xl p-5 mb-6">
                <h3 className="font-display font-semibold text-sm uppercase tracking-wide mb-3">
                  Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        size={14}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-primary" /> Free shipping over
                ₹8,000
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-primary" /> 30-day returns
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
