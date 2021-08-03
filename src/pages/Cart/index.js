import React from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";

import { useCart } from "../../hooks/useCart";
import { Container, ProductTable, Total } from "./styles";

const Cart = () => {
  const { cart, addCart, remove, deleteItem } = useCart();

  const valueFinal = cart.reduce((acc, cartItem) => acc + cartItem.price, 0);

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem) => (
            <tr data-testid="product" key={cartItem.id}>
              <td>
                <img src={cartItem.image} alt={cartItem.title} />
              </td>
              <td>
                <strong>{cartItem.title}</strong>
                <span>
                  {new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(cartItem.price/cartItem.qtd)}
                </span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    onClick={() => remove(cartItem.id)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={cartItem.qtd}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    onClick={() => addCart(cartItem.id)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(cartItem.price)}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => deleteItem(cartItem.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>
            {new Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(valueFinal)}
          </strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
