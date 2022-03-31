const express = require("express");
const router = express.Router();
const { User } = require("../db/index");

router.post("/", async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (singleUser) {
      res.send(singleUser);
    } else {
      throw new Error("User Not Found")
    }
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
