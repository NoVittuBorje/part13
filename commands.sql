CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes smallint default 0
);

INSERT INTO blogs (author, url, title)
VALUES ('Jere', 'localhost', 'postgres toimii');

SELECT * FROM blogs;

INSERT INTO blogs (author, url, title)
VALUES ('Jere', 'localhost', 'postgres toimii2');
