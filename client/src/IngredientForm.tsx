import { useState, FormEvent } from 'react';
import { addIngredients } from './data';

interface IngredientFormProps {
  dishId: number;
}

export default function IngredientForm({ dishId }: IngredientFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ingredientName, setIngredientName] = useState<string>('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true);
      await addIngredients(dishId, ingredientName);
      setIngredientName('');
    } catch (err) {
      alert(`Error adding ingredient: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column-full">
          <h1 className="page-title">Add Ingredients</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="column-half input-half">
            <label>
              <input
                required
                className="label-input"
                type="text"
                value={ingredientName}
                placeholder="Ingredient Name..."
                onChange={(e) => setIngredientName(e.target.value)}
              />
            </label>
          </div>
          <div className="add-dish-btn-container">
            <button type="submit" disabled={isLoading} className="add-dish-btn">
              {isLoading ? 'Adding...' : 'Add Ingredient'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
