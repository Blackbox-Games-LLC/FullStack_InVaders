/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");
const db = require("./database");

const Score = db.define("score", {
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Score;
