// Imports
let express = require("express");
let router = express.Router();
const knex = require("../db/knex");
const decodeIdUserFromToken = require("../helpers/decodeIdUserFromToken");

// List of all movie with categories
// Ex: http://localhost:3001/V1/api/movies

router.get("/", async (req, res) => {
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
      .orderBy("m.name");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
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
    res.status(200).json(idMovie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add new movie
// Ex: http://localhost:3001/V1/api/movies/newmovie

router.post("/newmovie", async (req, res) => {
  const { name, director, synopsis, link_poster, duration } = req.body;
  const release_date = !isNaN(Date.parse(req.body.release_date))
    ? req.body.release_date
    : null;
  const category = req.body.name_category.length ? req.body.name_category : "No category";
  const id_user = decodeIdUserFromToken(req);

  /**
   * Search a movie in DB and return his id
   * @param {String} name movie name
   * @returns {Number} id movie or null
   */
  const checkMovieInDb = async name => {
    try {
      const resQueryIdMovie = await knex("Movies")
        .select("id_movie")
        .where("name", name);
      return resQueryIdMovie.length ? resQueryIdMovie[0].id_movie : null;
    } catch (error) {
      res.status(400).send(error);
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
      const resQueryCheckIsActive = await knex({
        m: "Movies",
        u: "Users",
        um: "Users_Movies"
      })
        .select("um.is_active")
        .whereRaw("um.id_user = u.id_user")
        .whereRaw("um.id_movie = m.id_movie")
        .andWhere("um.id_movie", idMovie)
        .andWhere("u.id_user", idUser);
      return resQueryCheckIsActive.length
        ? resQueryCheckIsActive[0].is_active
        : null;
    } catch (error) {
      res.status(400).send(error);
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
      res.status(400).send(error);
    }
  };

  /**
   * Assign a movie to a user
   * @param {Number} id_user id user
   * @param {Number} id_movie id movie
   */
  const assignMovieToUser = async (id_user, id_movie) => {
    try {
      await knex("Users_Movies").insert({ id_user, id_movie });
    } catch (error) {
      res.status(400).send(error);
    }
  };

  /**
   * Insert movie in DB
   * @param {Number} id_user id user
   * @param {Number} id_movie id movie
   * @returns {Number} is active (0 or 1) or null
   */
  const addMovieInDb = async categoryName => {
    try {
      // select id category
      const resQueryIdCategory = await knex("Categories")
        .select("id_category")
        .where("name_category", "=", categoryName);
      const id_category = resQueryIdCategory[0].id_category;
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
      const resQueryInsertMovie = await knex("Movies").insert(fixDataMovies);
      return resQueryInsertMovie[0];
    } catch (error) {
      res.status(400).send(error);
    }
  };

  try {
    checkMovieInDb(name).then(idMovie => {
      // if idMovie find
      if (idMovie !== null) {
        checkIfMovieIsActiveForUser(idMovie, id_user).then(isActive => {
          switch (isActive) {
            // If user has already added movie and it is active
            case 1:
              return res.status(200).json("Movie already in your collection");
            // If user has already added movie but it is inactive
            case 0:
              updateIsActiveField(idMovie, id_user);
              return res.status(201).send("Movie has been correctly added");
            // If user has never added movie
            case null:
              assignMovieToUser(id_user, idMovie);
              return res.status(201).send("Movie has been correctly added");
            default:
              break;
          }
        });
        //if idMovie not find
      } else {
        addMovieInDb(category).then(idMovie => {
          assignMovieToUser(id_user, idMovie);
        });
        return res.status(201).send("Movie has been correctly added");
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
