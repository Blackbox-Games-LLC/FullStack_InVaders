import Phaser from "phaser";
import axios from "axios";



export default class EndScreen extends Phaser.Scene {
    constructor() {
        super("End_Screen");
    }
    init(data) {
        this.loss = data.loss
        this.win = data.win
    }

    preload() {
        this.User = this.sys.game.globals.User
        this.load.rexAwait(async (successCallback, failureCallback) => {
            if (this.User.id) {
                this.scores = await axios.get(`/api/score/${this.User.id}`);
                successCallback();
            }
        });
    }
    create() {
        // this.scores.map(current => {
        //     //new Score()
        // })

        if(this.loss){
            this.message = this.add.text(
                900, 900, "Lol you suck", {
                    color: "#FFFFFF",
                    fontSize: 50,
                    fontStyle: "bold",
                }
            )
        } else if(this.win){
            this.message = this.add.text(
                900, 900, "you successfully defended planet fullstack!", {
                    color: "#FFFFFF",
                    fontSize: 50,
                    fontStyle: "bold",
                }
            )
        }
        
        var playAgain = this.add.text(
            1000, 1000, "Click Here to play again", 
            {
                color: "#FFFFFF",
                fontSize: 50,
                fontStyle: "bold",
            }
        )
        playAgain.setInteractive({useHandCursor: true})
        playAgain.on('pointerdown', ()=>this.clickButton())    
    }

    clickButton() {
        this.scene.start("Test_Level");
    }
}
