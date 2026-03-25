import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Lock, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)];
    addItem(product, defaultSize);
    toast.success(`${product.name} added to cart!`, {
      description: `Size ${defaultSize}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        to="/product/$id"
        params={{ id: String(product.id) }}
        className="group block"
      >
        <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
          <div className="relative bg-muted aspect-square overflow-hidden">
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              whileHover={{ rotate: 3, scale: 1.07 }}
            />
            {product.badge && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                {product.badge}
              </Badge>
            )}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Lock size={16} className="text-primary/60" />
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {product.displayCategory}
                </p>
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {product.name}
                </h3>
              </div>
              <p className="font-bold text-foreground text-lg shrink-0">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={`star-${product.id}-${i}`}
                  size={12}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.reviews})
              </span>
            </div>

            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              onClick={handleAddToCart}
              data-ocid={`product.item.${index + 1}`}
            >
              <ShoppingCart size={14} />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
