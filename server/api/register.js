const express = require("express");
const router = express.Router();
const { User } = require("../db/index");

router.post("", async (req, res, next) => {
  try {
    const findUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (findUser) {
      throw new Error("Username is already exist")
    }
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (err) {
    next(err)
  }
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
