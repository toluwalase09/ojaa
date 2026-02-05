import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem, Product, ProductColor, ProductSize, Money } from '@/types/shop';

export interface CartItemWithProduct extends CartItem {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSize;
}

interface CartContextType {
  items: CartItemWithProduct[];
  itemCount: number;
  subtotal: number;
  currency: string;
  addItem: (product: Product, color: ProductColor, size: ProductSize, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string, colorId?: string, sizeId?: string) => boolean;
  getItemQuantity: (productId: string, colorId?: string, sizeId?: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ojaa_cart';

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setItems(parsedCart);
        }
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to storage:', error);
      }
    }
  }, [items, isLoaded]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => sum + item.price.amount * item.quantity, 0);

  const currency = items.length > 0 ? items[0].price.currency : 'NGN';

  const addItem = (
    product: Product,
    color: ProductColor,
    size: ProductSize,
    quantity: number = 1
  ) => {
    setItems((currentItems) => {
      // Check if item with same product, color, and size already exists
      const existingIndex = currentItems.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedColor.id === color.id &&
          item.selectedSize.id === size.id
      );

      if (existingIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return updatedItems;
      }

      // Add new item
      const newItem: CartItemWithProduct = {
        id: `cart_${product.id}_${color.id}_${size.id}_${Date.now()}`,
        productId: product.id,
        variantId: `${product.id}_${color.id}_${size.id}`,
        quantity,
        price: product.salePrice || product.price,
        product,
        selectedColor: color,
        selectedSize: size,
        addedAt: new Date().toISOString(),
      };

      return [...currentItems, newItem];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(itemId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: string, colorId?: string, sizeId?: string): boolean => {
    return items.some((item) => {
      if (item.productId !== productId) return false;
      if (colorId && item.selectedColor.id !== colorId) return false;
      if (sizeId && item.selectedSize.id !== sizeId) return false;
      return true;
    });
  };

  const getItemQuantity = (productId: string, colorId?: string, sizeId?: string): number => {
    const item = items.find((item) => {
      if (item.productId !== productId) return false;
      if (colorId && item.selectedColor.id !== colorId) return false;
      if (sizeId && item.selectedSize.id !== sizeId) return false;
      return true;
    });
    return item?.quantity || 0;
  };

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    currency,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    // Return safe fallback for SSR
    return {
      items: [],
      itemCount: 0,
      subtotal: 0,
      currency: 'NGN',
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      isInCart: () => false,
      getItemQuantity: () => 0,
    };
  }
  return context;
}
