// Imports
let express = require("express");
let router = express.Router();
const knex = require("../db/knex");
const decodeIdUserFromToken = require("../helpers/decodeIdUserFromToken");

// List of all movie with categories
// Ex: http://localhost:3001/V1/api/movies

router.get("/", async (req, res) => {
  const id_user = decodeIdUserFromToken(req);
  const result = await knex({
    m: "Movies",
    c: "Categories",
    u: "Users",
    um: "Users_Movies"
  })
    .select(
      "m.id_movie",
      "m.name",
      "m.director",
      "m.synopsis",
      "m.link_poster",
      "m.release_date",
      "m.duration",
      "c.name_category"
    )
    .whereRaw("m.id_category = c.id_category")
    .whereRaw("um.id_user = u.id_user")
    .whereRaw("um.id_movie = m.id_movie")
    .andWhere("um.id_user", id_user)
    .andWhere("um.is_active", 1)
    .orderBy("m.name");
  res.status(200).send(result);
});

// Random movie
// Ex: http://localhost:3001/V1/api/movies/random

router.get("/random", async (req, res) => {
  const id_user = decodeIdUserFromToken(req);
  try {
    const result = await knex({
      m: "Movies",
      c: "Categories",
      u: "Users",
      um: "Users_Movies"
    })
      .select(
        "m.id_movie",
        "m.name",
        "m.director",
        "m.synopsis",
        "m.link_poster",
        "m.release_date",
        "m.duration",
        "c.name_category"
      )
      .whereRaw("m.id_category = c.id_category")
      .whereRaw("um.id_user = u.id_user")
      .whereRaw("um.id_movie = m.id_movie")
      .andWhere("um.id_user", id_user)
      .andWhere("um.is_active", 1)
      .orderByRaw("RAND()")
      .limit(1);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
});

// Delete a movie
// Ex: http://localhost:3001/V1/api/movies/deletemovie/:id

router.put("/deletemovie/:id", async (req, res) => {
  const id_user = decodeIdUserFromToken(req);
  const idMovie = Number(req.params.id);
  try {
    await knex({
      m: "Movies",
      u: "Users",
      um: "Users_Movies"
    })
      .whereRaw("um.id_user = u.id_user")
      .whereRaw("um.id_movie = m.id_movie")
      .where("um.id_movie", "=", idMovie)
      .andWhere("um.id_user", id_user)
      .update({
        "um.is_active": 0,
        thisKeyIsSkipped: undefined
      });
    res.status(204).send("Movie has been correctly deleted");
  } catch (error) {
    console.error(error);
  }
});

// Add new movie
// Ex: http://localhost:3001/V1/api/movies/newmovie

router.post("/newmovie", async (req, res) => {
  const name = req.body.name;
  const director = req.body.director;
  const synopsis = req.body.synopsis;
  const link_poster = req.body.link_poster;
  const release_date = !isNaN(Date.parse(req.body.release_date))
    ? req.body.release_date
    : null;
  const duration = req.body.duration;
  const is_active = 1;
  const category = req.body.category.length ? req.body.category : "No category";
  const id_user = decodeIdUserFromToken(req);

  try {
    // select id category
    const resQueryIdCategory = await knex("Categories")
      .select("id_category")
      .where("name_category", "=", category);
    const id_category = resQueryIdCategory[0].id_category;
    const fixDataMovies = {
      name,
      director,
      synopsis,
      link_poster,
      release_date,
      duration,
      is_active,
      id_category
    };
    // insert in movie table
    const resQueryInsertMovie = await knex("Movies").insert(fixDataMovies);
    const id_movie = resQueryInsertMovie[0];
    const fixDataUsersMovies = { id_user, id_movie };
    // insert in users_movies table
    await knex("Users_Movies").insert(fixDataUsersMovies);
    res.status(201).send("Movie has been correctly added");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
