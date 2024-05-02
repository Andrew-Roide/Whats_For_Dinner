import { useState, useEffect } from 'react';
import readDishes from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

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

export default function DishList({ onCreate, onEdit }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [dish, setDishes] = useState<Dish[]>([]);
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
  if (!dish) return <div>No dishes to display. Please create a new dish!</div>;

  if (dish.length === 0) {
    return (
      <div className="row">
        <div className="container column-full">
          <div className="flex justify-end">
            <h3 className="ml-8 mt-8 mb-8 text-xl active:translate-y-0.5">
              <button type="button" onClick={onCreate}>
                Create A New Dish
              </button>
            </h3>
          </div>
        </div>
        <div className="column-full bg-gray-400 bg-opacity-10 rounded-xl">
          <div className="text-center font-figtree text-xl">
            No dishes to display. Please create a new dish!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="container column-full">
        <div className="flex justify-end">
          <h3 className="ml-8 mt-8 text-xl active:translate-y-0.5">
            <button type="button" className="" onClick={onCreate}>
              Create A New Dish
            </button>
          </h3>
        </div>
      </div>
      <div className="column-full">
        <ul className="py-10 mt-9 ml-6">
          {dish.map((dish) => (
            <Entry dishId={dish.id} key={dish.id} dish={dish} onEdit={onEdit} />
          ))}
        </ul>
      </div>
    </div>
  );
}

type DishProps = {
  dish: Dish;
  dishId: number;
  onEdit: (entry: Dish) => void;
};

function Entry({ dish, onEdit }: DishProps) {
  return (
    <li className="mb-20 bg-gray-400 bg-opacity-10 rounded-xl">
      <div className="row flex p-8">
        <div className="column-half">
          <img
            className="drop-shadow max-h-screen max-w-2xl mb-4 aspect-auto ml-auto mr-4 block"
            src={dish.photoUrl}
            alt=""
          />
        </div>
        <div className="column-half">
          <div className="title-container">
            <div className="flex justify-between border-b-2 border-#EEEEEE-solid">
              <h3 className="font-figtree text-3xl font-semibold pl-6">
                {dish.title}
              </h3>
              <FontAwesomeIcon
                className="ml-6 h-6 cursor-pointer"
                onClick={() => onEdit(dish)}
                icon={faPenToSquare}
              />
            </div>
          </div>
          <p className="font-figtree pt-20 pl-6">{dish.tempIngredients}</p>
        </div>
      </div>
    </li>
  );
}
