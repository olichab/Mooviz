const environnement = process.env.NODE_ENV || "development";
const config = require("../knexConfig")[environnement];
module.exports = require("knex")(config);
