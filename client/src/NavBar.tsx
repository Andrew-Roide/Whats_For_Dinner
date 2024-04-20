export type PageType = 'home' | 'view-dishes' | 'sign-in' | 'sign-out';

type Props = {
  onNavigate: (page: PageType) => void;
};

export default function NavBar({ onNavigate }: Props) {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="column-full">
            <h1 className="main-title">What's For Dinner</h1>
            <h3>
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
