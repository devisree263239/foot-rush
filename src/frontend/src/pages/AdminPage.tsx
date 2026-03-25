import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ClipboardList, LogOut, Package, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useActor } from "../hooks/useActor";

interface OrderItem {
  productId: bigint;
  skuId: string;
  quantity: bigint;
}

interface BackendOrder {
  id: bigint;
  buyer: { toString: () => string };
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: bigint;
  createdAt: bigint;
  status: string | { [key: string]: null };
}

function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(price: bigint): string {
  return `₹${(Number(price) / 100).toLocaleString("en-IN")}`;
}

function getStatusLabel(status: string | { [key: string]: null }): string {
  if (typeof status === "string") return status;
  const key = Object.keys(status)[0];
  return key ? key.charAt(0).toUpperCase() + key.slice(1) : "Pending";
}

export function AdminPage() {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, navigate]);

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<BackendOrder[]>({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getAllOrders();
      return result ?? [];
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  if (!isAuthenticated) return null;

  function handleLogout() {
    logout();
    navigate({ to: "/admin/login" });
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <ClipboardList size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-wide">
                  Admin Dashboard
                </h1>
                <p className="text-white/60 text-sm mt-0.5">
                  All placed orders
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white"
              data-ocid="admin.secondary_button"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-8">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Total Orders
              </p>
              <p className="font-display font-bold text-lg text-foreground">
                {isLoading ? "—" : (orders?.length ?? 0)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Package size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Revenue
              </p>
              <p className="font-display font-bold text-lg text-foreground">
                {isLoading
                  ? "—"
                  : orders && orders.length > 0
                    ? `₹${(orders.reduce((sum, o) => sum + Number(o.totalPrice) / 100, 0)).toLocaleString("en-IN")}`
                    : "₹0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        data-ocid="admin.table"
      >
        {isLoading && (
          <div className="text-center py-24" data-ocid="admin.loading_state">
            <div className="inline-flex items-center gap-3 text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Loading orders…</span>
            </div>
          </div>
        )}

        {isError && (
          <div className="text-center py-24" data-ocid="admin.error_state">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList size={28} className="text-destructive" />
            </div>
            <p className="text-destructive font-semibold text-lg">
              Failed to load orders
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Could not fetch orders from the backend.
            </p>
          </div>
        )}

        {!isLoading && !isError && (!orders || orders.length === 0) && (
          <div className="text-center py-24" data-ocid="admin.empty_state">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <ShoppingBag size={36} className="text-primary" />
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-2">
              No Orders Yet
            </h3>
            <p className="text-muted-foreground">
              Orders will appear here once customers start placing them.
            </p>
          </div>
        )}

        {!isLoading && !isError && orders && orders.length > 0 && (
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead className="font-bold text-foreground">
                    Order ID
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Customer
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Shipping Address
                  </TableHead>
                  <TableHead className="font-bold text-foreground text-center">
                    Items
                  </TableHead>
                  <TableHead className="font-bold text-foreground text-right">
                    Total
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="font-bold text-foreground">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, idx) => (
                  <TableRow
                    key={String(order.id)}
                    data-ocid={`admin.row.item.${idx + 1}`}
                  >
                    <TableCell>
                      <span className="font-mono font-bold text-primary text-sm">
                        FR-{String(order.id)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {order.shippingAddress.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-muted-foreground text-sm">
                        {order.shippingAddress.street},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="font-mono">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-foreground">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {formatDate(order.createdAt)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  );
}
