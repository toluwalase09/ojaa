import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
  ChevronRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { formatMoney } from "@/types/shop";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; image: string }[];
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
}

const orders: Order[] = [
  {
    id: "OJA-2024-00847",
    date: "Jan 12, 2024",
    items: [
      { name: "Ankara Bodycon Midi Dress", quantity: 1, image: "/demo/ankara-dress.svg" },
      { name: "Adire Wrap Top", quantity: 2, image: "/demo/adire-wrap-top.svg" },
      { name: "Gold Hoop Earrings", quantity: 1, image: "/demo/beaded-earrings.svg" },
    ],
    total: 19980,
    status: "shipped",
    trackingNumber: "NGP123456789",
    estimatedDelivery: "Jan 15-18, 2024",
  },
  {
    id: "OJA-2024-00832",
    date: "Jan 5, 2024",
    items: [
      { name: "Kente Panel Shirt", quantity: 1, image: "/demo/kente-panel-shirt.svg" },
    ],
    total: 8400,
    status: "delivered",
    deliveredAt: "Jan 8, 2024",
  },
  {
    id: "OJA-2024-00815",
    date: "Dec 28, 2023",
    items: [
      { name: "Cape Couture Linen Co-ord", quantity: 1, image: "/demo/linen-coord.svg" },
      { name: "Beaded Statement Earrings", quantity: 2, image: "/demo/beaded-earrings.svg" },
    ],
    total: 15800,
    status: "delivered",
    deliveredAt: "Jan 2, 2024",
  },
  {
    id: "OJA-2024-00798",
    date: "Dec 20, 2023",
    items: [
      { name: "Sahara Street Utility Cargo", quantity: 1, image: "/demo/street-cargo.svg" },
    ],
    total: 5400,
    status: "cancelled",
  },
];

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Package; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "Processing", icon: Package, color: "bg-blue-100 text-blue-700" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-700" },
  returned: { label: "Returned", icon: RotateCcw, color: "bg-gray-100 text-gray-700" },
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <ShopLayout>
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">
          Track, return, or buy again from your previous orders.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              All Orders
            </TabsTrigger>
            <TabsTrigger
              value="shipped"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Shipped
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Delivered
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6 mt-6">
            {filteredOrders.length === 0 ? (
              <Card className="p-8 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No orders found</p>
                <p className="text-muted-foreground mt-1">
                  {searchQuery
                    ? "Try a different search term."
                    : "You haven't placed any orders yet."}
                </p>
                <Link href="/">
                  <Button className="mt-4">Start Shopping</Button>
                </Link>
              </Card>
            ) : (
              filteredOrders.map((order) => {
                const statusInfo = statusConfig[order.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <Card key={order.id} className="overflow-hidden">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 border-b">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            Placed on {order.date}
                          </p>
                        </div>
                        <Badge className={cn("gap-1", statusInfo.color)}>
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {formatMoney({ amount: order.total, currency: "NGN" })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                        </p>
                      </div>
                    </div>

                    {/* Order Progress */}
                    {order.status === "shipped" && (
                      <div className="p-4 bg-purple-50 border-b">
                        <div className="flex items-center gap-4 mb-3">
                          <Truck className="h-5 w-5 text-purple-600" />
                          <div>
                            <p className="font-medium text-purple-900">In Transit</p>
                            <p className="text-sm text-purple-700">
                              Estimated delivery: {order.estimatedDelivery}
                            </p>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="relative">
                          <div className="h-1 bg-purple-200 rounded-full">
                            <div className="h-1 bg-purple-600 rounded-full w-2/3" />
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-purple-700">
                            <span>Ordered</span>
                            <span>Shipped</span>
                            <span>Out for Delivery</span>
                            <span>Delivered</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Order Items */}
                    <div className="p-4">
                      <div className="flex flex-wrap gap-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-16 h-20 bg-muted rounded-lg overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex items-center justify-center w-16 h-20 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">
                              +{order.items.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap items-center gap-3 p-4 border-t bg-muted/30">
                      {order.status === "shipped" && (
                        <Button size="sm" className="gap-2">
                          <Truck className="h-4 w-4" />
                          Track Package
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <>
                          <Button size="sm" variant="outline" className="gap-2">
                            Write Review
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <RotateCcw className="h-4 w-4" />
                            Return Item
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="gap-2">
                        Buy Again
                      </Button>
                      <Link href={`/account/orders/${order.id}`}>
                        <Button size="sm" variant="ghost" className="gap-2">
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      {order.status !== "cancelled" && order.status !== "delivered" && (
                        <Button size="sm" variant="ghost" className="text-muted-foreground">
                          Need Help?
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ShopLayout>
  );
}
