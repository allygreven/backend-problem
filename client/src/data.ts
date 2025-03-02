export type UnsavedMovie = {
    title: string;
    summary: string;
    link: string;
    rating: number;
  };

  export type Movie = UnsavedMovie & {
    movieId: number;
  };
  
  type Data = {
    movies: Movie[];
    nextMovieId: number;
  };
  
  const dataKey = 'code-journal-data';
  
  function readData(): Data {
    let data: Data;
    const localData = localStorage.getItem(dataKey);
    if (localData) {
      data = JSON.parse(localData) as Data;
    } else {
      data = {
        movies: [],
        nextMovieId: 1,
      };
    }
    return data;
  }
  
  function writeData(data: Data): void {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(dataKey, dataJSON);
  }
  
  export async function readMovies(): Promise<Movie[]> {
    return readData().movies;
  }
  
  export async function readMovie(movieId: number): Promise<Movie | undefined> {
    return readData().movies.find((e) => e.movieId === movieId);
  }
  
  export async function addMovie(movie: UnsavedMovie): Promise<Movie> {
    const data = readData();
    const newMovie = {
      ...movie,
      movieId: data.nextMovieId++,
    };
    data.movies.unshift(newMovie);
    writeData(data);
    return newMovie;
  }
  
  export async function updateMovie(movie: Movie): Promise<Movie> {
    const data = readData();
    const newMovies = data.movies.map((e) =>
      e.movieId === movie.movieId ? movie : e
    );
    data.movies = newMovies;
    writeData(data);
    return movie;
  }
  
  export async function removeMovie(movieId: number): Promise<void> {
    const data = readData();
    const updatedArray = data.movies.filter(
      (movie) => movie.movieId !== movieId
    );
    data.movies = updatedArray;
    writeData(data);
  }