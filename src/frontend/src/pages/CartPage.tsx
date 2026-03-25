import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();

  const shipping = total >= 8000 ? 0 : 499;
  const grandTotal = total + shipping;

  if (count === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center" data-ocid="cart.empty_state">
          <ShoppingBag
            size={64}
            className="text-muted-foreground mx-auto mb-4"
          />
          <h2 className="font-display font-bold text-2xl mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/shop" data-ocid="cart.primary_button">
            <Button className="bg-primary text-primary-foreground gap-2">
              <ShoppingBag size={16} /> Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display font-bold text-3xl uppercase mb-8">
          Shopping Cart
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4" data-ocid="cart.list">
            <AnimatePresence initial={false}>
              {items.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-card border border-border rounded-xl p-4 flex gap-4"
                  data-ocid={`cart.item.${index + 1}`}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display font-semibold text-foreground">
                          {item.product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Size: {item.size} · {item.product.displayCategory}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                        data-ocid={`cart.delete_button.${index + 1}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-border rounded-full px-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(
                              item.product.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          className="p-1 hover:text-primary transition-colors"
                          data-ocid="cart.toggle"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-semibold text-sm min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQty(
                              item.product.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="p-1 hover:text-primary transition-colors"
                          data-ocid="cart.toggle"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-foreground">
                        ₹
                        {(item.product.price * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div>
            <div
              className="bg-card border border-border rounded-xl p-6 sticky top-24"
              data-ocid="cart.panel"
            >
              <h2 className="font-display font-bold text-lg uppercase mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({count} items)
                  </span>
                  <span className="font-semibold">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? "text-primary font-semibold"
                        : "font-semibold"
                    }
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over ₹8,000
                  </p>
                )}
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
              <Link to="/checkout" data-ocid="cart.primary_button">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
                  Proceed to Checkout <ArrowRight size={16} />
                </Button>
              </Link>
              <Link
                to="/shop"
                className="block text-center text-sm text-muted-foreground hover:text-primary mt-3 transition-colors"
                data-ocid="cart.link"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
