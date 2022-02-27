import React from "react";

import CartButton from "./CartButton";
import classes from "./Header.module.scss";
const Header = ({ onShow }) => {
  return (
    <header className={classes.header}>
      <h1 className={classes["header__logo"]}>Steak House</h1>
      <CartButton onClick={onShow} />
    </header>
  );
};

export default Header;
