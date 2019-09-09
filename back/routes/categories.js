let express = require("express");
let router = express.Router();
const connection = require("../config.js");

// List of all category
// Ex: http://localhost:3001/movies/categories
router.get("/", function(req, res, next) {
  const sql = `SELECT * FROM Category`;
  connection.query(sql, (error, results) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(results);
  });
});

// List film by category
// Ex: http://localhost:3001/movies/categories/:category
router.get("/:category", function(req, res, next) {
  const nameCategory = req.params.category;

  const sql =
    "SELECT * FROM Movie m,Category c WHERE m.id_category=c.id_category AND m.is_active=1 AND c.name_category IN (" +
    connection.escape(nameCategory.split(","))+") ORDER BY m.name ASC";

  connection.query(sql, nameCategory, (error, results) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(results);
  });
});

module.exports = router;
