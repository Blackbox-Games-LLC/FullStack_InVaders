const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const dbName = process.env.NODE_ENV === "test" ? `${pkg.name}_test` : pkg.name;

const db = new Sequelize(
  process.env.DATABASE_URL || `postgresql://DavRuiz07:v2_3wYXy_p2eax8wid38uqPRkbKXG4Hu@db.bit.io/DavRuiz07/FullStackInvader`,
  {
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = db;
