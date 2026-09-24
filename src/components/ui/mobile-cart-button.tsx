"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartSheet from "../cart/CartSheet";

export default function MobileCartButton() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <button
        className="fixed right-6 bottom-20 sm:bottom-6 z-40 flex w-fit items-center gap-1.5 rounded-2xl bg-blue-500 px-2.5 py-1 text-xs text-white transition-all duration-300 hover:bg-blue-500/90 md:text-sm"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCart className="h-3.5 w-3.5" />
        Carrinho
      </button>

      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
