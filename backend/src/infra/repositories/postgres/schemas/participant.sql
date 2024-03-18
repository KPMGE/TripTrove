CREATE TABLE participant (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  holiday_id INT, FOREIGN KEY (holiday_id) REFERENCES holiday(id)
);
