import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ➕ Add / Update item in cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, qty: p.qty + product.qty }
            : p
        );
      } else {
        return [...prev, product];
      }
    });
  };

  // ❌ Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // ✏️ Update quantity
  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCartItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: qty } : p
      )
    );
  };

  // 🧹 Clear cart (after order placed)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
