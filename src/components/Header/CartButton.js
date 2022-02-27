import React, { useContext } from "react";

import classes from "./CartButton.module.scss";
import CartItemsContext from "../../context/cart-items-context";

import { ImCart } from "react-icons/im";
const CartButton = ({ onClick }) => {
  const cartCtx = useContext(CartItemsContext);

  //Cart number of items
  const numOfCartItems = cartCtx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  return (
    <button className={classes["order-btn"]} onClick={onClick}>
      <ImCart className={classes["order-btn__icon"]} />
      <span className={classes["order-btn__desc"]}>Your Order</span>
      <span className={classes["order-btn__item-num"]}>{numOfCartItems} </span>
    </button>
  );
};
export default CartButton;
