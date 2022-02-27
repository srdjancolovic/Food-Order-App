import React from "react";

const CartItemsContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItemToCart: (item) => {},
  updateItemInCart: (item) => {},
  removeItemFromCart: (item) => {},
  clearItemsFromCart: (item) => {},
});

export default CartItemsContext;
