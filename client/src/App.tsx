import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Movies } from './pages/Movies';
import { MovieForm } from './pages/MovieForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Movies />} />
        <Route path="movie/:movieId" element={<MovieForm />} />
      </Route>
    </Routes>
  );
}