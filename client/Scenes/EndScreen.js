import Phaser from "phaser";
import axios from "axios";
import Test from "./TestLevel";

export default class EndScreen extends Phaser.Scene {
    constructor() {
        super("End_Screen");
    }
    init(data) {
        this.condition = data.condition;
        this.aliensScore = data.aliensScore;
        this.motherShipScore = data.motherShipScore;
        this.level = data.level;
    }

    preload() {
        this.User = this.sys.game.globals.User;
        if (this.User.id) {
            this.load.rexAwait(async (successCallback, failureCallback) => {
                if (this.User.id) {
                    this.scores = await axios.post(`/api/score/${this.User.id}`, {
                        aliens: this.aliensScore,
                        motherships: this.motherShipScore,
                        level: this.level,
                        winOrLoss: this.condition
                    });
                    successCallback();
                }
            });
        }
    }
    create() {
        if (this.condition === false) {
            this.message = this.add.text(
                900,
                900,
                `Game Over You stink! Number of Aliens destroyed: ${this.aliensScore}. Number of MotherShips Destroyed: ${this.motherShipScore}`,
                {
                    color: "#FFFFFF",
                    fontSize: 50,
                    fontStyle: "bold",
                }
            );
        } else if (this.condition === true) {
            this.message = this.add.text(
                900,
                900,
                `You successfully defended planet fullstack! Number of Aliens destroyed: ${this.aliensScore}. Number of MotherShips Destroyed: ${this.motherShipScore}`,
                {
                    color: "#FFFFFF",
                    fontSize: 50,
                    fontStyle: "bold",
                }
            );
        }

        var playAgain = this.add.text(1000, 1100, "Click Here to play again", {
            color: "#FFFFFF",
            fontSize: 50,
            fontStyle: "bold",
        });
        playAgain.setInteractive({ useHandCursor: true });
        playAgain.on("pointerdown", () => this.clickButton());

        var levelSelect = this.add.text(1000, 1200, "Click Here to go back to Level Select", {
            color: "#FFFFFF",
            fontSize: 50,
            fontStyle: "bold",
        });
        levelSelect.setInteractive({ useHandCursor: true })
        levelSelect.on("pointerdown", () => this.clickHome())
    }

    clickHome() {
        this.scene.start("Title_Scene")
    }

    clickButton() {
        this.scene.remove("Test_Level");
        this.scene.add("Test_Level", Test);
        this.scene.start("Test_Level");
    }
}
