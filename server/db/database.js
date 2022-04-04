const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const dbName = process.env.NODE_ENV === "test" ? `${pkg.name}_test` : pkg.name;

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false,
    // dialectOptions: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

module.exports = db;
