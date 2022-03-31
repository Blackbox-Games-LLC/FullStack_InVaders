import Phaser from "phaser";
import axios from "axios";
import Test from "./TestLevel";

export default class EndScreen extends Phaser.Scene {
  constructor() {
    super("End_Screen");
  }
  init(data) {
    this.loss = data.loss;
    this.win = data.win;
  }

  preload() {
    //this.load.html("end", "/assets/text/endscreen.html");
    this.User = this.sys.game.globals.User;
    this.load.rexAwait(async (successCallback, failureCallback) => {
      if (this.User.id) {
        this.scores = await axios.get(`/api/score/${this.User.id}`);
        console.log("score", this.scores);
        successCallback();
      }
    });
  }
  create() {
    //this.display = this.add.dom(2000, 1300).createFromCache("end");
    this.aliens = this.add.dom(
      2000,
      1500,
      "div",
      "background-color: lime; width: 220px; height: 100px; font: 48px Arial",
      `Aliens:${this.scores.data[0].aliens}`
    );
    this.aliens = this.add.dom(
      2000,
      1500,
      "p",
      "background-color: lime; width: 220px; height: 100px; font: 48px Arial",
      `Aliens:${this.scores.data[1].aliens}`
    );
    this.aliens = this.add.dom(
      2000,
      1550,
      "p",
      "background-color: lime; width: 400px; height: 100px; font: 48px Arial",
      `MotherShips:${this.scores.data[0].motherships}`
    );

    if (this.loss) {
      this.message = this.add.text(900, 900, "Lol you suck", {
        color: "#FFFFFF",
        fontSize: 50,
        fontStyle: "bold",
      });
    } else if (this.win) {
      this.message = this.add.text(
        900,
        900,
        "you successfully defended planet fullstack!",
        {
          color: "#FFFFFF",
          fontSize: 50,
          fontStyle: "bold",
        }
      );
    }

    var playAgain = this.add.text(1000, 1000, "Click Here to play again", {
      color: "#FFFFFF",
      fontSize: 50,
      fontStyle: "bold",
    });
    playAgain.setInteractive({ useHandCursor: true });
    playAgain.on("pointerdown", () => this.clickButton());
  }

  clickButton() {
    this.scene.remove("Test_Level");
    this.scene.add("Test_Level", Test);
    this.scene.start("Test_Level");
  }
}
