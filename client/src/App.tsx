import { useState } from 'react';
import NavBar from './NavBar';
import { PageType } from './NavBar';
import DishForm from './DishForm';
import DishList from './DishList';
import { Dish } from './DishList';
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
        <DishForm dish={editing} onSubmit={() => setEditing(undefined)} />
      )}
      {page === 'view-dishes' && editing === undefined && (
        <DishList
          onCreate={() => setEditing(null)}
          onEdit={(entry) => setEditing(entry)}
        />
      )}
    </>
  );
}
