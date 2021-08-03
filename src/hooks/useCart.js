import { createContext, useState, useContext, useEffect } from "react";
import { produtos } from "../produtos";
import { stock } from "../stock";
import { toast } from "react-toastify";

const CartContext = createContext([]);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("@RocketShoes:cart", JSON.stringify(cart));
  }, [cart]);

  function addCart(id) {
    const productFind = cart.find((product) => product.id === id);
    const [produt] = produtos.filter((produto) => produto.id === id);

    if (productFind) {
      const itemStock = stock.find((itemStock) => itemStock.id === id);
      if (itemStock.amount <= productFind.qtd) {
        return toast.error("Quantidade solicitada fora de estoque", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      const newState = cart.map((cartItem) => {
        const qtd = productFind.qtd + 1;

        return cartItem === productFind
          ? { ...productFind, qtd, price: produt.price * qtd }
          : cartItem;
      });
      setCart(newState);
    } else {
      setCart((oldState) => [...oldState, { ...produt, qtd: 1 }]);
    }
  }

  function remove(id) {
    const productFind = cart.find((product) => product.id === id);

    if (productFind !== undefined && productFind.qtd > 1) {
      const newState = cart.map((cartItem) => {
        const [produt] = produtos.filter((produto) => produto.id === id);
        const qtd = productFind.qtd - 1;

        return cartItem === productFind
          ? { ...productFind, qtd, price: produt.price * qtd }
          : cartItem;
      });
      setCart(newState);
    } else {
      const produt1 = cart.filter((cartItem) => cartItem.id !== id);
      setCart(produt1);
    }
  }

  function deleteItem(id) {
    const produt = cart.filter((cartItem) => cartItem.id !== id);
    setCart(produt);
  }

  return (
    <CartContext.Provider value={{ cart, addCart, remove, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
