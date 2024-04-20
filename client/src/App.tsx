import { useState } from 'react';
import NavBar from './NavBar';
import { PageType } from './NavBar';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { Dishes } from './EntryList';
import './App.css';

export default function App() {
  const [page, setPage] = useState<PageType>('home');
  const [editing, setEditing] = useState<Dishes | null | undefined>();

  function handleNavigate(page: PageType) {
    setPage(page);
    if (page === 'home') {
      setEditing(undefined);
    }
  }

  return (
    <>
      <NavBar onNavigate={handleNavigate} />
      {page === 'home' && (
        <EntryForm entry={editing} onSubmit={() => setEditing(null)} />
      )}
      {page === 'view-dishes' && editing === undefined && (
        <EntryList onCreate={() => setEditing(null)} />
      )}
    </>
  );
}
