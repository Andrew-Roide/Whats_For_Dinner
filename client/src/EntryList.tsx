import { useState, useEffect } from 'react';
import readDishes from './data';

export type Ingredient = {
  id: number;
  name: string;
};

export type Dishes = {
  id: number;
  title: string;
  photoUrl: string;
  ingredients: Ingredient[];
};

type Props = {
  onCreate: () => void;
};

export default function EntryList({ onCreate }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [dishes, setDishes] = useState<Dishes[]>([]);
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
  if (!dishes || dishes.length === 0) return <div>No dishes found.</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="column-full">
          <h1>Dishes</h1>
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
              <div key={dish.id}>
                <h2>{dish.title}</h2>
                <img
                  className="dish-photo"
                  src={dish.photoUrl}
                  alt={dish.title}
                />
                <h3>Ingredients:</h3>
                <ul>
                  {dish.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
