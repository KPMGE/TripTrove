CREATE TABLE holiday(
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  date        DATE NOT NULL,
  location    TEXT NOT NULL
);
