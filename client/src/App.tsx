import { useState } from 'react';
import NavBar from './NavBar';
import { PageType } from './NavBar';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { Dish } from './EntryList';
import './App.css';

export default function App() {
  const [page, setPage] = useState<PageType>('view-dishes');
  const [editing, setEditing] = useState<Dish | null | undefined>();

  function handleNavigate(page: PageType) {
    setPage(page);
    if (page === 'view-dishes') {
      setEditing(undefined);
    }
  }

  return (
    <>
      <NavBar onNavigate={handleNavigate} />
      {page === 'view-dishes' && editing !== undefined && (
        <EntryForm dish={editing} onSubmit={() => setEditing(undefined)} />
      )}
      {page === 'view-dishes' && editing === undefined && (
        <EntryList
          onCreate={() => setEditing(null)}
          onEdit={(entry) => setEditing(entry)}
        />
      )}
    </>
  );
}
