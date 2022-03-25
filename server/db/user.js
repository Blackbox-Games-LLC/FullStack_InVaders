/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");
const db = require("./database");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
