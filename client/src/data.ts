import { Dish, Ingredients, UnsavedDish } from './EntryList';

export default async function readDishes(): Promise<Dish[]> {
  const req = {
    method: 'GET',
  };
  const res = await fetch('/api/dishes', req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function addDish(dish: UnsavedDish): Promise<Dish> {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dish),
  };
  const res = await fetch('/api/dishes', req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function addIngredients(
  dishId: number,
  ingredientName: string
): Promise<Ingredients> {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: ingredientName }),
  };
  const res = await fetch(`/api/dishes/${dishId}/ingredients`, req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}

export async function updateDish(dish: Dish): Promise<Dish> {
  const req = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dish),
  };
  console.log(
    'dishId right before fetch :',
    dish.id,
    Number(dish.id),
    typeof dish.id
  );
  const res = await fetch(`/api/dishes/${dish.id}`, req);
  console.log('client side fetch call dishId :', dish.id);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}
