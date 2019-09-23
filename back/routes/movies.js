let express = require("express");
let router = express.Router();
const connection = require("../config.js");

// List of all movie
// Ex: http://localhost:3001/movies
router.get("/", function(req, res, next) {
  const sql = `SELECT * FROM Movies m, Categories c WHERE m.id_category=c.id_category AND m.is_active=1 ORDER BY m.name ASC`;
  connection.query(sql, (error, results) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(results);
  });
});

// List film by name
// Ex: http://localhost:3001/movies/movie/:name
router.get("/movie/:name", function(req, res, next) {
  const nameMovie = req.params.name;
  const sql =
    "SELECT * FROM Movies m,Categories c WHERE m.id_category=c.id_category AND m.name LIKE" +
    connection.escape("%" + nameMovie + "%");
  connection.query(sql, nameMovie, (error, results) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(results);
  });
});

// Random movie
// Ex: http://localhost:3001/movies/random
router.get("/random", function(req, res, next) {
  const sql = `SELECT * FROM Movies m, Categories c WHERE m.id_category=c.id_category AND m.is_active=1 ORDER BY RAND() LIMIT 1`;
  connection.query(sql, (error, results) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(results);
  });
});

// Delete a movie
// Ex: http://localhost:3001/movies/deletemovie/:id
router.put("/deletemovie/:id", function(req, res, next) {
  const idMovie = Number(req.params.id);
  const sql = `UPDATE Movies SET is_active=0 WHERE id_movie=?`;
  connection.query(sql, idMovie, (error, results) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(results);
  });
});

// Add new movie
// http://localhost:3001/movies/newmovie
router.post("/newmovie", function(req, res, next) {
  const name = req.body.name;
  const director = req.body.director;
  const synopsis = req.body.synopsis;
  const link_poster = req.body.link_poster;
  const release_date = !isNaN(Date.parse(req.body.release_date))
    ? req.body.release_date
    : null;
  const duration = req.body.duration;
  const category = req.body.category.length ? req.body.category : "No category";
  const is_active = 1;

  const sql = `SELECT id_category FROM Categories WHERE name_category=?`;
  connection.query(sql, category, (error, results) => {
    if (error) res.status(500).send(error);
    else {
      const dataForm = [
        name,
        director,
        synopsis,
        link_poster,
        release_date,
        duration,
        is_active,
        (id_category = results[0].id_category)
      ];
      const sql2 = `INSERT INTO Movies (name, director, synopsis,link_poster,release_date,duration,is_active, id_category) VALUES (?,?,?,?,?,?,?,?)`;
      connection.query(sql2, dataForm, error => {
        if (error) res.status(500).send(error);
        else {
          const sql3 = `INSERT INTO Users_Movies(id_user, id_movie) SELECT id_user, id_movie FROM Users u, Movies m WHERE u.id_user=1 AND m.name=?`;
          connection.query(sql3, name, error => {
            if (error) res.status(500).send(error);
            else {
              res.status(201).send("Le film à bien ete ajoute");
            }
          });
        }
      });
    }
  });
});

module.exports = router;
