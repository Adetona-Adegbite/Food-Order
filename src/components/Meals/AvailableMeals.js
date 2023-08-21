import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
      try {
        const response = await fetch(
          "https://react-post-c488a-default-rtdb.firebaseio.com/Meals.json"
        );
        setIsLoading(true);
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server!");
        }
        const data = await response.json();
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push(...data[key]);
        }
        console.log(loadedMeals);
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>{isLoading ? "Loading..." : <ul>{mealsList}</ul>}</Card>
    </section>
  );
};

export default AvailableMeals;
