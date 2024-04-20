-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

INSERT INTO "dishes" ("photoUrl", "title")
  VALUES ('https://i.imgur.com/DTEUr87.jpeg', 'Grilled Cheese');

INSERT INTO "ingredients" ("name")
  VALUES ('white bread'), ('butter'), ('provolone cheese'), ('cheddar cheese');

INSERT INTO "dishIngredients" ("dishId", "ingredientId")
  VALUES (1, 1), (1, 2), (1, 3), (1, 4);
