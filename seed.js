const { db } = require("./server/db");
const { green, red } = require("chalk");

const User = require("./server/db/user");

const users = [
  {
    username: "David",
    score: 0,
  },
  {
    username: "Rich",
    score: 0,
  },
  {
    username: "Ryan",
    score: 0,
  },
  {
    username: "Veysel",
    score: 0,
  },
];
const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map((user) => {
        return User.create(user);
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
