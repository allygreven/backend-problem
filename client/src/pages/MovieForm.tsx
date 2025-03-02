import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { useEffect, useState } from 'react';
import { Movie, readMovie, removeMovie} from '../data';
import { FormMovie } from '../components/FormMovie';


export function MovieForm() {
  const { movieId } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovie(movieId: number) {
      try {
        const movie = await readMovie(movieId);
        setMovie(movie);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (movieId === 'new') {
      setIsLoading(false);
      setMovie({ title: '', summary: '', link: '', rating: 0, movieId: 0 });
    } else if (movieId) {
      setIsLoading(true);
      loadMovie(+movieId);
    }
  }, [movieId]);

  if (isLoading) return <div>Loading...</div>;

  if (error || !movie) {
    return (
      <div>
        Error Loading Movie {movieId}:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <>
      <div data-view="entry-form" className="entry-form-wrapper">
        <FormMovie movie={movie} onDeleteClick={() => setIsOpen(true)} />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>
          <strong>Are you sure you want to delete this movie?</strong>
        </p>
        <div className="modal-actions">
          <button onClick={() => setIsOpen(false)} className="cancel-modal">
            CANCEL
          </button>
          <button
            onClick={() => {
              removeMovie(movie.movieId);
              alert('Okay fine, its deleted!');
              setIsOpen(false);
              navigate('/');
            }}
            className="confirm-modal">
            CONFIRM
          </button>
        </div>
      </Modal>
    </>
  );
}