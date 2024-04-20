import { type FormEvent, useState } from 'react';
import { Dishes } from './EntryList';

type Props = {
  entry: Dishes | null | undefined;
  onSubmit: () => void;
};

export default function EntryForm({ entry, onSubmit }: Props) {
  // const [isLoading, setIsLoading] = useState<boolean>();
  const [title, setTitle] = useState(entry?.title ?? '');
  const [photoUrl, setPhotoUrl] = useState(entry?.photoUrl ?? '');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // const newEntry = { title, photoUrl };
    try {
      // setIsLoading(true);
      onSubmit();
    } catch (err) {
      alert(`Error saving changes: ${err}`);
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full">
          <h1>{entry ? 'Edit Dish' : 'New Dish'}</h1>
          <h1>Entry</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="column-half">
            <img
              className=""
              src={photoUrl || 'images/placeholder-image-square.jpg'}
              alt="entry"
            />
          </div>
          <div className="column-half">
            <label className="">
              Title
              <input
                required
                className=""
                type={title}
                value=""
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="">
              Photo URL
              <input
                required
                className=""
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="row margin-bottom-1">
          <div className="column-full">
            <label className="margin-bottom-1 d-block">
              Ingredients
              <textarea
                required
                className=""
                // value={'Ingredients'}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
