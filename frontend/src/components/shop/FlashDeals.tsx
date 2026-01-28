import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Product } from "@/types/shop";
import { formatMoney, calculateDiscountPercentage } from "@/types/shop";

interface FlashDealsProps {
  products: Product[];
  endTime: Date;
  className?: string;
}

export function FlashDeals({ products, endTime, className }: FlashDealsProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("flash-deals-scroll");
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className={cn("bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50", className)}>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-red-600">
              <Flame className="h-6 w-6 animate-pulse" />
              <h2 className="text-xl font-extrabold">Flash Deals</h2>
            </div>
            <Badge variant="destructive" className="gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Ends in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </Badge>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Countdown Timer - Large */}
        <div className="flex items-center gap-3 mb-6">
          <CountdownBlock value={timeLeft.hours} label="Hours" />
          <span className="text-2xl font-bold text-muted-foreground">:</span>
          <CountdownBlock value={timeLeft.minutes} label="Mins" />
          <span className="text-2xl font-bold text-muted-foreground">:</span>
          <CountdownBlock value={timeLeft.seconds} label="Secs" />
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div
            id="flash-deals-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          >
            {products.map((product) => (
              <FlashDealCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Countdown Block Component
function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black text-white rounded-lg px-3 py-2 min-w-[48px] text-center">
        <span className="text-2xl font-mono font-bold">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

// Flash Deal Product Card
interface FlashDealCardProps {
  product: Product;
  soldQuantity?: number;
  totalQuantity?: number;
}

function FlashDealCard({ product, soldQuantity = 0, totalQuantity = 100 }: FlashDealCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice.amount > product.price.amount;
  const discountPercent = hasDiscount
    ? calculateDiscountPercentage(product.compareAtPrice!.amount, product.price.amount)
    : 0;
  const soldPercent = Math.round((soldQuantity / totalQuantity) * 100);

  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="w-[180px] md:w-[200px] flex-shrink-0 snap-start overflow-hidden group hover:shadow-lg transition-shadow">
        {/* Image */}
        <div className="relative aspect-square bg-muted">
          <img
            src={product.primaryImageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              -{discountPercent}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-600">{formatMoney(product.price)}</span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                {formatMoney(product.compareAtPrice!)}
              </span>
            )}
          </div>

          {/* Stock Progress */}
          <div className="space-y-1">
            <Progress value={soldPercent} className="h-2" />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{soldQuantity} sold</span>
              <span>{totalQuantity - soldQuantity} left</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// Helper function
function calculateTimeLeft(endTime: Date) {
  const difference = +endTime - +new Date();
  let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24) + Math.floor(difference / (1000 * 60 * 60 * 24)) * 24,
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

// Mini Flash Deal Badge (for product cards)
export function FlashDealBadge({ endsIn }: { endsIn: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endsIn));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endsIn));
    }, 1000);
    return () => clearInterval(timer);
  }, [endsIn]);

  return (
    <Badge variant="destructive" className="gap-1 text-[10px] px-1.5 py-0.5">
      <Flame className="h-3 w-3" />
      {timeLeft.hours}:{timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
    </Badge>
  );
}
