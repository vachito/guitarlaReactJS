import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
  const initialCart = () => {
    const cartFromLocalStorage = localStorage.getItem("cart");
    return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
  };

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart());
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  function addToCart(item) {
    const ItemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (ItemExists >= 0) {
      if (cart[ItemExists].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[ItemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }

    saveLocalStorage();
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return { ...guitar, quantity: guitar.quantity + 1 };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return { ...guitar, quantity: guitar.quantity - 1 };
      }
      return guitar;
    });
    setCart(updatedCart);
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function saveLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Use memo, equivalenete a un computed en vuejs
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setCart,
    isEmpty,
    cartTotal,
  };
};
