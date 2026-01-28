import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ChevronRight,
  Check,
  Truck,
  CreditCard,
  FileText,
  MapPin,
  Package,
  Shield,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShopLayout } from "@/components/shop/ShopLayout";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { formatMoney } from "@/types/shop";

type CheckoutStep = "shipping" | "payment" | "review";

const DELIVERY_OPTIONS = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "3-5 business days",
    price: 0,
    freeAbove: 15000,
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "1-2 business days",
    price: 2500,
  },
  {
    id: "same-day",
    name: "Same Day (Lagos only)",
    description: "Delivered today",
    price: 3500,
  },
];

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi",
  "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

// Mock cart summary
const cartItems = [
  { name: "Ankara Bodycon Midi Dress", size: "M", color: "Sunset Orange", quantity: 1, price: 28500 },
  { name: "Adire Wrap Top (Indigo)", size: "S", color: "Indigo", quantity: 2, price: 19000 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "Lagos",
    country: "Nigeria",
    deliveryOption: "standard",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    saveCard: false,
    agreeTerms: false,
  });

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedDelivery = DELIVERY_OPTIONS.find((d) => d.id === formData.deliveryOption);
  const shipping = selectedDelivery?.freeAbove && subtotal >= selectedDelivery.freeAbove
    ? 0
    : selectedDelivery?.price || 0;
  const discount = 2220; // Example discount
  const total = subtotal - discount + shipping;

  const steps: { id: CheckoutStep; label: string; icon: typeof Truck }[] = [
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: FileText },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const goToStep = (step: CheckoutStep) => {
    const stepIndex = steps.findIndex((s) => s.id === step);
    if (stepIndex <= currentStepIndex + 1) {
      setCurrentStep(step);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-square.svg?v=1" alt="ojaa" className="h-8 w-8" />
            <span className="text-lg font-extrabold tracking-tight">ojaa</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            Secure Checkout
          </div>
          <Link href="/cart">
            <Button variant="ghost" size="sm">Back to Cart</Button>
          </Link>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-background border-b">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(step.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : index < currentStepIndex
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-sm",
                    currentStep === step.id
                      ? "bg-primary-foreground text-primary"
                      : index < currentStepIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}>
                    {index < currentStepIndex ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="font-medium">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-12 h-0.5 mx-2",
                    index < currentStepIndex ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === "shipping" && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      value={formData.apartment}
                      onChange={(e) => updateFormData("apartment", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => updateFormData("state", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {NIGERIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Delivery Options</h3>
                  <RadioGroup
                    value={formData.deliveryOption}
                    onValueChange={(value) => updateFormData("deliveryOption", value)}
                    className="space-y-3"
                  >
                    {DELIVERY_OPTIONS.map((option) => (
                      <label
                        key={option.id}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors",
                          formData.deliveryOption === option.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-muted-foreground/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={option.id} />
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <span className={cn(
                          "font-medium",
                          option.freeAbove && subtotal >= option.freeAbove && "text-green-600"
                        )}>
                          {option.freeAbove && subtotal >= option.freeAbove
                            ? "FREE"
                            : option.price === 0
                            ? "FREE"
                            : formatMoney({ amount: option.price, currency: "NGN" })}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-end mt-8">
                  <Button onClick={() => setCurrentStep("payment")} size="lg" className="gap-2">
                    Continue to Payment
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Payment */}
            {currentStep === "payment" && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </h2>

                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => updateFormData("paymentMethod", value)}
                  className="space-y-3 mb-6"
                >
                  <label
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                      formData.paymentMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    )}
                  >
                    <RadioGroupItem value="card" />
                    <div>
                      <p className="font-medium">Card Payment</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, Verve</p>
                    </div>
                  </label>
                  <label
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                      formData.paymentMethod === "paystack"
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    )}
                  >
                    <RadioGroupItem value="paystack" />
                    <div>
                      <p className="font-medium">Paystack</p>
                      <p className="text-sm text-muted-foreground">Pay with Paystack</p>
                    </div>
                  </label>
                  <label
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                      formData.paymentMethod === "flutterwave"
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    )}
                  >
                    <RadioGroupItem value="flutterwave" />
                    <div>
                      <p className="font-medium">Flutterwave</p>
                      <p className="text-sm text-muted-foreground">Pay with Flutterwave</p>
                    </div>
                  </label>
                  <label
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                      formData.paymentMethod === "transfer"
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    )}
                  >
                    <RadioGroupItem value="transfer" />
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">Pay directly to our bank account</p>
                    </div>
                  </label>
                </RadioGroup>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => updateFormData("cardNumber", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={(e) => updateFormData("cardExpiry", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          placeholder="123"
                          type="password"
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={(e) => updateFormData("cardCvv", e.target.value)}
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.saveCard}
                        onCheckedChange={(checked) => updateFormData("saveCard", !!checked)}
                      />
                      <span className="text-sm">Save card for future purchases</span>
                    </label>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep("shipping")}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep("review")} size="lg" className="gap-2">
                    Review Order
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Review */}
            {currentStep === "review" && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Review Your Order
                </h2>

                {/* Shipping Summary */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Shipping To
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep("shipping")}>
                      Edit
                    </Button>
                  </div>
                  <p className="text-sm">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.phone}<br />
                    {formData.address}
                    {formData.apartment && `, ${formData.apartment}`}<br />
                    {formData.city}, {formData.state}, {formData.country}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedDelivery?.name} ({selectedDelivery?.description})
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment Method
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep("payment")}>
                      Edit
                    </Button>
                  </div>
                  <p className="text-sm">
                    {formData.paymentMethod === "card"
                      ? `Card ending in ${formData.cardNumber.slice(-4) || "****"}`
                      : formData.paymentMethod === "paystack"
                      ? "Paystack"
                      : formData.paymentMethod === "flutterwave"
                      ? "Flutterwave"
                      : "Bank Transfer"}
                  </p>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-medium mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                        <div className="w-16 h-20 bg-muted rounded" />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.color} | {item.size} | Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatMoney({ amount: item.price * item.quantity, currency: "NGN" })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms Agreement */}
                <label className="flex items-start gap-2 mb-6">
                  <Checkbox
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => updateFormData("agreeTerms", !!checked)}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep("payment")}>
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={handlePlaceOrder}
                    disabled={!formData.agreeTerms || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-bold mb-4">Order Summary</h2>

              {/* Items Preview */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-12 h-16 bg-muted rounded shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.color} | {item.size} | ×{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium shrink-0">
                      {formatMoney({ amount: item.price * item.quantity, currency: "NGN" })}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatMoney({ amount: subtotal, currency: "NGN" })}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (WELCOME10)</span>
                  <span>-{formatMoney({ amount: discount, currency: "NGN" })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : formatMoney({ amount: shipping, currency: "NGN" })}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>{formatMoney({ amount: total, currency: "NGN" })}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
