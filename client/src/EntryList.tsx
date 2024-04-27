import { useState, useEffect } from 'react';
import readDishes from './data';

export type Ingredients = {
  ingredientId: number;
  name: string;
};

export type UnsavedDish = {
  title: string;
  photoUrl: string;
  tempIngredients: string;
};

export type Dish = UnsavedDish & {
  id: number;
};

type Props = {
  onCreate: () => void;
  onEdit: (dish: Dish) => void;
};

export default function EntryList({ onCreate, onEdit }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const dishes = await readDishes();
        setDishes(dishes);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error loading entries:
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  if (!dishes) return <div>No dishes found.</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="column-full">
          <h1 className="page-title">Dishes</h1>
          <h3>
            <button type="button" className="" onClick={onCreate}>
              NEW
            </button>
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="column-full">
          <ul className="dishes-ul">
            {dishes.map((dish) => (
              <Entry
                dishId={dish.id}
                key={dish.id}
                dish={dish}
                onEdit={onEdit}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type DishProps = {
  dish: Dish;
  dishId: number;
  onEdit: (entry: Dish) => void;
};

function Entry({ dish, onEdit, dishId }: DishProps) {
  console.log('dish within entry method before return:', dish);
  return (
    <li className="entry-container">
      <div className="row">
        <div className="column-half-photo">
          <img className="dish-photo" src={dish.photoUrl} alt="" />
        </div>
        <div className="column-half-info">
          <div className="row">
            <div>
              <h3 className="dishes-title">{dish.title}</h3>
              <button onClick={() => onEdit(dish)}>edit dish {dishId}</button>
            </div>
          </div>
          <p className="ingredients-list">{dish.tempIngredients}</p>
        </div>
      </div>
    </li>
  );
}
