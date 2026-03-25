import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  Check,
  CreditCard,
  Home,
  Loader2,
  Lock,
  MapPin,
  Package,
  Shield,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";

type Step = 1 | 2 | 3;

interface ShippingForm {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

interface PaymentForm {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardName: string;
}

const gradientBar = {
  background: "linear-gradient(90deg, #f97316, #a855f7, #3b82f6, #f97316)",
  backgroundSize: "200% 100%",
  animation: "gradientShift 4s linear infinite",
};

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { actor } = useActor();
  const [step, setStep] = useState<Step>(1);
  const [orderNumber, setOrderNumber] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [shipping, setShipping] = useState<ShippingForm>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [payment, setPayment] = useState<PaymentForm>({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const shippingCost = total >= 8000 ? 0 : 499;
  const grandTotal = total + shippingCost;

  const steps = [
    { num: 1 as Step, label: "Shipping", icon: MapPin },
    { num: 2 as Step, label: "Payment", icon: CreditCard },
    { num: 3 as Step, label: "Confirmed", icon: Package },
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    try {
      if (actor) {
        const cartItems = items.map((item) => ({
          productId: BigInt(item.product.id),
          size: BigInt(item.size),
          quantity: BigInt(item.quantity),
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orderId = await (actor as any).placeOrder(
          cartItems,
          shipping.name,
          shipping.email,
          shipping.address,
          shipping.city,
          shipping.zip,
          shipping.country,
          grandTotal,
        );
        setOrderNumber(`FR-${orderId}`);
      } else {
        setOrderNumber(`FR-${Math.floor(100000 + Math.random() * 900000)}`);
      }
      clearCart();
      setStep(3);
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const inputClass =
    "mt-1 bg-white/5 border border-white/20 text-white placeholder:text-white/30 focus:border-primary focus:ring-primary/30";
  const labelClass = "text-gray-300 text-sm font-medium";

  return (
    <main className="min-h-screen bg-black">
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4), 0 0 20px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 8px rgba(34,197,94,0), 0 0 40px rgba(34,197,94,0.4); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display font-bold text-3xl uppercase mb-8 text-center text-white tracking-widest">
          Checkout
        </h1>

        {/* Step indicator */}
        <div
          className="flex items-center justify-center mb-10"
          data-ocid="checkout.panel"
        >
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step > s.num
                      ? "bg-primary text-primary-foreground"
                      : step === s.num
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/30"
                        : "bg-white/10 text-white/40"
                  }`}
                >
                  {step > s.num ? <Check size={16} /> : <s.icon size={16} />}
                </div>
                <span
                  className={`text-xs font-semibold ${step >= s.num ? "text-primary" : "text-white/40"}`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-24 sm:w-32 mx-2 mb-5 transition-all ${step > s.num ? "bg-primary" : "bg-white/15"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: form panels */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div
                    className="relative bg-zinc-900 border border-white/10 rounded-xl overflow-hidden"
                    data-ocid="checkout.panel"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={gradientBar}
                    />
                    <form
                      onSubmit={handleShippingSubmit}
                      className="p-6 space-y-5"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={18} className="text-primary" />
                        <h2 className="font-display font-bold text-lg text-white">
                          Shipping Information
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className={labelClass}>
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            value={shipping.name}
                            onChange={(e) =>
                              setShipping({ ...shipping, name: e.target.value })
                            }
                            required
                            placeholder="Rahul Sharma"
                            className={inputClass}
                            data-ocid="checkout.input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className={labelClass}>
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={shipping.email}
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                email: e.target.value,
                              })
                            }
                            required
                            placeholder="rahul@email.com"
                            className={inputClass}
                            data-ocid="checkout.input"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="address" className={labelClass}>
                            Street Address
                          </Label>
                          <Input
                            id="address"
                            value={shipping.address}
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                address: e.target.value,
                              })
                            }
                            required
                            placeholder="123 MG Road"
                            className={inputClass}
                            data-ocid="checkout.input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className={labelClass}>
                            City
                          </Label>
                          <Input
                            id="city"
                            value={shipping.city}
                            onChange={(e) =>
                              setShipping({ ...shipping, city: e.target.value })
                            }
                            required
                            placeholder="Mumbai"
                            className={inputClass}
                            data-ocid="checkout.input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zip" className={labelClass}>
                            PIN Code
                          </Label>
                          <Input
                            id="zip"
                            value={shipping.zip}
                            onChange={(e) =>
                              setShipping({ ...shipping, zip: e.target.value })
                            }
                            required
                            placeholder="400001"
                            className={inputClass}
                            data-ocid="checkout.input"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="country" className={labelClass}>
                            Country
                          </Label>
                          <Input
                            id="country"
                            value={shipping.country}
                            onChange={(e) =>
                              setShipping({
                                ...shipping,
                                country: e.target.value,
                              })
                            }
                            required
                            placeholder="India"
                            className={inputClass}
                            data-ocid="checkout.input"
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide"
                        data-ocid="checkout.submit_button"
                      >
                        Continue to Payment &rarr;
                      </Button>
                      <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                        <Shield size={12} />
                        <span>100% Secure &amp; Encrypted</span>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div
                    className="relative bg-zinc-900 border border-white/10 rounded-xl overflow-hidden"
                    data-ocid="checkout.panel"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={gradientBar}
                    />
                    <form
                      onSubmit={handlePaymentSubmit}
                      className="p-6 space-y-5"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard size={18} className="text-primary" />
                        <h2 className="font-display font-bold text-lg text-white">
                          Payment Information
                        </h2>
                      </div>
                      <p className="text-white/40 text-sm">
                        This is a demo. No real payment will be processed.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName" className={labelClass}>
                            Name on Card
                          </Label>
                          <Input
                            id="cardName"
                            value={payment.cardName}
                            onChange={(e) =>
                              setPayment({
                                ...payment,
                                cardName: e.target.value,
                              })
                            }
                            required
                            placeholder="Rahul Sharma"
                            className={inputClass}
                            data-ocid="checkout.input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber" className={labelClass}>
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            value={payment.cardNumber}
                            onChange={(e) =>
                              setPayment({
                                ...payment,
                                cardNumber: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 16),
                              })
                            }
                            required
                            placeholder="1234 5678 9012 3456"
                            maxLength={16}
                            className={inputClass}
                            data-ocid="checkout.input"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry" className={labelClass}>
                              Expiry
                            </Label>
                            <Input
                              id="expiry"
                              value={payment.expiry}
                              onChange={(e) =>
                                setPayment({
                                  ...payment,
                                  expiry: e.target.value,
                                })
                              }
                              required
                              placeholder="MM/YY"
                              className={inputClass}
                              data-ocid="checkout.input"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className={labelClass}>
                              CVV
                            </Label>
                            <Input
                              id="cvv"
                              value={payment.cvv}
                              onChange={(e) =>
                                setPayment({
                                  ...payment,
                                  cvv: e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 3),
                                })
                              }
                              required
                              placeholder="123"
                              maxLength={3}
                              className={inputClass}
                              data-ocid="checkout.input"
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={isPlacingOrder}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide gap-2"
                        data-ocid="checkout.submit_button"
                      >
                        {isPlacingOrder ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />{" "}
                            Placing Order&hellip;
                          </>
                        ) : (
                          <>
                            <Lock size={14} /> Place Order Securely
                          </>
                        )}
                      </Button>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        &larr; Back to Shipping
                      </button>
                      <div className="flex items-center justify-center gap-2 text-xs text-white/40 border border-white/10 rounded-lg py-2">
                        <Shield size={12} className="text-green-400" />
                        <span>100% Secure &amp; Encrypted Checkout</span>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-ocid="checkout.panel"
                >
                  <div className="relative bg-zinc-900 border border-white/10 rounded-xl overflow-hidden p-8 text-center">
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={gradientBar}
                    />
                    {/* glowing green success ring */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500/20"
                      style={{ animation: "glowPulse 2s ease-in-out infinite" }}
                    >
                      <Check size={36} className="text-green-400" />
                    </div>
                    <h2 className="font-display font-bold text-2xl text-white mb-2">
                      Order Confirmed!
                    </h2>
                    <p className="text-white/50 mb-6">
                      Thank you for your purchase. We&apos;ll get your shoes on
                      the way soon!
                    </p>
                    <div className="bg-black border border-primary/40 rounded-lg px-6 py-3 inline-block mb-8">
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                        Order Number
                      </p>
                      <p className="font-mono font-bold text-primary text-2xl">
                        {orderNumber}
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      <Link to="/">
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 gap-2"
                          data-ocid="checkout.secondary_button"
                        >
                          <Home size={16} /> Home
                        </Button>
                      </Link>
                      <Link to="/shop">
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                          data-ocid="checkout.primary_button"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: order summary */}
          <div>
            <div className="relative bg-zinc-900 border border-white/10 rounded-xl overflow-hidden p-5 sticky top-24">
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={gradientBar}
              />

              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag size={16} className="text-primary" />
                <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider">
                  Order Summary
                </h3>
              </div>
              {/* accent divider */}
              <div
                className="h-px mb-4"
                style={{
                  background:
                    "linear-gradient(90deg, #f97316, #a855f7, transparent)",
                }}
              />

              <div className="space-y-3 mb-4">
                {items.length === 0 ? (
                  <p className="text-white/40 text-sm text-center py-2">
                    Cart is empty
                  </p>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                          <Package size={14} className="text-primary/70" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-xs font-medium truncate leading-tight">
                            {item.product.name}
                          </p>
                          <p className="text-white/40 text-xs">
                            Size {item.size} &times; {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-primary font-semibold text-sm shrink-0">
                        &#8377;
                        {(item.product.price * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <Separator className="mb-3 bg-white/10" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">
                    &#8377;{total.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span
                    className={
                      shippingCost === 0
                        ? "text-green-400 font-semibold"
                        : "text-white"
                    }
                  >
                    {shippingCost === 0 ? "FREE" : `\u20b9${shippingCost}`}
                  </span>
                </div>
              </div>

              <Separator className="my-3 bg-white/10" />

              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-base">Total</span>
                <span className="text-primary font-extrabold text-xl">
                  &#8377;{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Secure checkout badge */}
              <div className="mt-4 flex items-center justify-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-lg py-2 px-3">
                <Lock size={11} className="text-green-400" />
                <span className="text-green-400 text-xs font-medium">
                  Secure Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
