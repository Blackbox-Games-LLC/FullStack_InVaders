import React from "react";
import Phaser from "phaser";
import Test from "../Scenes/TestLevel";
import Venus from "../Scenes/Venus";
import Mars from "../Scenes/Mars";
import Jupiter from "../Scenes/Jupiter";
import Saturn from "../Scenes/Saturn";
import Uranus from "../Scenes/Uranus";
import Neptune from "../Scenes/Neptune";
import TitleScene from "../Scenes/TitleScene";
import LoginScene from "../Scenes/LoginScene";
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
    autoCenter: Phaser.Scale.CENTER_BOTH
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

const User = new CurrentUser
const music = new Music
game.globals = { User, music }


game.scene.add("End_Screen", EndScreen);
game.scene.add("Title_Scene", TitleScene);
game.scene.add("Login_Scene", LoginScene);
game.scene.add("Venus", Venus);
game.scene.add("Mars", Mars);
game.scene.add("Jupiter", Jupiter);
game.scene.add("Saturn", Saturn);
game.scene.add("Uranus", Uranus);
game.scene.add("Neptune", Neptune);
game.scene.add("Test_Level", Test);
game.scene.start("Title_Scene");
// game.scene.start("End_Screen");
//game.scene.start("Login_Scene");
// game.scene.start("Test_Level");

const Home = () => {
  return <div id="game"></div>;
};

export default Home;
