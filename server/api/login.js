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
    res.send(singleUser);
  } catch (err) {
    console.log("error is:", err);
  }
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
