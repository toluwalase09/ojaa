import Link from "next/link";
import { useState } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Camera,
  Settings,
  LogOut,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { formatMoney } from "@/types/shop";

// Mock user data
const userData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@email.com",
  phone: "+234 801 234 5678",
  avatar: null,
  walletBalance: 5000,
  ordersCount: 12,
  wishlistCount: 24,
};

// Mock orders
const recentOrders = [
  {
    id: "OJA-2024-00847",
    date: "Jan 12, 2024",
    items: 3,
    total: 19980,
    status: "in_transit",
    statusLabel: "In Transit",
  },
  {
    id: "OJA-2024-00832",
    date: "Jan 5, 2024",
    items: 1,
    total: 8400,
    status: "delivered",
    statusLabel: "Delivered",
  },
];

// Mock saved try-ons
const savedTryOns = MOCK_PRODUCTS.filter((p) => p.virtualTryOn.isEnabled).slice(0, 3);

const menuItems = [
  { href: "/account/orders", icon: Package, label: "My Orders", badge: userData.ordersCount },
  { href: "/account/wishlist", icon: Heart, label: "Wishlist", badge: userData.wishlistCount },
  { href: "/account/addresses", icon: MapPin, label: "Addresses" },
  { href: "/account/try-ons", icon: Camera, label: "Virtual Try-Ons" },
  { href: "/account/wallet", icon: Wallet, label: "Wallet" },
  { href: "/account/settings", icon: Settings, label: "Settings" },
];

export default function AccountDashboard() {
  return (
    <ShopLayout>
      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={userData.avatar || undefined} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {userData.firstName[0]}{userData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-bold text-lg">{userData.firstName} {userData.lastName}</h2>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-muted-foreground hover:text-destructive transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Welcome Header */}
            <div>
              <h1 className="text-2xl font-extrabold">Hello, {userData.firstName}!</h1>
              <p className="text-muted-foreground">
                Welcome back to your account dashboard.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">{userData.ordersCount}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">{userData.wishlistCount}</p>
                    <p className="text-sm text-muted-foreground">Wishlist Items</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Wallet className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">
                      {formatMoney({ amount: userData.walletBalance, currency: "NGN" })}
                    </p>
                    <p className="text-sm text-muted-foreground">Wallet Balance</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Recent Orders</h2>
                <Link href="/account/orders" className="text-sm text-primary hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium">#{order.id}</p>
                        <Badge
                          variant={order.status === "delivered" ? "default" : "secondary"}
                          className={cn(
                            "text-xs",
                            order.status === "in_transit" && "bg-blue-100 text-blue-700",
                            order.status === "delivered" && "bg-green-100 text-green-700"
                          )}
                        >
                          {order.statusLabel}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.date} · {order.items} items · {formatMoney({ amount: order.total, currency: "NGN" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        {order.status === "delivered" ? "Review" : "Track"}
                      </Button>
                      <Link href={`/account/orders/${order.id}`}>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Saved Virtual Try-Ons */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold">Saved Virtual Try-Ons</h2>
                </div>
                <Link href="/account/try-ons" className="text-sm text-primary hover:underline">
                  View All
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {savedTryOns.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                      <img
                        src={product.primaryImageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Saved: Jan 10, 2024</p>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">View</Button>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </main>
        </div>
      </div>
    </ShopLayout>
  );
}
