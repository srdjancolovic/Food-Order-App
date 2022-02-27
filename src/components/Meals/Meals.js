import React, { useEffect, useState } from "react";

import MealsWrapper from "../UI/MealsWrapper";
import MealItem from "./MealItem";
import classes from "./Meals.module.scss";

const Meals = () => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoadingMeals, setIsLoadingMeals] = useState(true);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        //Response from API
        const response = await fetch(
          "https://steak-list-default-rtdb.firebaseio.com/steaks.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong, try refreshing page!");
        }

        //Data from API
        const data = await response.json();

        let meals = [];

        //Loop through data and push each item into meals array
        for (const meal in data) {
          meals.push({
            id: meal,
            name: data[meal].name,
            description: data[meal].description,
            price: data[meal].price,
          });
        }
        //Push items to meals array and setLoadingMeals to false if everything is OK
        setMealsList(meals);
        setIsLoadingMeals(false);
        //Catch and dispaly errors if there are any
      } catch (error) {
        setIsLoadingMeals(false);
        setErrorMsg(error.message);
      }
    };

    fetchMeals();
  }, []);

  //Rendering meal items
  const mealsListItems = mealsList.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <main className={classes.meals}>
      {isLoadingMeals && <p className={classes["loading-msg"]}>Loading</p>}
      {errorMsg && <p className={classes["error-msg"]}>{errorMsg} </p>}
      {!isLoadingMeals && !errorMsg && (
        <MealsWrapper>{mealsListItems}</MealsWrapper>
      )}
    </main>
  );
};

export default Meals;
