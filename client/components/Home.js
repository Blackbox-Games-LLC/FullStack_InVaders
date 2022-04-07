import React from "react";
import { useSelector } from "react-redux";
import Phaser from "phaser";
import TitleScene from "../Scenes/TitleScene";
import EndScreen from "../Scenes/EndScreen";
import AwaitLoaderPlugin from "phaser3-rex-plugins/plugins/awaitloader-plugin.js";
import CurrentUser from "../HelperClasses/currentUser";
import Music from "../HelperClasses/MusicHandler";

var config = {
  type: Phaser.AUTO,
  width: 5098,
  height: 2800,
  parent: "game",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { scale: 0 },
    },
  },
  plugins: {
    global: [
      {
        key: "rexAwaitLoader",
        plugin: AwaitLoaderPlugin,
        start: true,
      },
    ],
  },
};

const game = new Phaser.Game(config);

const User = new CurrentUser();
const music = new Music();
game.globals = { User, music };

game.scene.add("End_Screen", EndScreen);
game.scene.add("Title_Scene", TitleScene);
game.scene.start("Title_Scene");


const Home = () => {
  const loggedIn = useSelector((state) => state.user);
  const user = game.globals.User;
  if (loggedIn.username) {
    user.id = loggedIn.id;
    user.username = loggedIn.username;
    console.log(user);
  } else {
    user.id = null;
    user.username = null;
    console.log(user);
  }
  return <div id="game"></div>;
};

export default Home;
