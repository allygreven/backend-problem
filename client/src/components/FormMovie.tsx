import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie, Movie, updateMovie } from '../data';

type Props = {
  movie: Movie;
  onDeleteClick: () => void;
};

export function FormMovie({ movie, onDeleteClick }: Props) {
  const [link, setLink] = useState(movie.link);
  const [title, setTitle] = useState(movie.title);
  const [summary, setSummary] = useState(movie.summary);
  const [rating, setRating] = useState(movie.rating)
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (movie.movieId === 0) {
      await addMovie({ title, summary, link, rating });
    } else {
      await updateMovie({ title, summary, link, rating, movieId: movie.movieId });
    }
    navigate('/');
  }

  return (
    <form id="entry-form" onSubmit={handleSubmit}>
      <div className="column-full">
        <h1 className="new-entry-header">
          {movie.movieId === 0 ? 'New Movie' : 'Edit Movie'}
        </h1>
      </div>
      <div className="row">
        <div className="photo-wrapper column-half">
          <img
            id="entry-image"
            src={
              link !== ''
                ? link
                : '/images/placeholder-image-square.jpg'
            }
            alt="Placeholder image"
          />
        </div>
        <div className="column-half">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="link">IMDB Link</label>
          <input
            id="photo-url"
            type="url"
            name="photoUrl"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="column-full">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            id="notes"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}></textarea>
          <div className="form-actions">

          <label htmlFor="rating">Rating</label>
          <select
  id="rating"
  name="rating"
  required
  value={rating}
  onChange={(e) => setRating(Number(e.target.value))}
>
  <option value="">Select a rating</option>
  <option value="1">1 - Poor</option>
  <option value="2">2 - Fair</option>
  <option value="3">3 - Good</option>
  <option value="4">4 - Very Good</option>
  <option value="5">5 - Excellent</option>
</select>

            <button
              onClick={onDeleteClick}
              className={'delete-button' + (movie.movieId === 0 ? ' hide' : '')}
              type="button">
              Delete Movie
            </button>
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}