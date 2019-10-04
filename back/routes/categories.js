// Imports
let express = require("express");
let router = express.Router();
const knex = require("../db/knex");
const decodeIdUserFromToken = require("../helpers/decodeIdUserFromToken");

// List of all category
// Ex: http://localhost:3001/V1/api/categories

router.get("/", async (req, res) => {
  try {
    const result = await knex("Categories").select();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// List film by category
// Ex: http://localhost:3001/V1/api/categories/:categories

router.get("/filtered", async (req, res) => {
  const nameCategories = req.query.categories.split(",");
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
      .whereIn("c.name_category", nameCategories)
      .orderBy("m.name");
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
