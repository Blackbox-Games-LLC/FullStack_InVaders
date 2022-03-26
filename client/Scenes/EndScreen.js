import Phaser from "phaser";
import axios from "axios";



export default class EndScreen extends Phaser.Scene {
    constructor() {
        super("End_Screen");
    }
    init(data) { }

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
        this.scores.map(current => {
            //new Score()
        })

    }
}
