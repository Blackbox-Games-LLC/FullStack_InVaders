const { db } = require("./server/db");
const { green, red } = require("chalk");

const User = require("./server/db/user");
const Score = require("./server/db/score");

const users = [
  {
    username: "David",
  },
  {
    username: "Rich",
  },
  {
    username: "Ryan",
  },
  {
    username: "Veysel",
  },
];
const scores = [
  { userId: 1, score: 3 },
  { userId: 2, score: 3 },
  { userId: 2, score: 5 },
  { userId: 1, score: 2 },
];
const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    await Promise.all(
      scores.map((score) => {
        return Score.create(score);
      })
    );

    console.log(green("Seeding success!"));
    db.close();
  } catch (err) {
    console.error(red("Oh noes! Something went wrong!"));
    console.error(err);
    db.close();
  }
};

seed();
