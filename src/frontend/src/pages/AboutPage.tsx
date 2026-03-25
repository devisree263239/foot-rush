import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function AboutPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent!", {
      description: "We'll get back to you soon.",
    });
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="hero-gradient py-20 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h1 className="font-display font-bold text-5xl text-white uppercase mb-4">
              Born to Run.
              <br />
              <span className="text-primary">Built to Last.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Foot Rush was founded by athletes who believed that great footwear
              should unlock your full potential — every stride, every step,
              every victory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap size={24} className="text-primary" />
                <p className="text-primary font-bold uppercase tracking-widest text-xs">
                  The Foot Rush Vision
                </p>
              </div>
              <h2 className="font-display font-bold text-3xl uppercase mb-6">
                Every Shoe Tells a Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At Foot Rush, we believe performance footwear is like the best
                  design — every element has a purpose, every feature fits
                  perfectly, and the result is greater than the sum of its
                  parts.
                </p>
                <p>
                  Our collection is the culmination of years of research,
                  athlete testing, and design iteration. We've crafted the
                  perfect shoe for every occasion.
                </p>
                <p>
                  Each pair is built with premium materials, refined fit
                  systems, and attention to detail — subtle reminders that
                  you've found exactly what you were looking for.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: Zap,
                  title: "Speed Fit",
                  desc: "Adaptive lacing that locks your foot in place for maximum performance",
                },
                {
                  icon: Star,
                  title: "Stride Tech",
                  desc: "Proprietary sole geometry for efficient energy transfer",
                },
                {
                  icon: Shield,
                  title: "Rush Grip",
                  desc: "Multi-directional outsole panels for superior traction",
                },
                {
                  icon: Check,
                  title: "Quality Promise",
                  desc: "Every shoe is QA-tested to meet Foot Rush standards",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <Icon size={24} className="text-primary mb-3" />
                  <h4 className="font-display font-semibold mb-1">{title}</h4>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl uppercase">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mt-2">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info cards */}
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  lines: [
                    "123 Sprint Avenue",
                    "Fashion District",
                    "New York, NY 10001",
                  ],
                },
                { icon: Phone, title: "Phone", lines: ["+1 (555) 267-8349"] },
                {
                  icon: Mail,
                  title: "Email",
                  lines: ["hello@footrush.com", "support@footrush.com"],
                },
              ].map(({ icon: Icon, title, lines }) => (
                <div
                  key={title}
                  className="bg-card border border-border rounded-xl p-5 flex gap-4"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{title}</h4>
                    {lines.map((l) => (
                      <p key={l} className="text-muted-foreground text-sm">
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl p-6 space-y-4"
                data-ocid="contact.panel"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cname">Name</Label>
                    <Input
                      id="cname"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      placeholder="Your name"
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cemail">Email</Label>
                    <Input
                      id="cemail"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      placeholder="your@email.com"
                      className="mt-1"
                      data-ocid="contact.input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="mt-1"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2"
                  data-ocid="contact.submit_button"
                >
                  {sent ? <Check size={16} /> : <Send size={16} />}
                  {sent ? "Message Sent!" : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
