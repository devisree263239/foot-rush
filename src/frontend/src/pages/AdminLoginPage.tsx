import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";

export function AdminLoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = login(password);
    if (success) {
      navigate({ to: "/admin" });
    } else {
      setError("Incorrect password. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-primary via-blue-400 to-primary" />

          <div className="px-8 py-10">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="/assets/uploads/logo_no_bg-019d2345-96d5-776e-b255-83478639405d-1.png"
                alt="Foot Rush"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="font-display font-bold text-2xl text-foreground uppercase tracking-widest">
                Admin Login
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Enter your password to access the dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-foreground font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-background/60 border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  data-ocid="admin_login.input"
                  required
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium"
                  data-ocid="admin_login.error_state"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                disabled={isLoading || !password}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide h-11"
                data-ocid="admin_login.submit_button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying…
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
