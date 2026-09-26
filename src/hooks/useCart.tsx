"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/interface/products";

export type CartItem = Product & { quantity: number };

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "smbb-cart";

export function getChargeItemId(productId: string) {
  return `carga-${productId}`;
}

export function isChargeItem(itemId: string) {
  return itemId.startsWith("carga-");
}

type StoredCartItem =
  | { kind: "product"; id: string; quantity: number }
  | { kind: "charge"; item: CartItem };

function isStoredCartItem(value: unknown): value is StoredCartItem {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<StoredCartItem>;

  if (entry.kind === "charge") {
    const item = entry.item as CartItem | undefined;
    return (
      !!item &&
      typeof item === "object" &&
      typeof item.id === "string" &&
      typeof item.quantity === "number" &&
      Number.isFinite(item.quantity) &&
      item.quantity > 0
    );
  }

  const productEntry = entry as {
    kind?: string;
    id?: unknown;
    quantity?: unknown;
  };
  return (
    productEntry.kind === "product" &&
    typeof productEntry.id === "string" &&
    typeof productEntry.quantity === "number" &&
    Number.isFinite(productEntry.quantity) &&
    productEntry.quantity > 0
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function restoreCart() {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (!saved) return;

        const parsed: unknown = JSON.parse(saved);
        if (!Array.isArray(parsed)) return;

        const storedItems = parsed.filter(isStoredCartItem);
        if (!storedItems.length) return;

        const chargeEntries = storedItems.filter(
          (entry): entry is Extract<StoredCartItem, { kind: "charge" }> =>
            entry.kind === "charge"
        );
        const productEntries = storedItems.filter(
          (entry): entry is Extract<StoredCartItem, { kind: "product" }> =>
            entry.kind === "product"
        );

        let restored: CartItem[] = chargeEntries.map((entry) => entry.item);

        if (productEntries.length) {
          const response = await fetch("/api/products?type=product");
          if (response.ok) {
            const products = (await response.json()) as Product[];
            const productsById = new Map(
              products.map((product) => [product.id, product])
            );

            restored = restored.concat(
              productEntries.flatMap((entry) => {
                const product = productsById.get(entry.id);
                return product
                  ? [{ ...product, quantity: entry.quantity }]
                  : [];
              })
            );
          }
        }

        setItems(restored);
      } catch {
        window.localStorage.removeItem(storageKey);
      } finally {
        setIsHydrated(true);
      }
    }

    void restoreCart();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      const storedItems: StoredCartItem[] = items.map((item) =>
        isChargeItem(item.id)
          ? { kind: "charge", item }
          : { kind: "product", id: item.id, quantity: item.quantity }
      );
      window.localStorage.setItem(storageKey, JSON.stringify(storedItems));
    } catch {}
  }, [items, isHydrated]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems: items.reduce(
        (sum, item) => sum + (isChargeItem(item.id) ? 1 : item.quantity),
        0
      ),
      totalPrice: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      addItem: (product, quantity = 1) =>
        setItems((current) => {
          const existing = current.find((item) => item.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...current, { ...product, quantity }];
        }),
      removeItem: (productId) =>
        setItems((current) => current.filter((item) => item.id !== productId)),
      updateQuantity: (productId, quantity) =>
        setItems((current) =>
          quantity < 1
            ? current.filter((item) => item.id !== productId)
            : current.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              )
        ),
      clear: () => setItems([])
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}
