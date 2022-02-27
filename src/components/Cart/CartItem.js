import React from "react";
import classes from "./CartAndCartItemStyles.module.scss";

const CartItem = ({
  name,
  price,
  amount,
  onRemoveCartItem,
  onUpdateCartItem,
}) => {
  return (
    <li className={classes["cart__list-item"]}>
      <div>
        <h3 className={classes["cart__list-item-name"]}>{name} </h3>
        <div className={classes["cart__list-item-details"]}>
          <span className={classes["cart__list-item-price"]}>
            ${price.toFixed(2)}
          </span>
          <span className={classes["cart__list-item-amount"]}>x {amount}</span>
        </div>
      </div>
      <div className={classes["cart__list-item-action-btns"]}>
        <button
          className={classes["cart__list-item-action-btn"]}
          onClick={onRemoveCartItem}
        >
          -
        </button>
        <button
          className={classes["cart__list-item-action-btn"]}
          onClick={onUpdateCartItem}
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
