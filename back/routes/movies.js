// Imports
let express = require("express");
let router = express.Router();
const knex = require("../db/knex");
const checkToken = require("../helpers/checkToken");

// List of all movie with categories
// Ex: http://localhost:3001/V1/api/movies

router.route("/").get(checkToken, async (req, res) => {
  const result = await knex({
    m: "Movies",
    c: "Categories"
  })
    .select()
    .whereRaw("m.id_category = c.id_category")
    .andWhere("m.is_active", 1)
    .orderBy("m.name");
  res.status(200).send(result);
});

// Random movie
// Ex: http://localhost:3001/V1/api/movies/random

router.route("/random").get(checkToken, async (req, res) => {
  try {
    const result = await knex({
      m: "Movies",
      c: "Categories"
    })
      .select()
      .whereRaw("m.id_category = c.id_category")
      .andWhere("m.is_active", 1)
      .orderByRaw("RAND()")
      .limit(1);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
});

// Delete a movie
// Ex: http://localhost:3001/V1/api/movies/deletemovie/:id

router.route("/deletemovie/:id").put(checkToken, async (req, res) => {
  const idMovie = Number(req.params.id);
  try {
    await knex("Movies")
      .where("id_movie", "=", idMovie)
      .update({
        is_active: 0,
        thisKeyIsSkipped: undefined
      });
    res.status(204).send("Movie has been correctly deleted");
  } catch (error) {
    console.error(error);
  }
});

// Add new movie
// Ex: http://localhost:3001/V1/api/movies/newmovie

router.route("/newmovie").post(checkToken, async (req, res) => {
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
    const id_user = req.body.idUser;
    const fixDataUsersMovies = { id_user, id_movie };
    // insert in users_movies table
    await knex("Users_Movies").insert(fixDataUsersMovies);
    res.status(201).send("Movie has been correctly added");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
