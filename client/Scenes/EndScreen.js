import Phaser from "phaser";
import axios from "axios";
import Test from "../Scenes/TestLevel";
import Mercury from "../Scenes/Mercury";
import Venus from "../Scenes/Venus";
import Mars from "../Scenes/Mars";
import Jupiter from "../Scenes/Jupiter";
import Saturn from "../Scenes/Saturn";
import Uranus from "../Scenes/Uranus";
import Neptune from "../Scenes/Neptune";
import Pluto from "../Scenes/Pluto";

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
        switch (this.level) {
            case 1:
                this.scene.remove("Test_Level");
                this.scene.add("Test_Level", Test);
                this.scene.start("Test_Level");
                break;
            case 2:
                this.scene.remove("Mercury");
                this.scene.add("Mercury", Mercury);
                this.scene.start("Mercury");
                break;
            case 3:
                this.scene.remove("Venus");
                this.scene.add("Venus", Venus);
                this.scene.start("Venus")
                break;
            case 4:
                this.scene.remove("Mars");
                this.scene.add("Mars", Mars);
                this.scene.start("Mars")
                break;
            case 5:
                this.scene.remove("Jupiter");
                this.scene.add("Jupiter", Jupiter);
                this.scene.start("Jupiter")
                break;
            case 6:
                this.scene.remove("Saturn");
                this.scene.add("Saturn", Saturn);
                this.scene.start("Saturn")
                break;
            case 7:
                this.scene.remove("Uranus");
                this.scene.add("Uranus", Uranus);
                this.scene.start("Uranus")
                break;
            case 8:
                this.scene.remove("Neptune");
                this.scene.add("Neptune", Neptune);
                this.scene.start("Neptune")
                break;
            case 9:
                this.scene.remove("Pluto");
                this.scene.add("Pluto", Pluto);
                this.scene.start("Pluto")
                break;
            default:
                this.scene.start("Title_Scene")
        }

    }
}
