export type PageType = 'home' | 'view-dishes' | 'sign-in' | 'sign-out';

type Props = {
  onNavigate: (page: PageType) => void;
};

export default function NavBar({ onNavigate }: Props) {
  return (
    <header>
      <div className="border-b-2 border-#EEEEEE-solid">
        <div className="flex justify-between">
          <h1
            className="text-4xl font-questrial font-semibold"
            onClick={() => onNavigate('view-dishes')}>
            What's For Dinner
          </h1>
          <h3 className="">
            {/* <button
              type="button"
              onClick={() => onNavigate('home')}
              className="entries-link">
              Home
            </button> */}
            <button
              type="button"
              onClick={() => onNavigate('view-dishes')}
              className="text-2xl cursor-pointer font-questrial">
              View Dishes
            </button>
            {/* <button
              type="button"
              onClick={() => onNavigate('sign-in')}
              className="entries-link">
              Sign In
            </button> */}
          </h3>
        </div>
      </div>
    </header>
  );
}
