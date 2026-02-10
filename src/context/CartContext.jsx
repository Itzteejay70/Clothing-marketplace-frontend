import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();
const STORAGE_KEY = "cart_items_v1";

// helper: unique key per cart line (product + size)
function lineKey(productId, selectedSize) {
  return `${productId}__${selectedSize}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // ✅ MUST include size (MVP rule)
  function addToCart(product, selectedSize) {
    const size = String(selectedSize || "").trim();

    if (!product?.id) throw new Error("Invalid product.");
    if (!size) throw new Error("Please select a size first.");

    const key = lineKey(product.id, size);

    setItems((prev) => {
      const found = prev.find((x) => x.key === key);
      if (found) {
        return prev.map((x) => (x.key === key ? { ...x, qty: x.qty + 1 } : x));
      }

      return [
        ...prev,
        {
          key,
          product,
          selectedSize: size,
          qty: 1,
        },
      ];
    });
  }

  // ✅ remove one line item (by key)
  function removeFromCart(key) {
    setItems((prev) => prev.filter((x) => x.key !== key));
  }

  function increment(key) {
    setItems((prev) =>
      prev.map((x) => (x.key === key ? { ...x, qty: x.qty + 1 } : x))
    );
  }

  function decrement(key) {
    setItems((prev) =>
      prev
        .map((x) => (x.key === key ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(() => {
    return items.reduce((sum, x) => sum + x.product.price * x.qty, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        subtotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
