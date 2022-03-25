const express = require("express");
const router = express.Router();
const Score = require("../db/score");

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
      order: [["id", "DESC"]], // order by from last score
    });
    res.send(singleUserAllScore);
  } catch (err) {
    console.log("error is:", err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newScore = await Score.create(req.body);
    res.send(newScore);
  } catch (err) {
    console.log("error is:", err);
  }
});

module.exports = router;
