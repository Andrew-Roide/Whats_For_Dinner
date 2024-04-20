import { Dishes } from './EntryList';

export default async function readDishes(): Promise<Dishes[]> {
  const req = {
    method: 'GET',
  };
  const res = await fetch('/api/dishes', req);
  if (!res.ok) throw new Error(`Fetch Error ${res.status}`);
  return await res.json();
}
