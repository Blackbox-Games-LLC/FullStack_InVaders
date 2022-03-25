const express = require("express");
const router = express.Router();
const User = require("../db/user");

router.post("", async (req, res, next) => {
  try {
    if (!req.body.username) {
      return res.send({
        error: "Username can not be empty",
      });
    }
    const findUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (findUser) {
      return res.send({
        error: "Username is already exist",
      });
    }
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (err) {
    console.log("erro is:", err);
    res.send(err.message);
  }
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
