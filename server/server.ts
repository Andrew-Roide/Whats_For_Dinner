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
  id: number;
  dishId: number;
  title: string;
  ingredientId: number;
  photoUrl: string;
  tempIngredients: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
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
      select "dishes"."id",
             "dishes"."title",
             "dishes"."photoUrl",
             "dishes"."tempIngredients",
             JSON_AGG(json_build_object(
               'ingredientId', "ingredients"."id",
               'name', "ingredients"."name"
             )) as "ingredients"
      from "dishes"
      left join "dishIngredients" on "dishes"."id" = "dishIngredients"."dishId"
      left join "ingredients" on "dishIngredients"."ingredientId" = "ingredients"."id"
      group by "dishes"."id", "dishes"."title", "dishes"."photoUrl", "dishes"."tempIngredients"
      order by "dishes"."id" desc;
    `;
    const result = await db.query(sql);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.post('/api/dishes', async (req, res, next) => {
  try {
    const { title, photoUrl, tempIngredients } = req.body as Partial<Entry>;
    if (!title || !photoUrl) {
      throw new ClientError(400, 'title and photoUrl are required fields');
    }

    const sql = `
      insert into "dishes" ("title", "photoUrl", "tempIngredients")
      values ($1, $2, $3)
      returning *;
    `;
    const params = [title, photoUrl, tempIngredients];
    const result = await db.query<Entry>(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.post('/api/dishes/:dishId/ingredients', async (req, res, next) => {
  const dishId = Number(req.params.dishId);
  const { name } = req.body;
  try {
    // findOrCreateNewIngredient
    // find ingredient by name
    // if true, we have the same ingredient in db - grab the ingredient id --> insert new row in dishIngredients table --> adds the ingredient to the dish
    // else, you first create a new ingredient (by name)

    const existingIngredient = `
    select * from "ingredients" where "name" = $1 limit 1;
  `;
    const existingIngredientParams = [name];
    const existingIngredientResult = await db.query<Entry>(
      existingIngredient,
      existingIngredientParams
    );

    let ingredientId;

    if (existingIngredientResult.rows.length > 0) {
      ingredientId = existingIngredientResult.rows[0].id;
    } else {
      const createIngredient = `
      insert into "ingredients" ("name")
      values ($1)
      returning id;
    `;
      const createIngredientParams = [name];
      const createdIngredientResult = await db.query<Entry>(
        createIngredient,
        createIngredientParams
      );
      ingredientId = createdIngredientResult.rows[0].id;
    }

    const insertDishIngredient = `
    insert into "dishIngredients" ("dishId", "ingredientId")
    values ($1, $2)
    returning *;
  `;
    const insertDishIngredientParams = [dishId, ingredientId];
    const dishIngredientResult = await db.query<Entry>(
      insertDishIngredient,
      insertDishIngredientParams
    );
    res.status(201).json(dishIngredientResult.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.put('/api/dishes/:id', async (req, res, next) => {
  try {
    const dishId = Number(req.params.id);
    const { title, photoUrl, tempIngredients } = req.body as Partial<Entry>;
    if (!Number.isInteger(dishId) || !title || !photoUrl || !tempIngredients) {
      throw new ClientError(
        400,
        'dishesId, title, and photoUrl are required fields'
      );
    }

    const sql = `
      update "dishes"
        set "title" = $1,
            "photoUrl" = $2,
            "tempIngredients" = $3
        where "id" = $4
        returning *;
    `;
    const editEntryParams = [title, photoUrl, tempIngredients, dishId];
    const editEntryResult = await db.query(sql, editEntryParams);
    const [editDishesId] = editEntryResult.rows;

    res.status(201).json(editDishesId);
  } catch (error) {
    next(error);
  }
});

// delete endpoint to remove dishIngredients row by ID (dishIngredient.id)

// find ingredient by name thats being targeted
// grab the ingredient id --> delete row in dishIngredients table --> removes the ingredient from the dish
//  const existingIngredient = `
//     select * from "ingredients" where "name" = $1 limit 1;
//   `;
//     const existingIngredientParams = [name];
//     const existingIngredientResult = await db.query<Entry>(
//       existingIngredient,
//       existingIngredientParams
//     );
//     const existingIngredientId = existingIngredientResult.rows[0]?.id;
//     if (existingIngredientId) {
//       const deleteDishIngredientSql = `
//         delete from "dishIngredients"
//           where "dishId" = $1 and "ingredientId" = $2
//       `;
//       const deleteIngredientParams = [dishesId, existingIngredientId];
//       await db.query(deleteDishIngredientSql, deleteIngredientParams);
//     }

app.delete('/api/dishes/:id', async (req, res, next) => {
  try {
    await db.query('BEGIN');

    try {
      const dishId = Number(req.params.id);
      if (!Number.isInteger(dishId)) {
        throw new ClientError(400, 'dishId must be an integer');
      }
      // need to delete the dishesId from dishes AND need to also delete ALL dishIngredient rows containing dishId
      const deleteDishIdSql = `
        delete from "dishIngredients"
          where "dishId" = $1
        `;
      const deleteDishIngredientsParams = [dishId];
      await db.query(deleteDishIdSql, deleteDishIngredientsParams);

      const deleteDishesIdSql = `
        delete from "dishes"
          where "id" = $1
          returning *;
      `;
      const deleteDishesIdParams = [dishId];
      const deleteDishesIdResult = await db.query(
        deleteDishesIdSql,
        deleteDishesIdParams
      );

      await db.query('COMMIT');
      res.status(201).json(deleteDishesIdResult.rows[0]);
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
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
  console.log(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
