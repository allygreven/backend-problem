import { FaPencil } from 'react-icons/fa6';
import { Movie } from '../data';

type Props = {
  movie: Movie;
  onEditClick: (movieId: number) => void;
};

export function MovieCard({ movie, onEditClick }: Props) {
  return (
    <li data-entry-id={movie.movieId}>
      <div className="row">
        <div className="column-half">
          <div className="list-image-wrapper">
            <img src={movie.link} />
          </div>
        </div>
        <div className="column-half">
          <h2>
            {movie.title}
            <FaPencil
              className="edit"
              onClick={() => onEditClick(movie.movieId)}
            />
          </h2>
          <p>{movie.summary}</p>
          <span>{movie.link}</span>
          <div>{movie.rating}</div>
        </div>
      </div>
    </li>
  );
}