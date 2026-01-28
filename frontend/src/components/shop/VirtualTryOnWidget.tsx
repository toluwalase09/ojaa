import { useState } from "react";
import { Camera, Upload, Users, X, ArrowRight, Download, Share2, ShoppingBag, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import type { Product, ProductColor } from "@/types/shop";
import { formatMoney } from "@/types/shop";
import { ColorSwatch } from "./ProductCard";

// ============================================================================
// VIRTUAL TRY-ON PLACEHOLDER HOOKS
// These will be replaced with actual AI try-on implementation
// ============================================================================

interface TryOnResult {
  id: string;
  resultImageUrl: string;
  thumbnailUrl: string;
  productId: string;
  colorId: string;
  createdAt: string;
}

interface UseTryOnHook {
  isProcessing: boolean;
  progress: number;
  result: TryOnResult | null;
  error: string | null;
  startTryOn: (params: { userPhoto: File | string; productId: string; colorId: string }) => Promise<void>;
  reset: () => void;
}

// Placeholder hook - replace with actual implementation
export function useVirtualTryOn(): UseTryOnHook {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<TryOnResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startTryOn = async (params: { userPhoto: File | string; productId: string; colorId: string }) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    // Simulate processing with progress updates
    const steps = [20, 45, 70, 90, 100];
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProgress(step);
    }

    // Simulate result
    setResult({
      id: `tryon_${Date.now()}`,
      resultImageUrl: "/demo/tryon-result-placeholder.svg",
      thumbnailUrl: "/demo/tryon-result-placeholder.svg",
      productId: params.productId,
      colorId: params.colorId,
      createdAt: new Date().toISOString(),
    });

    setIsProcessing(false);
  };

  const reset = () => {
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
  };

  return { isProcessing, progress, result, error, startTryOn, reset };
}

// ============================================================================
// TRY-ON BUTTON COMPONENT
// ============================================================================

interface TryOnButtonProps {
  product: Product;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function TryOnButton({ product, variant = "outline", size = "default", className }: TryOnButtonProps) {
  const [open, setOpen] = useState(false);

  if (!product.virtualTryOn.isEnabled) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={cn("gap-2", className)}>
          <Camera className="h-4 w-4" />
          Virtual Try-On
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <TryOnModal product={product} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

// ============================================================================
// TRY-ON MODAL COMPONENT
// ============================================================================

interface TryOnModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart?: (productId: string, colorId: string, sizeId: string) => void;
}

export function TryOnModal({ product, onClose, onAddToCart }: TryOnModalProps) {
  const [step, setStep] = useState<"select" | "processing" | "result">("select");
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const { isProcessing, progress, result, startTryOn, reset } = useVirtualTryOn();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartTryOn = async () => {
    if (!userPhoto) return;
    setStep("processing");
    await startTryOn({
      userPhoto,
      productId: product.id,
      colorId: selectedColor.id,
    });
    setStep("result");
  };

  const handleTryAgain = () => {
    reset();
    setStep("select");
    setUserPhoto(null);
  };

  return (
    <div className="flex flex-col h-full">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Virtual Try-On
        </DialogTitle>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto mt-4">
        {step === "select" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Photo Selection */}
            <div className="space-y-4">
              <h3 className="font-medium">Choose Your Method</h3>

              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </TabsTrigger>
                  <TabsTrigger value="model" className="gap-2">
                    <Users className="h-4 w-4" />
                    Use Model
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-4">
                  <div className="space-y-4">
                    {userPhoto ? (
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden border">
                        <img
                          src={userPhoto}
                          alt="Your photo"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setUserPhoto(null)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-[3/4] border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <Upload className="h-12 w-12 text-muted-foreground mb-3" />
                        <p className="font-medium">Upload your photo</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          JPG, PNG, or HEIC up to 10MB
                        </p>
                      </label>
                    )}

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Tips for best results:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        <li>Stand facing the camera</li>
                        <li>Wear form-fitting clothes</li>
                        <li>Good lighting helps</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="model" className="mt-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <button
                        key={i}
                        onClick={() => setUserPhoto(`/demo/model-${i}.svg`)}
                        className={cn(
                          "aspect-[3/4] rounded-lg border-2 overflow-hidden transition-all",
                          userPhoto === `/demo/model-${i}.svg`
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-transparent hover:border-muted"
                        )}
                      >
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Users className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right: Product Preview */}
            <div className="space-y-4">
              <h3 className="font-medium">Product</h3>

              <div className="flex gap-4">
                <div className="w-24 aspect-[3/4] rounded-lg overflow-hidden border">
                  <img
                    src={product.primaryImageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-medium line-clamp-2">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.brand.name}</p>
                  <p className="font-bold">{formatMoney(product.price)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Color: {selectedColor.name}</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <ColorSwatch
                      key={color.id}
                      color={color}
                      size="md"
                      selected={selectedColor.id === color.id}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={handleStartTryOn}
                disabled={!userPhoto}
                className="w-full gap-2"
              >
                See It On You
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <div
                className="absolute inset-0 rounded-full border-4 border-primary transition-all duration-500"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((progress / 100) * 2 * Math.PI)}% ${50 - 50 * Math.cos((progress / 100) * 2 * Math.PI)}%, 50% 50%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{progress}%</span>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="font-medium">Creating your look...</p>
              <p className="text-sm text-muted-foreground">
                {progress < 30
                  ? "Analyzing your photo..."
                  : progress < 60
                  ? "Fitting the garment..."
                  : progress < 90
                  ? "Adjusting details..."
                  : "Almost done..."}
              </p>
            </div>
          </div>
        )}

