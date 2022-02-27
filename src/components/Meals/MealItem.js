import React, { useContext } from "react";

import classes from "./MealItem.module.scss";
import MealItemForm from "./MealItemForm";

import CartItemsContext from "../../context/cart-items-context";

const MealItem = ({ id, name, price, description }) => {
  const cartCtx = useContext(CartItemsContext);

  //Creating item that will be sent to cart
  const addItemToCartHandler = (amount) => {
    cartCtx.addItemToCart({
      id: id,
      name: name,
      //This is amount passed from mealItemForm
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={classes["meals__list-item"]}>
      <div>
        <h3 className={classes["meals__list-item-name"]}>{name} </h3>
        <p className={classes["meals__list-item-desc"]}>{description}</p>
        <h4 className={classes["meals__list-item-price"]}>
          ${price.toFixed(2)}{" "}
        </h4>
      </div>
      <div>
        <MealItemForm onAddAmount={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
