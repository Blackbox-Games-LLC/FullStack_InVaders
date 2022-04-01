const { db } = require("./server/db");

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
  { userId: 1, time: "00:07:12", aliens: 10, motherships: 2, level: 1 },
  { userId: 2, time: "00:06:12", aliens: 12, motherships: 1, level: 2 },
  { userId: 2, time: "00:33:12", aliens: 15, motherships: 2, level: 2 },
  { userId: 3, time: "00:09:12", aliens: 16, motherships: 3, level: 2 },
  { userId: 4, time: "00:05:03", aliens: 11, motherships: 4, level: 2 },
  { userId: 1, time: "00:09:49", aliens: 22, motherships: 1, level: 2 },
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

    db.close();
  } catch (err) {
    console.error(err);
    db.close();
  }
};

seed();
