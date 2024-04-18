export type PageType = 'home' | 'add-post' | 'sign-in' | 'sign-out';

// type Props = {
//   onNavigate: (page: PageType) => void;
// };
export default function NavBar() {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="column-full d-flex align-center">
            <h1 className="main-title">What's For Dinner</h1>
            <h3>
              <button
                type="button"
                // onClick={() => onNavigate('home')}
                className="entries-link white-text">
                Home
              </button>
              <button
                type="button"
                // onClick={() => onNavigate('add-post')}
                className="entries-link white-text">
                Add Post
              </button>
              <button
                type="button"
                // onClick={() => onNavigate('sign-in')}
                className="entries-link white-text">
                Sign In
              </button>
            </h3>
          </div>
        </div>
      </div>
    </header>
  );
}
