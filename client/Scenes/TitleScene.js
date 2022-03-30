import axios from "axios";
import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title_Scene");
  }

  preload() {
    //  this.load.image('background','assets/title.png')
    this.load.html("form", "/assets/text/form.html");
    this.load.image("title", "/assets/titlescreen.png");
    this.load.video("intro-video", "/assets/Fullstack_Invaders.mp4")
  }

  create() {
    this.add.image(2000, 2000, "title").setDisplaySize(3800, 3800);
    this.nameInput = this.add.dom(2000, 1500).createFromCache("form");
    this.nameInput.width = 400;
    this.nameInput.displayWidth = 400;
    this.nameInput.height = 250;
    this.nameInput.displayHeight = 250;

    //console.log("inputname", this.nameInput);

  
    this.message = this.add.text(
      1000,
      50,
      "Created By:David Ruiz, Rich Rife, Ryan Heaux, Veysel Basbaydar ",
      {
        fontFamily: "Bungee",
        fontSize: "80px",
        color: "#000000",
        backgroundColor: "#9B9B9B",
        fontStyle: "italic",
        padding: { left: 10, right: 10, top: 10, bottom: 10 },
      }
    );

    let video = this.add.video(720, 600, "intro-video").setPosition(2000, 800);
    video.play(true);
    // this.message = this.add.text(700, 200, "Controls", {
    //   color: "#FFFFFF",
    //   fontSize: 75,
    //   fontStyle: "bold",
    // });
    // this.message = this.add.text(700, 300, "Press Key for movement : ", {
    //   backgroundColor: "#2372C0",
    //   fontSize: 80,
    //   fontFamily: "Ultra",
    // });
    // this.message = this.add.text(700, 400, "Move Forward .... W ", {
    //   color: "#FFFFFF",
    //   fontSize: 80,
    //   fontStyle: "bold",
    //   backgroundColor: "#7B9D1E",
    // });
    // this.message = this.add.text(700, 500, "Move Left .... A ", {
    //   color: "#FFFFFF",
    //   fontSize: 80,
    //   fontStyle: "bold",
    //   backgroundColor: "#7B9D1E",
    // });
    // this.message = this.add.text(700, 600, "Move Right .... D ", {
    //   color: "#FFFFFF",
    //   fontSize: 80,
    //   fontStyle: "bold",
    //   backgroundColor: "#7B9D1E",
    // });
    // this.message = this.add.text(700, 700, "Fire Attack .... SPACE ", {
    //   color: "#FFFFFF",
    //   fontSize: 80,
    //   fontStyle: "bold",
    //   backgroundColor: "#D0021B",
    // });
    // this.message = this.add
    //   .text(2000, 1000, "Hello", {
    //     color: "#FFFFFF",
    //     fontSize: 60,
    //     fontStyle: "bold",
    //   })
    //   .setOrigin(0.5);

    this.returnKey = this.nameInput.addListener("click");

    this.returnKey.on("click", async (event) => {
      if (event.target.name === "loginButton") {
        this.scene.switch("Login_Scene");
      }

      if (event.target.name === "playButton") {
        this.scene.switch("Test_Level");
      }
    });
  }
  // clickButton() {
  //   this.scene.switch("Test_Level");
  // }
}
