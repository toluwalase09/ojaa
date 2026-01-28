import { useState } from "react";
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ColorSwatch, EcoTagBadge } from "./ProductCard";
import type { ProductFilters, ProductColor, ProductSize, Brand, EcoTag } from "@/types/shop";
import { ECO_TAG_LABELS } from "@/types/shop";

interface FilterPanelProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  availableColors: ProductColor[];
  availableSizes: ProductSize[];
  availableBrands: Brand[];
  availableEcoTags: EcoTag[];
  priceRange: { min: number; max: number };
  currencySymbol: string;
  className?: string;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  availableColors,
  availableSizes,
  availableBrands,
  availableEcoTags,
  priceRange,
  currencySymbol,
  className,
}: FilterPanelProps) {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    filters.priceMin ?? priceRange.min,
    filters.priceMax ?? priceRange.max,
  ]);

  const activeFilterCount = countActiveFilters(filters);

  const updateFilter = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: "colors" | "sizes" | "brands" | "ecoTags", value: string) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated.length > 0 ? updated : undefined);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    setLocalPriceRange([priceRange.min, priceRange.max]);
  };

  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]]);
  };

  const applyPriceFilter = () => {
    updateFilter("priceMin", localPriceRange[0]);
    updateFilter("priceMax", localPriceRange[1]);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Clear All */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Clear all ({activeFilterCount})
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["sizes", "colors", "price"]} className="space-y-2">
        {/* Try-On Filter */}
        <div className="py-3 border-b">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={filters.hasVirtualTryOn ?? false}
              onCheckedChange={(checked) => updateFilter("hasVirtualTryOn", checked || undefined)}
            />
            <span className="text-sm font-medium">Virtual Try-On Only</span>
            <Badge variant="secondary" className="text-[10px]">NEW</Badge>
          </label>
        </div>

        {/* Sizes */}
        <AccordionItem value="sizes" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            Size
            {filters.sizes?.length ? (
              <Badge variant="secondary" className="ml-2 text-[10px]">
                {filters.sizes.length}
              </Badge>
            ) : null}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pb-4">
              {availableSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => toggleArrayFilter("sizes", size.id)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md border transition-colors",
                    filters.sizes?.includes(size.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:border-primary/50"
                  )}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem value="colors" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            Color
            {filters.colors?.length ? (
              <Badge variant="secondary" className="ml-2 text-[10px]">
                {filters.colors.length}
              </Badge>
            ) : null}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 pb-4">
              {availableColors.map((color) => (
                <ColorSwatch
                  key={color.id}
                  color={color}
                  size="md"
                  selected={filters.colors?.includes(color.id)}
                  onClick={() => toggleArrayFilter("colors", color.id)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pb-4">
              <Slider
                value={localPriceRange}
                min={priceRange.min}
                max={priceRange.max}
                step={100}
                onValueChange={handlePriceChange}
                onValueCommit={applyPriceFilter}
                className="py-4"
              />
              <div className="flex items-center justify-between text-sm">
                <span>
                  {currencySymbol}{localPriceRange[0].toLocaleString()}
                </span>
                <span>
                  {currencySymbol}{localPriceRange[1].toLocaleString()}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            Brand
            {filters.brands?.length ? (
              <Badge variant="secondary" className="ml-2 text-[10px]">
                {filters.brands.length}
              </Badge>
            ) : null}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pb-4 max-h-48 overflow-y-auto">
              {availableBrands.map((brand) => (
                <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.brands?.includes(brand.id)}
                    onCheckedChange={() => toggleArrayFilter("brands", brand.id)}
                  />
                  <span className="text-sm">{brand.name}</span>
                  {brand.isVerified && (
                    <Badge variant="outline" className="text-[10px] px-1 py-0">Verified</Badge>
                  )}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Eco Tags */}
        <AccordionItem value="eco" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            Sustainability
            {filters.ecoTags?.length ? (
              <Badge variant="secondary" className="ml-2 text-[10px]">
                {filters.ecoTags.length}
              </Badge>
            ) : null}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pb-4">
              {availableEcoTags.map((tag) => (
                <label key={tag} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.ecoTags?.includes(tag)}
                    onCheckedChange={() => toggleArrayFilter("ecoTags", tag)}
                  />
                  <EcoTagBadge tag={tag} size="md" />
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Filters */}
        <AccordionItem value="more" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
            More Filters
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.isOnSale ?? false}
                  onCheckedChange={(checked) => updateFilter("isOnSale", checked || undefined)}
                />
                <span className="text-sm">On Sale</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.isNew ?? false}
                  onCheckedChange={(checked) => updateFilter("isNew", checked || undefined)}
                />
                <span className="text-sm">New Arrivals</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.inStock ?? true}
                  onCheckedChange={(checked) => updateFilter("inStock", checked ?? undefined)}
                />
                <span className="text-sm">In Stock Only</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// Mobile Filter Sheet
interface MobileFilterSheetProps extends FilterPanelProps {
  productCount: number;
}

export function MobileFilterSheet(props: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);
  const activeFilterCount = countActiveFilters(props.filters);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-[10px]">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center justify-between">
            <span>Filters</span>
            <span className="text-sm font-normal text-muted-foreground">
              {props.productCount} products
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-[calc(100%-8rem)] py-4">
          <FilterPanel {...props} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                props.onFiltersChange({});
                setOpen(false);
              }}
            >
              Clear All
            </Button>
            <Button className="flex-1" onClick={() => setOpen(false)}>
              Show {props.productCount} Results
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Active Filter Pills
interface ActiveFilterPillsProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  availableColors: ProductColor[];
  availableSizes: ProductSize[];
  availableBrands: Brand[];
}

