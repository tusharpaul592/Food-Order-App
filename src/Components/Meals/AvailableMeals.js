import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [HttpError, setHttpError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-5e15b-default-rtdb.firebaseio.com/meals.json')
      if (!response.ok) {
        throw new Error('Something went Wrong....');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, [])

  if (IsLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>);

  }
  if (HttpError) {
    return (
      <section className={classes.MealsError}>
        <p>{HttpError}</p>
      </section>);
  }
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
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
