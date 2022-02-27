import { useReducer } from "react";

import CartItemsContext from "./cart-items-context";

//Setting default cart state before everything else so I could manage it easier
const defaultCartItemsState = { items: [], totalAmount: 0 };

///////////
//////////Use reducer logic for managing state in cart

const cartItemsReducer = (state, action) => {
  ///If we want to add item that is already in cart or is added for the first time
  if (action.type === "ADD-ITEM") {
    //Update total amount when item is added
    const totalAmountUpdated =
      state.totalAmount + action.item.price * action.item.amount;

    //Check if item already exists in cart by searching for its index
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //Item that already existis in cart, so it can be used to update its current state if added multiple times
    const existingCartItem = state.items[existingCartItemIndex];

    //Variable that will contain updated info about items
    let updatedItems;

    //If item already existis, update it with new data,
    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      //Keep existing items
      updatedItems = [...state.items];

      //Override data of existing cart item with with new updated data
      updatedItems[existingCartItemIndex] = updatedCartItem;
    } else {
      //If item is added for the first time in cart, add it on list
      updatedItems = state.items.concat(action.item);
    }

    return {
      //Return new updated data
      items: updatedItems,
      totalAmount: totalAmountUpdated,
    };
  }

  ///Update item by 1

  if (action.type === "UPDATE-ITEM") {
    //Update total amount when item is updated in cart
    const totalAmountUpdated = state.totalAmount + action.item.price;

    //Find existing item in cart via find index
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //Target item in cart
    const existingCartItem = state.items[existingCartItemIndex];

    //Variable that will contain updated info about items
    let updatedItems;

    //If target item exists, update its data
    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };

      //Keep existing items
      updatedItems = [...state.items];

      //Override data of existing cart item with with new updated data
      updatedItems[existingCartItemIndex] = updatedCartItem;
    }

    return {
      //Return new updated data
      items: updatedItems,
      totalAmount: totalAmountUpdated,
    };
  }

  ///If we want to decerese amount of item or delete it from cart
  if (action.type === "REMOVE-ITEM") {
    //Find the item we want to delete
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    //Existing cart item
    const existingCartItem = state.items[existingCartItemIndex];

    //Updated total amount
    const totalAmountUpdated = state.totalAmount - existingCartItem.price;

    let updatedItems;

    //If there is only one item left, when minus is pressed, it will delete it from cart
    if (existingCartItem.amount === 1) {
      //If there is only one item left and we want to delete it, we filter all other items in cart
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //If there are multiple same items, reduce their amount by one
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      //Keep existing items
      updatedItems = [...state.items];

      //Override target item with new data
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: totalAmountUpdated,
    };
  }

  //////Clear cart and return default state
  if (action.type === "CLEAR-CART") {
    return defaultCartItemsState;
  }
};

//Making cart provider function where I will output logic to cart items context with a help of useReducer
const CartItemsProvider = ({ children }) => {
  //Setting up useReducer function
  const [cartItemsState, dispatchCartItemsAction] = useReducer(
    cartItemsReducer,
    defaultCartItemsState
  );

  //Dispatching action for addItemToCart function, I use ITEM here because I will pass this function as value for addItemToCart in cart items context
  //and this item will be the one we add from meals list
  const addItemToCartHandler = (item) => {
    dispatchCartItemsAction({ type: "ADD-ITEM", item: item });
  };

  const updateItemInCartHandler = (item) => {
    dispatchCartItemsAction({ type: "UPDATE-ITEM", item: item });
  };

  //This function will be passed to removeItemFromCart in cart items context as value, I'm using ID here so I can identify item I want to delete
  const removeItemFromCartHandler = (id) => {
    dispatchCartItemsAction({ type: "REMOVE-ITEM", id: id });
  };

  //Clear items from cart when order is submited
  const clearCartHandler = () => {
    dispatchCartItemsAction({ type: "CLEAR-CART" });
  };

  //Updated cartItemsContext which will be default value we provide to components. It is updated with help of useReducer logic
  const cartItemsContext = {
    items: cartItemsState.items,
    totalAmount: cartItemsState.totalAmount,
    addItemToCart: addItemToCartHandler,
    updateItemInCart: updateItemInCartHandler,
    removeItemFromCart: removeItemFromCartHandler,
    clearItemsFromCart: clearCartHandler,
  };

  //Returning CartItemsContext so we can provide it anywhere we need witih inital value of cart items context which is updated above
  return (
    <CartItemsContext.Provider value={cartItemsContext}>
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
