import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import { useProducts } from "../hooks/useProducts";

export function HomePage() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.badge).slice(0, 4);
  const displayFeatured =
    featured.length > 0
      ? featured
      : PRODUCTS.filter((p) => p.badge).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                <Zap size={10} /> New Collection
              </span>
            </div>
            <h1 className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] uppercase mb-6">
              UNLEASH
              <br />
              YOUR SPEED.
              <br />
              <span className="text-primary">FIND YOUR</span>
              <br />
              PERFECT PAIR.
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
              Premium footwear engineered for champions, designed for the
              streets. Discover your ultimate performance shoe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" data-ocid="hero.primary_button">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-full gap-2"
                >
                  SHOP NOW <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/about" data-ocid="hero.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
                >
                  Our Story
                </Button>
              </Link>
            </div>

            <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
              {[
                ["2K+", "Products"],
                ["50K+", "Customers"],
                ["4.8★", "Rating"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display font-bold text-2xl text-white">
                    {num}
                  </p>
                  <p className="text-white/50 text-xs uppercase tracking-wide">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110" />
              <motion.img
                src="/assets/generated/shoe-running-white.dim_600x600.png"
                alt="Sprint X Pro"
                className="relative w-full max-w-md drop-shadow-2xl"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Sneakers */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                Featured Collection
              </p>
              <h2 className="font-display font-bold text-4xl uppercase text-foreground">
                Trending Sneakers
              </h2>
            </div>
            <Link to="/shop" data-ocid="trending.link">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full gap-2"
              >
                View All <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFeatured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Band */}
      <section className="py-16 bg-secondary/30 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <Zap size={20} className="text-primary" />
            <Shield size={20} className="text-primary" />
            <Award size={20} className="text-primary" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-foreground mb-4">
            THE FOOT RUSH EXPERIENCE
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Where style meets performance. Every shoe in our collection is
            engineered with precision for comfort, durability, and iconic
            design. Sprint to your best self.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              {
                icon: Zap,
                title: "Performance",
                desc: "Cutting-edge materials for peak athletic output",
              },
              {
                icon: Shield,
                title: "Durability",
                desc: "Built to withstand the toughest conditions",
              },
              {
                icon: Award,
                title: "Style",
                desc: "Award-winning design meets street fashion",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-primary" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-1">
                  {title}
                </h4>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Style */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
            Collections
          </p>
          <h2 className="font-display font-bold text-4xl uppercase text-foreground mb-10">
            Shop by Style
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Running", emoji: "🏃" },
              { label: "Training", emoji: "💪" },
              { label: "Basketball", emoji: "🏀" },
              { label: "Lifestyle", emoji: "✨" },
              { label: "Boots", emoji: "🥾" },
              { label: "Formal", emoji: "👞" },
            ].map(({ label, emoji }) => (
              <Link
                key={label}
                to="/shop"
                search={{ category: label.toLowerCase() }}
                data-ocid="style.tab"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer font-semibold text-foreground flex items-center gap-2"
                >
                  <span>{emoji}</span> {label}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
