/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import { type } from 'node:os';
import { nextTick } from 'node:process';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

type Entry = {
  dishId: number;
  title: string;
  ingredientId: number;
  photoUrl: string;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/dishes', async (req, res, next) => {
  try {
    const sql = `
    select "dishes"."id" as "dishId",
           "dishes"."title",
           "dishes"."photoUrl",
           "ingredients"."id" as "ingredientId",
           "ingredients"."name"
      from "dishes"
      join "dishIngredients" on "dishes"."id" = "dishIngredients"."dishId"
      join "ingredients" on "dishIngredients"."ingredientId" = "ingredients"."id"
      order by "dishes"."id" desc;
  `;
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (error) {
    next(error);
  }
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
