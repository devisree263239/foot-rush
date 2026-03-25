import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Facebook, Heart, Instagram, Twitter, Youtube } from "lucide-react";
import { useState } from "react";

const SOCIAL_LINKS = [
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  return (
    <footer className="footer-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/uploads/logo_no_bg-019d2345-96d5-776e-b255-83478639405d-1.png"
                alt="Foot Rush"
                className="h-8 w-auto"
              />
              <span className="font-display font-bold text-lg">
                <span className="text-white">FOOT</span>
                <span className="text-primary"> RUSH</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Premium footwear engineered for speed, designed for life.
            </p>
            <div className="flex gap-3 mt-4">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-primary transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/70 mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {[
                "Running",
                "Training",
                "Basketball",
                "Lifestyle",
                "Boots",
                "Formal",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/shop"
                    search={{ category: cat.toLowerCase() }}
                    className="text-white/50 text-sm hover:text-primary transition-colors"
                    data-ocid="footer.link"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/70 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/about" },
                { label: "Careers", to: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-white/50 text-sm hover:text-primary transition-colors"
                    data-ocid="footer.link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/70 mb-4">
              Newsletter
            </h4>
            <p className="text-white/50 text-sm mb-3">
              Get exclusive drops and latest collection updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 text-sm"
                data-ocid="newsletter.input"
              />
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 shrink-0"
                data-ocid="newsletter.submit_button"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <p className="text-white/30 text-xs">
              &copy; {year} Foot Rush. All rights reserved.
            </p>
            <p className="text-sm font-bold tracking-wide">
              Developed by{" "}
              <span className="text-primary font-extrabold text-base">
                Devisree
              </span>
            </p>
          </div>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Built with <Heart size={12} className="text-primary fill-primary" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
