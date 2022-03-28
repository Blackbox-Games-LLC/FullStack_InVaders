const express = require("express");
const router = express.Router();
const { User } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    console.log("error is:", err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const singleUser = await User.findOne({
      where: {
        id: userId,
      },
    });
    res.send(singleUser);
  } catch (err) {
    console.log("error is:", err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (err) {
    console.log("error is:", err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const singleUser = await User.findByPk(userId);
    console.log(req.body);
    res.send(await singleUser.update(req.body));
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