export function ActiveFilterPills({
  filters,
  onFiltersChange,
  availableColors,
  availableSizes,
  availableBrands,
}: ActiveFilterPillsProps) {
  const removeFilter = (key: keyof ProductFilters, value?: string) => {
    if (value && Array.isArray(filters[key])) {
      const updated = (filters[key] as string[]).filter((v) => v !== value);
      onFiltersChange({
        ...filters,
        [key]: updated.length > 0 ? updated : undefined,
      });
    } else {
      const { [key]: _, ...rest } = filters;
      onFiltersChange(rest);
    }
  };

  const pills: { key: keyof ProductFilters; value: string; label: string }[] = [];

  // Size pills
  filters.sizes?.forEach((sizeId) => {
    const size = availableSizes.find((s) => s.id === sizeId);
    if (size) {
      pills.push({ key: "sizes", value: sizeId, label: `Size: ${size.name}` });
    }
  });

  // Color pills
  filters.colors?.forEach((colorId) => {
    const color = availableColors.find((c) => c.id === colorId);
    if (color) {
      pills.push({ key: "colors", value: colorId, label: `Color: ${color.name}` });
    }
  });

  // Brand pills
  filters.brands?.forEach((brandId) => {
    const brand = availableBrands.find((b) => b.id === brandId);
    if (brand) {
      pills.push({ key: "brands", value: brandId, label: brand.name });
    }
  });

  // Eco tag pills
  filters.ecoTags?.forEach((tag) => {
    pills.push({ key: "ecoTags", value: tag, label: ECO_TAG_LABELS[tag] });
  });

  // Boolean filters
  if (filters.hasVirtualTryOn) {
    pills.push({ key: "hasVirtualTryOn", value: "", label: "Virtual Try-On" });
  }
  if (filters.isOnSale) {
    pills.push({ key: "isOnSale", value: "", label: "On Sale" });
  }
  if (filters.isNew) {
    pills.push({ key: "isNew", value: "", label: "New Arrivals" });
  }

  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((pill, index) => (
        <Badge
          key={`${pill.key}-${pill.value}-${index}`}
          variant="secondary"
          className="gap-1 pr-1"
        >
          {pill.label}
          <button
            onClick={() => removeFilter(pill.key, pill.value || undefined)}
            className="ml-1 rounded-full p-0.5 hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 text-xs"
        onClick={() => onFiltersChange({})}
      >
        Clear all
      </Button>
    </div>
  );
}

// Helper function
function countActiveFilters(filters: ProductFilters): number {
  let count = 0;
  if (filters.sizes?.length) count += filters.sizes.length;
  if (filters.colors?.length) count += filters.colors.length;
  if (filters.brands?.length) count += filters.brands.length;
  if (filters.ecoTags?.length) count += filters.ecoTags.length;
  if (filters.priceMin !== undefined || filters.priceMax !== undefined) count += 1;
  if (filters.hasVirtualTryOn) count += 1;
  if (filters.isOnSale) count += 1;
  if (filters.isNew) count += 1;
  if (filters.inStock === false) count += 1;
  return count;
}
