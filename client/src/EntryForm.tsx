// type Entry = {
//   id: number;
//   dishId: number;
//   title: string;
//   ingredientId: number;
//   photoUrl: string;
// };

// type Props = {
//   entry: Entry | null;
//   onSubmit: () => void;
// };

export default function EntryForm() {
  // const [isLoading, setIsLoading] = useState<boolean>();
  //const [title, setTitle] = useState(entry?.title ?? '');
  //const [photoUrl, setPhotoUrl] = useState(entry?.photoUrl ?? '');
  // const [isDeleting, setIsDeleting] = useState(false);

  // async function handleSubmit(event: FormEvent) {
  //   event.preventDefault();
  //   const newEntry = { title, photoUrl, notes };
  //   try {
  //     setIsLoading(true);
  //     if (entry) {
  //       await updateEntry({ ...entry, ...newEntry });
  //     } else {
  //       await addEntry(newEntry);
  //     }
  //     onSubmit();
  //   } catch (err) {
  //     alert(`Error saving changes: ${err}`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function handleDelete() {
  //   if (!entry) throw new Error('Should not happen');
  //   try {
  //     setIsLoading(true);
  //     await removeEntry(entry.entryId);
  //     onSubmit();
  //   } catch (err) {
  //     alert(`Error deleting entry: ${err}`);
  //   } finally {
  //     setIsLoading(false);
  //     setIsDeleting(false);
  //   }
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full d-flex justify-between">
          {/* <h1>{entry ? 'Edit Entry' : 'New Entry'}</h1> */}
          <h1>Entry</h1>
        </div>
      </div>
      <form>
        <div className="row margin-bottom-1">
          <div className="column-half">
            <img
              className="input-b-radius form-image"
              src={'images/placeholder-image-square.jpg'}
              alt="entry"
            />
          </div>
          <div className="column-half">
            <label className="margin-bottom-1 d-block">
              Title
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                value="item"
                // onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="margin-bottom-1 d-block">
              Photo URL
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                value={''}
                // onChange={(e) => setPhotoUrl(e.target.value)}
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
                className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                value={'notes'}
                // onChange={(e) => setNotes(e.target.value)}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
