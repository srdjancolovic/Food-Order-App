import React from "react";

import classes from "./MealsWrapper.module.scss";
const MealsWrapper = ({ children }) => {
  return <div className={classes["meals__wrapper"]}> {children} </div>;
};

export default MealsWrapper;
