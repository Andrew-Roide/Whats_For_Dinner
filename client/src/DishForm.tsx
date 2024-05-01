import { type FormEvent, useState } from 'react';
import { Dish } from './DishList';
import { addDish, updateDish, deleteDish } from './data';

type Props = {
  dish: Dish | null;
  onSubmit: () => void;
};

export default function DishForm({ dish, onSubmit }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [title, setTitle] = useState(dish?.title ?? '');
  const [photoUrl, setPhotoUrl] = useState(dish?.photoUrl ?? '');
  const [tempIngredients, setTempIngredients] = useState(
    dish?.tempIngredients ?? ''
  );
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const newDish = { title, photoUrl, tempIngredients };
    try {
      setIsLoading(true);
      if (dish) {
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

  async function handleDelete() {
    if (!dish) throw new Error('Should not happen');
    try {
      setIsLoading(true);
      await deleteDish(dish.id);
      onSubmit();
    } catch (err) {
      alert(`Error deleting entry: ${err}`);
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="column-full">
        <h1 className="text-center font-semibold font-figtree m-8 text-3xl">
          {dish ? 'Edit Dish' : 'New Dish'}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="column-half">
            <img
              className="drop-shadow max-h-screen mb-4 aspect-auto ml-auto mr-4 block"
              src={photoUrl || 'images/placeholder-image-square.jpg'}
              alt="entry"
            />
          </div>
          <div className="column-half flex flex-col ml-4 mt-4">
            <label>
              <input
                required
                className="font-figtree text-xl border-b-2 border-#EEEEEE-solid mb-10"
                type="text"
                value={title}
                placeholder="Dish Title..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <input
                required
                className="font-figtree text-xl border-b-2 border-#EEEEEE-solid mb-10"
                type="text"
                value={photoUrl}
                placeholder="Dishes Photo..."
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label>
              <input
                required
                className="font-figtree text-xl border-b-2 border-#EEEEEE-solid mb-10"
                type="text"
                value={tempIngredients}
                placeholder="Ingredients Used..."
                onChange={(e) => setTempIngredients(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="">
            {dish && (
              <button
                disabled={isLoading}
                className="font-figtree flex flex-col ml-4 mt-4 text-xl active:translate-y-0.5"
                type="button"
                onClick={() => setIsDeleting(true)}>
                Delete Entry
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="font-figtree flex flex-col ml-4 mt-4 text-xl active:translate-y-0.5">
            {isLoading ? 'Saving...' : 'Save Dish'}
          </button>
        </div>
      </form>
      {isDeleting && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete Dish?</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsDeleting(false)}>
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Are you sure you would like to delete this dish?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setIsDeleting(false)}>
                    Close
                  </button>
                  <button
                    className="bg-gray-300 text- active:bg-gray-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDelete}>
                    Delete Dish
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
