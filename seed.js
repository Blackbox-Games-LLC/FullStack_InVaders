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
  { userId: 1, aliens: 13, motherships: 2, level: 5 },
  { userId: 1, aliens: 13, motherships: 2, level: 5 },
  { userId: 1, aliens: 13, motherships: 2, level: 7 },
  { userId: 1, aliens: 15, motherships: 2, level: 7 },
  { userId: 1, aliens: 10, motherships: 3, level: 3 },
  { userId: 1, aliens: 20, motherships: 3, level: 3 },
  { userId: 1, aliens: 10, motherships: 2, level: 3 },
  { userId: 1, aliens: 12, motherships: 2, level: 3 },
  { userId: 1, aliens: 10, motherships: 2, level: 3 },
  { userId: 1, aliens: 20, motherships: 4, level: 6 },
  { userId: 1, aliens: 10, motherships: 2, level: 6 },
  { userId: 1, aliens: 10, motherships: 2, level: 4 },
  { userId: 1, aliens: 10, motherships: 2, level: 4 },
  { userId: 2, aliens: 11, motherships: 2, level: 9 },
  { userId: 2, aliens: 11, motherships: 2, level: 9 },
  { userId: 2, aliens: 11, motherships: 2, level: 1 },
  { userId: 2, aliens: 10, motherships: 2, level: 1 },
  { userId: 2, aliens: 20, motherships: 2, level: 2 },
  { userId: 2, aliens: 12, motherships: 1, level: 2 },
  { userId: 2, aliens: 12, motherships: 1, level: 3 },
  { userId: 2, aliens: 22, motherships: 1, level: 3 },
  { userId: 2, aliens: 22, motherships: 1, level: 7 },
  { userId: 2, aliens: 22, motherships: 1, level: 7 },
  { userId: 1, aliens: 22, motherships: 1, level: 9 },
  { userId: 1, aliens: 22, motherships: 1, level: 9 },
  { userId: 1, aliens: 22, motherships: 1, level: 9 },
  { userId: 3, aliens: 15, motherships: 2, level: 1 },
  { userId: 3, aliens: 12, motherships: 2, level: 1 },
  { userId: 3, aliens: 12, motherships: 2, level: 9 },
  { userId: 3, aliens: 12, motherships: 2, level: 9 },
  { userId: 3, aliens: 9, motherships: 1, level: 1 },
  { userId: 3, aliens: 9, motherships: 2, level: 8 },
  { userId: 3, aliens: 10, motherships: 2, level: 8 },
  { userId: 3, aliens: 25, motherships: 2, level: 4 },
  { userId: 3, aliens: 15, motherships: 2, level: 4 },
  { userId: 3, aliens: 14, motherships: 2, level: 5 },
  { userId: 3, aliens: 15, motherships: 2, level: 5 },
  { userId: 4, aliens: 15, motherships: 2, level: 4 },
  { userId: 4, aliens: 10, motherships: 2, level: 4 },
  { userId: 4, aliens: 15, motherships: 2, level: 1 },
  { userId: 4, aliens: 16, motherships: 3, level: 1 },
  { userId: 4, aliens: 6, motherships: 4, level: 9 },
  { userId: 4, aliens: 11, motherships: 1, level: 9 },
  { userId: 4, aliens: 12, motherships: 1, level: 9 },
  { userId: 4, aliens: 14, motherships: 1, level: 3 },
  { userId: 4, aliens: 16, motherships: 1, level: 1 },
  { userId: 4, aliens: 16, motherships: 1, level: 1 },
  { userId: 4, aliens: 16, motherships: 1, level: 1 },
  { userId: 4, aliens: 16, motherships: 1, level: 5 },
  { userId: 4, aliens: 16, motherships: 1, level: 5 },
  { userId: 4, aliens: 16, motherships: 1, level: 5 },
  { userId: 4, aliens: 16, motherships: 1, level: 3 },
  { userId: 4, aliens: 16, motherships: 1, level: 2 },
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
