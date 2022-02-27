import React, { useContext, useState } from "react";

import classes from "./CartAndCartItemStyles.module.scss";
import Modal from "../UI/Modal";
import ConfirmOrderForm from "./ConfirmOrderForm";
import CartItem from "./CartItem";
import CartItemsContext from "../../context/cart-items-context";

const Cart = ({ onHide }) => {
  const [showForm, setShowForm] = useState(false);
  const [submitingOrder, setSubmitingOrder] = useState(false);
  const [orderSubmited, setOrderSubmited] = useState(false);

  //Updating function for dispalying user info form

  const showFormHandler = () => {
    setShowForm(true);
  };

  //Cart context
  const cartCtx = useContext(CartItemsContext);

  //Functions for adding and removing items in/from cart
  const updateItemInCartHandler = (item) => {
    cartCtx.updateItemInCart(item);
  };

  const removeItemFromCartHandler = (id) => {
    cartCtx.removeItemFromCart(id);
  };

  //Sendig order data to server
  const submitOrderHandler = async (data) => {
    //Sending order and user data to dababase
    setSubmitingOrder(true);
    await fetch("https://steak-list-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        userInfo: data,
        orderInfo: cartCtx.items,
      }),
    });

    //Managing submiting state and clearing cart when order is sent
    setSubmitingOrder(false);
    setOrderSubmited(true);
    cartCtx.clearItemsFromCart();
  };

  //Rendering cart list
  const cartList = (
    <ul className={classes["cart__list"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          description={item.description}
          price={item.price}
          onUpdateCartItem={updateItemInCartHandler.bind(null, item)}
          onRemoveCartItem={removeItemFromCartHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  //Total amount and control buttons so that component is more readable
  const totalAmountOrderAndCancelBtn = (
    <div className={classes["cart__total-order-btns"]}>
      <div className={classes["cart__total-amount"]}>
        <h3 className={classes["cart__total-amount-text"]}>Total:</h3>
        <span className={classes["cart__total-amount-number"]}>
          ${cartCtx.totalAmount.toFixed(2)}{" "}
        </span>
      </div>
      {!showForm && (
        <div className={classes["cart__order-btns"]}>
          <button className={classes["cart__order-btn"]} onClick={onHide}>
            Cancel
          </button>
          <button
            className={classes["cart__order-btn"]}
            onClick={showFormHandler}
          >
            Order
          </button>
        </div>
      )}
    </div>
  );

  ///Empty cart message
  const emptyCartMsg = (
    <div className={classes["message-button"]}>
      <h4 className={classes["message-button__msg"]}>Cart is empty!</h4>
      <button className={classes["cart__order-btn"]} onClick={onHide}>
        Close
      </button>
    </div>
  );

  //Display empty cart message if there is no items in cart
  const displayMessage =
    cartCtx.items.length === 0 ? emptyCartMsg : totalAmountOrderAndCancelBtn;

  const submitingOrderMessage = (
    <h4 className={classes["sending-order-msg"]}>Receiving order...</h4>
  );

  const submitedMessage = (
    <div className={classes["sending-order-msg"]}>
      <h4>Order received! Thank you!</h4>
      <button className={classes["cart__order-btn"]} onClick={onHide}>
        Close
      </button>
    </div>
  );

  //List of meals in cart and order form
  const cartListAndOrderForm = (
    <div className={classes.cart}>
      {cartList}
      {displayMessage}
      {showForm && cartCtx.items.length !== 0 && (
        <ConfirmOrderForm onHide={onHide} onConfirmOrder={submitOrderHandler} />
      )}
    </div>
  );

  return (
    <Modal onClick={onHide}>
      {!submitingOrder && !orderSubmited && cartListAndOrderForm}
      {submitingOrder && submitingOrderMessage}
      {!submitingOrder && orderSubmited && submitedMessage}
    </Modal>
  );
};

export default Cart;
