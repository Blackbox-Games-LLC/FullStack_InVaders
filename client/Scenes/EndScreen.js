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

        this.load.image("background", "assets/starry-background.jpeg");
        this.load.image("playagain", "assets/PlayAgainButtonG.png")
        this.load.image("levelSelect", "assets/LevelSelectButton.png")
        this.load.bitmapFont("Text", "assets/GameText_0.png", "assets/GameText.xml")

    }
    create() {
        this.add
            .tileSprite(2824, 1024, 14000, 10000, "background")
            .setScrollFactor(0.8);

        this.add.bitmapText(1600, 1100, 'Text', 0, 64).setText(`Aliens destroyed: ${this.aliensScore}                  MotherShips Destroyed: ${this.motherShipScore}`)
        if (this.condition === false) {
            this.add.bitmapText(1900, 650, 'Text', 0, 64).setText(`You Failed To Defend The Planet!`)
        } else if (this.condition === true) {
            this.add.bitmapText(1900, 650, 'Text', 0, 64).setText(`You Defended The Planet!`)
        }

        var playAgain = this.add.image(2000, 1500, "playagain").setScale(2, 2);
        playAgain.setInteractive({ useHandCursor: true });
        playAgain.on("pointerdown", () => this.clickButton());

        var levelSelect = this.add.image(3000, 1500, "levelSelect").setScale(2, 2);
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
