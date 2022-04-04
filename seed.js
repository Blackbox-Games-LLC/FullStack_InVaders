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
  { userId: 1, time: "00:02:12", aliens: 13, motherships: 2, level: 5 },
  { userId: 1, time: "00:02:12", aliens: 13, motherships: 2, level: 5 },
  { userId: 1, time: "00:02:12", aliens: 13, motherships: 2, level: 7 },
  { userId: 1, time: "00:01:12", aliens: 15, motherships: 2, level: 7 },
  { userId: 1, time: "00:01:12", aliens: 10, motherships: 3, level: 3 },
  { userId: 1, time: "00:02:12", aliens: 20, motherships: 3, level: 3 },
  { userId: 1, time: "00:03:12", aliens: 10, motherships: 2, level: 3 },
  { userId: 1, time: "00:03:12", aliens: 12, motherships: 2, level: 3 },
  { userId: 1, time: "00:02:12", aliens: 10, motherships: 2, level: 3 },
  { userId: 1, time: "00:02:12", aliens: 20, motherships: 4, level: 6 },
  { userId: 1, time: "00:03:12", aliens: 10, motherships: 2, level: 6 },
  { userId: 1, time: "00:02:12", aliens: 10, motherships: 2, level: 4 },
  { userId: 1, time: "00:02:12", aliens: 10, motherships: 2, level: 4 },
  { userId: 2, time: "00:03:12", aliens: 11, motherships: 2, level: 9 },
  { userId: 2, time: "00:01:12", aliens: 11, motherships: 2, level: 9 },
  { userId: 2, time: "00:04:12", aliens: 11, motherships: 2, level: 1 },
  { userId: 2, time: "00:04:12", aliens: 10, motherships: 2, level: 1 },
  { userId: 2, time: "00:02:12", aliens: 20, motherships: 2, level: 2 },
  { userId: 2, time: "00:02:12", aliens: 12, motherships: 1, level: 2 },
  { userId: 2, time: "00:02:12", aliens: 12, motherships: 1, level: 3 },
  { userId: 2, time: "00:02:12", aliens: 22, motherships: 1, level: 3 },
  { userId: 2, time: "00:02:12", aliens: 22, motherships: 1, level: 7 },
  { userId: 2, time: "00:01:12", aliens: 22, motherships: 1, level: 7 },
  { userId: 1, time: "00:02:11", aliens: 22, motherships: 1, level: 9 },
  { userId: 1, time: "00:02:00", aliens: 22, motherships: 1, level: 9 },
  { userId: 1, time: "00:02:12", aliens: 22, motherships: 1, level: 9 },
  { userId: 3, time: "00:03:12", aliens: 15, motherships: 2, level: 1 },
  { userId: 3, time: "00:03:12", aliens: 12, motherships: 2, level: 1 },
  { userId: 3, time: "00:03:12", aliens: 12, motherships: 2, level: 9 },
  { userId: 3, time: "00:03:12", aliens: 12, motherships: 2, level: 9 },
  { userId: 3, time: "00:03:12", aliens: 9, motherships: 1, level: 1 },
  { userId: 3, time: "00:03:12", aliens: 9, motherships: 2, level: 8 },
  { userId: 3, time: "00:03:12", aliens: 10, motherships: 2, level: 8 },
  { userId: 3, time: "00:03:12", aliens: 25, motherships: 2, level: 4 },
  { userId: 3, time: "00:03:12", aliens: 15, motherships: 2, level: 4 },
  { userId: 3, time: "00:03:12", aliens: 14, motherships: 2, level: 5 },
  { userId: 3, time: "00:03:12", aliens: 15, motherships: 2, level: 5 },
  { userId: 4, time: "00:03:12", aliens: 15, motherships: 2, level: 4 },
  { userId: 4, time: "00:03:12", aliens: 10, motherships: 2, level: 4 },
  { userId: 4, time: "00:03:12", aliens: 15, motherships: 2, level: 1 },
  { userId: 4, time: "00:01:12", aliens: 16, motherships: 3, level: 1 },
  { userId: 4, time: "00:05:00", aliens: 6, motherships: 4, level: 9 },
  { userId: 4, time: "00:03:49", aliens: 11, motherships: 1, level: 9 },
  { userId: 4, time: "00:04:49", aliens: 12, motherships: 1, level: 9 },
  { userId: 4, time: "00:02:49", aliens: 14, motherships: 1, level: 3 },
  { userId: 4, time: "00:04:49", aliens: 16, motherships: 1, level: 1 },
  { userId: 4, time: "00:04:49", aliens: 16, motherships: 1, level: 1 },
  { userId: 4, time: "00:04:49", aliens: 16, motherships: 1, level: 1 },
  { userId: 4, time: "00:04:49", aliens: 16, motherships: 1, level: 5 },
  { userId: 4, time: "00:02:49", aliens: 16, motherships: 1, level: 5 },
  { userId: 4, time: "00:02:49", aliens: 16, motherships: 1, level: 5 },
  { userId: 4, time: "00:01:49", aliens: 16, motherships: 1, level: 3 },
  { userId: 4, time: "00:04:49", aliens: 16, motherships: 1, level: 2 },
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
