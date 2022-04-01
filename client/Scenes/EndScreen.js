import Phaser from "phaser";
import axios from "axios";
import Test from "./TestLevel";

export default class EndScreen extends Phaser.Scene {
    constructor() {
        super("End_Screen");
    }
    init(data) {
        this.condition = data.condition
        this.aliensScore = data.aliensScore
        this.motherShipScore = data.motherShipScore
    }

    preload() {
        // this.User = this.sys.game.globals.User
        // this.load.rexAwait(async (successCallback, failureCallback) => {
        //     if (this.User.id) {
        //         this.scores = await axios.get(`/api/score/${this.User.id}`);
        //         successCallback();
        //     }
        // });
    }
    create() {
        if (this.condition === false) {
            this.message = this.add.text(
                900, 900, `Game Over You stink! Number of Aliens destroyed: ${this.aliensScore}. Number of MotherShips Destroyed: ${this.motherShipScore}`, {
                color: "#FFFFFF",
                fontSize: 50,
                fontStyle: "bold",
            }
            )
        } else if (this.condition === true) {
            this.message = this.add.text(
                900, 900, `You successfully defended planet fullstack! Number of Aliens destroyed: ${this.aliensScore}. Number of MotherShips Destroyed: ${this.motherShipScore}`, {
                color: "#FFFFFF",
                fontSize: 50,
                fontStyle: "bold",
            }
            )
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
