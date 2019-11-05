/**** Imports modules *****/
let express = require("express");
let router = express.Router();
const knex = require("../db/knex");
const decodeUserInfosFromToken = require("../helpers/decodeUserInfosFromToken");

// List of all category
// Ex: http://localhost:3001/V1/api/categories

router.get("/", async (req, res) => {
  try {
    const result = await knex("Categories").select();
    res.status(200).send(result);
  } catch (error) {
    console.error("error", error);
  }
});

// List film by category
// Ex: http://localhost:3001/V1/api/categories/:categories

router.get("/filtered", async (req, res) => {
  const nameCategories = req.query.categories.split(",");
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
      .whereIn("c.name_category", nameCategories)
      .orderBy("m.name");
    res.status(200).send(result);
  } catch (error) {
    console.error("error", error);
  }
});

module.exports = router;
