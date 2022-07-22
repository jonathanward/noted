BEGIN TRANSACTION;

DROP TABLE IF EXISTS noted;

CREATE TABLE noted (
  id serial PRIMARY KEY,
  title varchar(500) NOT NULL,
  artist varchar(1000) NOT NULL,
  album varchar(1000) NOT NULL,
  description varchar(2000) NOT NULL,
  body varchar(10000) NOT NULL
);

COMMIT TRANSACTION;