        {step === "result" && result && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Result Image */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border">
                {/* Before/After Comparison - Placeholder */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 overflow-hidden">
                    <img
                      src={userPhoto!}
                      alt="Before"
                      className="h-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 overflow-hidden">
                    <img
                      src={result.resultImageUrl}
                      alt="After"
                      className="h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg cursor-ew-resize" />
                <div className="absolute top-4 left-4 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
                  Before
                </div>
                <div className="absolute top-4 right-4 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
                  After
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Try Different Colors</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <ColorSwatch
                      key={color.id}
                      color={color}
                      size="lg"
                      selected={selectedColor.id === color.id}
                      onClick={() => {
                        setSelectedColor(color);
                        // Re-trigger try-on with new color
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2" onClick={() => onAddToCart?.(product.id, selectedColor.id, "")}>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart - {formatMoney(product.price)}
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                <Button variant="ghost" className="w-full" onClick={handleTryAgain}>
                  Try Another Photo
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Virtual try-on is an AI-powered preview. Actual fit may vary.
                  Check our size guide for the best fit.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TRY-ON SPOTLIGHT SECTION (for homepage)
// ============================================================================

export function TryOnSpotlight() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent/50 to-primary/5">
      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Camera className="h-4 w-4" />
              Virtual Try-On
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              See It On You
              <br />
              <span className="text-primary">Before You Buy</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Upload your photo or use one of our models to see exactly how
              our pieces will look on you. No more guessing, no more returns.
            </p>
            <Button size="lg" className="gap-2">
              <Camera className="h-5 w-5" />
              Try It Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Visual Demo */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border shadow-xl">
              {/* Placeholder for animated before/after demo */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera className="h-16 w-16 mx-auto text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    Try-On Demo Preview
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-1/4 bg-white rounded-lg shadow-lg p-3 animate-float">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="h-4 w-4 text-primary" />
                </div>
                <div className="text-xs">
                  <p className="font-medium">AI-Powered</p>
                  <p className="text-muted-foreground">Instant results</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-white rounded-lg shadow-lg p-3 animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div className="text-xs">
                  <p className="font-medium">500+ Items</p>
                  <p className="text-muted-foreground">Try-on ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
