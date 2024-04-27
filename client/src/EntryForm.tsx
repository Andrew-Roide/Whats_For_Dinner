import { type FormEvent, useState } from 'react';
import { Dish } from './EntryList';
import { addDish, updateDish } from './data';

type Props = {
  dish: Dish | null;
  onSubmit: () => void;
};

export default function EntryForm({ dish, onSubmit }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [title, setTitle] = useState(dish?.title ?? '');
  const [photoUrl, setPhotoUrl] = useState(dish?.photoUrl ?? '');
  const [tempIngredients, setTempIngredients] = useState(
    dish?.tempIngredients ?? ''
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const newDish = { title, photoUrl, tempIngredients };
    try {
      setIsLoading(true);
      if (dish) {
        console.log('Dish before fetch call :', dish);
        await updateDish({ ...dish, ...newDish });
      } else {
        await addDish(newDish);
      }
      onSubmit();
    } catch (err) {
      alert(`Error saving dish: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full">
          <h1 className="page-title">{dish ? 'Edit Dish' : 'New Dish'}</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="column-half">
            <img
              className="form-img"
              src={photoUrl || 'images/placeholder-image-square.jpg'}
              alt="entry"
            />
          </div>
          <div className="column-half input-half">
            <label>
              <input
                required
                className="label-input"
                type="text"
                value={title}
                placeholder="Dish Title..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <input
                required
                className="label-input"
                type="text"
                value={photoUrl}
                placeholder="Dishes Photo..."
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label>
              <input
                required
                className="label-input"
                type="text"
                value={tempIngredients}
                placeholder="Ingredients Used..."
                onChange={(e) => setTempIngredients(e.target.value)}
              />
            </label>
          </div>
          <div className="add-dish-btn-container">
            <button type="submit" disabled={isLoading} className="add-dish-btn">
              {isLoading ? 'Saving...' : 'Save Dish'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
