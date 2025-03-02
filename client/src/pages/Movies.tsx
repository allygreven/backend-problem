import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie, readMovies } from '../data';
import { MovieCard } from '../components/MovieCard';

export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEntries() {
      try {
        const values = await readMovies();
        setMovies(values);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadEntries();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error! {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  function onEditClick(movieId: number) {
    navigate(`movie/${movieId}`);
  }

  return (
    <div data-view="entries" className="entries-wrapper">
      <div className="entries-heading column-full">
        <h1>Movies</h1>
        <Link to="entry/new">
          <button
            type="button"
            className="new-movie-button"
            data-view="movie-form">
            New
          </button>
        </Link>
      </div>
      {movies.length < 1 && (
        <p className="no-entries-text">No entries have been recorded</p>
      )}
      <ul className="movie-list">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.movieId}
            movie={movie}
            onEditClick={(movieId) => onEditClick(movieId)}
          />
        ))}
      </ul>
    </div>
  );
}