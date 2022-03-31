import axios from "axios";
import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title_Scene");
  }

  preload() {
    //  this.load.image('background','assets/title.png')
    this.load.image("title", "/assets/titlescreen-min.png");
    this.load.video("intro-video", "/assets/Fullstack_Invaders.mp4")
  }

  create() {
    this.add.image(2550, 1400, "title").setDisplaySize(5098, 2800)


    //console.log("inputname", this.nameInput);



    this.message = this.add.text(1700, 1400, "Forward - W | Left - A | Right - D", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });

    this.message = this.add.text(2200, 1600, "Attack - SPACE ", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });



    let video = this.add.video(800, 600, "intro-video").setPosition(2500, 600);
    video.play(true);

    this.returnKey = this.nameInput.addListener("click");

    this.returnKey.on("click", async (event) => {
      if (event.target.name === "loginButton") {
        this.scene.switch("Login_Scene");
      }

      if (event.target.name === "playButton") {
        this.scene.switch("Test_Level");
        video.stop()
      }
    });
  }
  // clickButton() {
  //   this.scene.switch("Test_Level");
  // }
}
