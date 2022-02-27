import React, { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartItemsProvider from "./context/CartItemsProvider";
function App() {
  const [showCart, setShowCart] = useState(false);

  //Show and hide updating functions for displaying Cart
  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartItemsProvider>
      <Header onShow={showCartHandler} />
      {showCart && <Cart onHide={hideCartHandler} />}

      <Meals />
    </CartItemsProvider>
  );
}

export default App;
