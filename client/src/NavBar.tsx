export type PageType = 'home' | 'view-dishes' | 'sign-in' | 'sign-out';

type Props = {
  onNavigate: (page: PageType) => void;
};

export default function NavBar({ onNavigate }: Props) {
  return (
    <header className="header">
      <div className="container">
        <div>
          <div className="column-full nav-bar-container">
            <h1 className="main-title" onClick={() => onNavigate('home')}>
              What's For Dinner
            </h1>
            <h3 className="nav-buttons">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="entries-link">
                Home
              </button>
              <button
                type="button"
                onClick={() => onNavigate('view-dishes')}
                className="entries-link">
                View Dishes
              </button>
              <button
                type="button"
                onClick={() => onNavigate('sign-in')}
                className="entries-link">
                Sign In
              </button>
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
}
