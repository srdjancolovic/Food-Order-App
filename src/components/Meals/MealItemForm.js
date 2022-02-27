import { useRef } from "react";

import classes from "./MealItemForm.module.scss";

const MealItemForm = ({ onAddAmount }) => {
  //Using useState to show/hide error message if input is not valid
  const amountRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    //Getting entered amount value from input
    const amount = amountRef.current.value;
    const amountNumber = +amount;

    //Passing amount number from form
    onAddAmount(amountNumber);
  };

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <label htmlFor="amount" className={classes["form__label"]}>
        Amount
      </label>
      <input
        ref={amountRef}
        type="number"
        className={classes["form__input"]}
        id="amount"
        min={1}
        max={10}
        defaultValue={1}
      />

      <button className={classes["form__btn"]}>Add</button>
    </form>
  );
};

export default MealItemForm;
