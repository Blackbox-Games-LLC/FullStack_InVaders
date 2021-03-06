/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");
const db = require("./database");

const Score = db.define(
  "score",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aliens: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    motherships: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    level: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    winOrLoss: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    timestamps: false,
  }
);

module.exports = Score;
