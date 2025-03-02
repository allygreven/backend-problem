import 'dotenv/config';
import pg from 'pg';
import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';

type Movie = {
  title: string;
  summary: string;
  link: string;
  rating: number;
}

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());


app.get('/api/movies', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "movies";
    `;
    const result = await db.query<Movie>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});


app.get('/api/movies/:movieId', async (req, res, next) => {
  try {
    const { movieId } = req.params;
    if (!Number.isInteger(+movieId)) {
      throw new ClientError(400, 'Invalid movie');
    }
    const sql = `
      select * from "movies"
      where "movieId" = $1;
    `;
    const params = [movieId];
    const result = await db.query(sql, params);
    const movie = result.rows[0];
    if (!movie) throw new ClientError(404, 'Movie not found');
    res.json(movie);
  } catch (err) {
    next(err);
  }
});


app.post('/api/movies', async (req, res, next) => {
  try {
    const { title, summary, link, rating } = req.body;
    if (!title || !summary || !link || !rating) {
      throw new ClientError(400, 'Fields are required');
    }
    const sql = `
      insert into "movies" ("title", "summary", "link", "rating")
        values ($1, $2, $3, $4)
        returning *
    `;
    const params = [title, summary, link, rating];
    const result = await db.query<Movie>(sql, params);
    const [movie] = result.rows;
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});

app.put('/api/movies/:movieId', async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    const { title, summary, link, rating } = req.body;
    if (!title || !summary || !link || !rating) {
      throw new ClientError(400, 'Fields are required to update');
    }
    const sql = `
      update "movies"
        set "updatedAt" = now(),
            "isCompleted" = $1,
            "task" = $2
        where "todoId" = $3
        returning *
    `;
    const params = [title, summary, link, rating];
    const result = await db.query<Movie>(sql, params);
    const [movie] = result.rows;
    if (!movie) {
      throw new ClientError(404, `Cannot find movie with movieId ${movieId}`);
    }
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/movies/:movieId',
  async (req, res, next) => {
    try {
      const { movieId } = req.params;
      if (!movieId) {
        throw new ClientError(400, 'Invalid movie');
      }
      const sql = `
      delete from "movies"
      where "movieId" = $1
      returning *
    `;
      const result = await db.query(sql, [movieId]);
      if (result.rowCount === 0) {
        throw new ClientError(404, 'Movie not found');
      }
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
);


app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});