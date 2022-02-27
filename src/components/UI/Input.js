import React from "react";

import classes from "../Cart/ConfirmOrderForm.module.scss";

const Input = React.forwardRef(({ input, label, showError }, ref) => {
  return (
    <div className={classes["user-info__input"]}>
      <label htmlFor={input.id} className={classes["user-info__input-label"]}>
        {!showError ? label : `Please enter valid ${input.id}!`}
      </label>
      <input
        ref={ref}
        className={
          !showError
            ? classes["user-info__input-field"]
            : classes["error-field-input"]
        }
        {...input}
      />
    </div>
  );
});

export default Input;
