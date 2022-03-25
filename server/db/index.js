const db = require("./database");
const User = require("./user");
const Score = require("./score");

User.hasMany(Score);
Score.belongsTo(User);

module.exports = {
  // Include your models in this exports object as well!
  db,
  User,
  Score,
};
