import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar column-full">
            <span>Movie Maniac</span>
            <Link to="/" data-view="movies" className="nav-item">
              Movies
            </Link>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}