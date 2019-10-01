// Imports
let express = require("express");
let router = express.Router();
const knex = require("../db/knex");
const checkToken = require("../helpers/checkToken");

// List of all category
// Ex: http://localhost:3001/V1/api/categories

router.route("/").get(checkToken, async (req, res) => {
  try {
    const result = await knex("Categories").select();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
});

// List film by category
// Ex: http://localhost:3001//V1/api/categories/:categories

router.route("/:categories").get(checkToken, async (req, res) => {
  const nameCategories = req.params.categories.split(",");
  try {
    const result = await knex({
      m: "Movies",
      c: "Categories"
    })
      .select()
      .whereRaw("m.id_category = c.id_category")
      .andWhere("m.is_active", 1)
      .whereIn("c.name_category", nameCategories)
      .orderBy("m.name");
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
