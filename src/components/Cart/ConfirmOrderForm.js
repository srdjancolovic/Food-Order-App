import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./ConfirmOrderForm.module.scss";

const ConfirmOrderForm = ({ onHide, onConfirmOrder }) => {
  //Simple form validation validation
  const validInput = (val) => val.trim().length > 3;

  //Using this as inital state so I can manage error messages
  const [validForm, setValidForm] = useState({
    name: true,
    address: true,
    phone: true,
  });

  //Input refs to get values from input
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  //Submit order
  const submitOrderForm = (e) => {
    e.preventDefault();

    //Get values from input
    const nameInfo = nameRef.current.value;
    const addressInfo = addressRef.current.value;
    const phoneInfo = phoneRef.current.value;

    //Check input validity
    const validNameInfo = validInput(nameInfo);
    const validAddressInfo = validInput(addressInfo);
    const validPhoneInfo = validInput(phoneInfo);

    //Managing inital form state
    setValidForm({
      name: validNameInfo,
      address: validAddressInfo,
      phone: validPhoneInfo,
    });

    //Form is valid if all inputs are valid

    const formIsValid = validNameInfo && validAddressInfo && validPhoneInfo;

    if (!formIsValid) {
      return;
    }

    //Passing data to Cart component to send it to server
    onConfirmOrder({
      name: nameInfo,
      address: addressInfo,
      phone: phoneInfo,
    });
  };

  return (
    <form onSubmit={submitOrderForm} className={classes["user-info"]}>
      <Input
        showError={!validForm.name}
        label="Name"
        ref={nameRef}
        input={{
          id: "name",
          type: "text",
        }}
      />
      <Input
        showError={!validForm.address}
        label="Address"
        ref={addressRef}
        input={{
          id: "address",
          type: "text",
        }}
      />
      <Input
        showError={!validForm.phone}
        label="Phone"
        ref={phoneRef}
        input={{
          id: "phone",
          type: "tel",
        }}
      />
      <div className={classes["user-info__buttons"]}>
        <button className={classes["user-info__button"]} onClick={onHide}>
          Cancel
        </button>
        <button className={classes["user-info__button"]}>Confirm</button>
      </div>
    </form>
  );
};

export default ConfirmOrderForm;
