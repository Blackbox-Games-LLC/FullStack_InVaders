const express = require("express");
const router = express.Router();
const { Score } = require("../db/index");
const { User } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const allScore = await Score.findAll();
    res.send(allScore);
  } catch (err) {
    console.log("error is:", err);
  }
});
router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const singleUserAllScore = await Score.findAll({
      where: {
        userId: userId,
      },
      order: [["time", "DESC"]], // order by from last score
    });
    res.send(singleUserAllScore);
  } catch (err) {
    console.log("error is:", err);
  }
});
//creates score from body, and adds score to user in route
router.post("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const singleUser = await User.findByPk(userId);
    console.log("singleUser", singleUser);
    const score = new Score(req.body);
    console.log("score", score);
    singleUser.addScore(score);
    res.send(score);
  } catch (err) {
    console.log("erro is:", err);
  }
});

// router.post("/:userId", async (req, res, next) => {
//   try {
//     const newScore = await Score.create(req.body);
//     res.send(newScore);
//   } catch (err) {
//     console.log("error is:", err);
//   }
// });

module.exports = router;
