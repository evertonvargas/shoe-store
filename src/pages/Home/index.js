import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { ProductList } from "./styles";
import { useCart } from "../../hooks/useCart";
import { produtos } from "../../produtos";

const Home = () => {
  const { cart, addCart } = useCart();
  const cartItemsAmount = cart.reduce(
    (acc, cartItem) => {
    const newAmount = { ...acc };
    newAmount[cartItem.id] = cartItem.qtd;
    return newAmount;
  }, 0);

  return (
    <ProductList>
      {produtos.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>
            {new Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => addCart(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
