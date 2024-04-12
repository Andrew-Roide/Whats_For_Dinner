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
  VALUES ('https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2F7pt5bpnbagg51.jpg', 'Grilled Cheese');

INSERT INTO "ingredients" ("name")
  VALUES ('white bread'), ('butter'), ('provolone cheese'), ('cheddar cheese');

INSERT INTO "dishIngredients" ("dishId", "ingredientId")
  VALUES (1, 1), (1, 2), (1, 3), (1, 4);
