import Link from "next/link";
import { CheckCircle, Package, Truck, MapPin, ArrowRight, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { formatMoney } from "@/types/shop";

// Mock order data
const orderDetails = {
  orderNumber: "OJA-2024-00847",
  email: "john@email.com",
  estimatedDelivery: {
    start: "Jan 15, 2024",
    end: "Jan 18, 2024",
  },
  shippingAddress: {
    name: "John Doe",
    address: "123 Main Street, Apt 4B",
    city: "Victoria Island",
    state: "Lagos",
    country: "Nigeria",
  },
  items: [
    { name: "Ankara Bodycon Midi Dress", size: "M", color: "Sunset Orange", quantity: 1, price: 28500 },
    { name: "Adire Wrap Top (Indigo)", size: "S", color: "Indigo", quantity: 2, price: 19000 },
    { name: "Gold Hoop Earrings", size: "Large", quantity: 1, price: 2800 },
  ],
  subtotal: 69300,
  discount: 6930,
  shipping: 0,
  total: 62370,
};

export default function OrderConfirmationPage() {
  return (
    <ShopLayout>
      <div className="container px-4 py-12 max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for shopping with Ojaa. We've received your order.
          </p>
        </div>

        {/* Order Number & Email */}
        <Card className="p-6 mb-6 text-center">
          <p className="text-sm text-muted-foreground">Order Number</p>
          <p className="text-2xl font-extrabold text-primary">#{orderDetails.orderNumber}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Confirmation email sent to: <span className="font-medium">{orderDetails.email}</span>
          </p>
        </Card>

        {/* Estimated Delivery */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">Estimated Delivery</h2>
              <p className="text-2xl font-extrabold text-primary">
                {orderDetails.estimatedDelivery.start} - {orderDetails.estimatedDelivery.end}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6 relative">
            <div className="h-1 bg-muted rounded-full">
              <div className="h-1 bg-primary rounded-full w-1/4" />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className="text-primary font-medium">Confirmed</span>
              <span>Processing</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Shipping to:</p>
                <p className="text-sm text-muted-foreground">
                  {orderDetails.shippingAddress.name}<br />
                  {orderDetails.shippingAddress.address}<br />
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}<br />
                  {orderDetails.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Order Details</h2>
          <div className="space-y-4">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="w-16 h-20 bg-muted rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.color} | {item.size} | Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-medium shrink-0">
                  {formatMoney({ amount: item.price * item.quantity, currency: "NGN" })}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-6 pt-6 border-t space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatMoney({ amount: orderDetails.subtotal, currency: "NGN" })}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount (WELCOME10)</span>
              <span>-{formatMoney({ amount: orderDetails.discount, currency: "NGN" })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span>{formatMoney({ amount: orderDetails.total, currency: "NGN" })}</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Link href="/account/orders" className="flex-1">
            <Button size="lg" className="w-full gap-2">
              <Truck className="h-4 w-4" />
              Track Order
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button size="lg" variant="outline" className="w-full gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-center gap-6 text-sm">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Download className="h-4 w-4" />
            Download Receipt
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Share2 className="h-4 w-4" />
            Share Order
          </button>
        </div>

        {/* App Download CTA */}
        <Card className="p-6 mt-10 text-center bg-muted/50">
          <p className="font-medium mb-2">Get Order Updates on Your Phone</p>
          <p className="text-sm text-muted-foreground mb-4">
            Download the Ojaa app for real-time tracking and exclusive deals.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">App Store</Button>
            <Button variant="outline" size="sm">Google Play</Button>
          </div>
        </Card>
      </div>
    </ShopLayout>
  );
}
