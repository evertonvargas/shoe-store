import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';
import { useCart } from '../../hooks/useCart';

const Header = ()=> {
  const { cart } = useCart();

  return (
    <Container>
      <Link to="/">
        <h1>Logo</h1>
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span data-testid="cart-size">
            {cart.length} itens
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};

export default Header;
