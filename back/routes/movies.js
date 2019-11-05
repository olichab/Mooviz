/**** Imports modules *****/
let express = require("express");
let router = express.Router();
const knex = require("../db/knex");
const decodeUserInfosFromToken = require("../helpers/decodeUserInfosFromToken");

// List of all movie with categories
// Ex: http://localhost:3001/V1/api/movies

router.get("/", async (req, res) => {
  const idUser = decodeUserInfosFromToken(req).id;
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
      .andWhere("um.id_user", idUser)
      .andWhere("um.is_active", 1)
      .orderBy("m.name");
    res.status(200).send(result);
  } catch (error) {
    console.error("error", error);
  }
});

// Delete a movie
// Ex: http://localhost:3001/V1/api/movies/deletemovie/:id

router.put("/deletemovie/:id", async (req, res) => {
  const idUser = decodeUserInfosFromToken(req).id;
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
      .andWhere("um.id_user", idUser)
      .update({
        "um.is_active": 0,
        thisKeyIsSkipped: undefined
      });
    res
      .status(200)
      .json({ id: idMovie, message: "The movie has been deleted" });
  } catch (error) {
    console.error("error", error);
  }
});

// Add new movie
// Ex: http://localhost:3001/V1/api/movies/newmovie

router.post("/newmovie", async (req, res) => {
  const { name, director, synopsis, link_poster, duration } = req.body;
  const release_date = !isNaN(Date.parse(req.body.release_date))
    ? req.body.release_date
    : null;
  const category = req.body.name_category.length
    ? req.body.name_category
    : "No category";
  const idUser = decodeUserInfosFromToken(req).id;

  /**
   * Search a movie in DB and return his id
   * @param {String} name movie name
   * @returns {Number} id movie or null
   */
  const checkMovieInDb = async name => {
    try {
      const result = await knex("Movies")
        .select("id_movie")
        .where({ name: name });
      return result.length ? result[0].id_movie : null;
    } catch (error) {
      console.error("error", error);
    }
  };

  /**
   * Check if movie is active for a user
   * @param {Number} idMovie id movie
   * @param {Number} idUser id user
   * @returns {Number} is active (0 or 1) or null
   */
  const checkIfMovieIsActiveForUser = async (idMovie, idUser) => {
    try {
      const result = await knex({
        m: "Movies",
        u: "Users",
        um: "Users_Movies"
      })
        .select("um.is_active")
        .whereRaw("um.id_user = u.id_user")
        .whereRaw("um.id_movie = m.id_movie")
        .andWhere("um.id_movie", idMovie)
        .andWhere("u.id_user", idUser);
      return result.length ? result[0].is_active : null;
    } catch (error) {
      console.error("error", error);
    }
  };

  /**
   * Update the field is_active
   * @param {Number} idMovie id movie
   * @param {Number} idUser id user
   */
  const updateIsActiveField = async (idMovie, idUser) => {
    try {
      await knex({
        m: "Movies",
        um: "Users_Movies"
      })
        .where("um.id_movie", idMovie)
        .andWhere("um.id_user", idUser)
        .update({
          "um.is_active": 1,
          thisKeyIsSkipped: undefined
        });
    } catch (error) {
      console.error("error", error);
    }
  };

  /**
   * Assign a movie to a user
   * @param {Number} idUser id user
   * @param {Number} idMovie id movie
   */
  const assignMovieToUser = async (idMovie, idUser) => {
    try {
      await knex("Users_Movies").insert([
        { id_user: idUser, id_movie: idMovie }
      ]);
    } catch (error) {
      console.error("error", error);
    }
  };

  /**
   * Insert movie in DB
   * @param {String} categoryName category name
   * @returns {Number} id movie
   */
  const addMovieInDb = async categoryName => {
    try {
      // select id category
      const category = await knex("Categories")
        .select("id_category")
        .where({ name_category: categoryName });
      const id_category = category[0].id_category;
      const fixDataMovies = {
        name,
        director,
        synopsis,
        link_poster,
        release_date,
        duration,
        id_category
      };
      // insert in movie table
      const result = await knex("Movies").insert(fixDataMovies);
      return result[0];
    } catch (error) {
      console.error("error", error);
    }
  };

  try {
    checkMovieInDb(name).then(idMovie => {
      // if idMovie find
      if (idMovie !== null) {
        checkIfMovieIsActiveForUser(idMovie, idUser).then(isActive => {
          switch (isActive) {
            // If user has already added movie and it is active
            case 1:
              return res.sendStatus(204);
            // If user has already added movie but it is inactive
            case 0:
              updateIsActiveField(idMovie, idUser);
              return res.status(201).json({ message: "Movie has been added" });
            // If user has never added movie
            case null:
              assignMovieToUser(idMovie, idUser);
              return res.status(201).json({ message: "Movie has been added" });
            default:
              break;
          }
        });
        //if idMovie not find
      } else {
        addMovieInDb(category).then(idMovie => {
          assignMovieToUser(idMovie, idUser);
        });
        return res.status(201).json({ message: "Movie has been added" });
      }
    });
  } catch (error) {
    console.error("error", error);
  }
});

module.exports = router;
