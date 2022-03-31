import axios from "axios";
import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title_Scene");
  }

  preload() {
    //  this.load.image('background','assets/title.png')
    this.load.html("form", "/assets/text/form.html");
    this.load.image("title", "/assets/titlescreen-min.png");
    this.load.video("intro-video", "/assets/Fullstack_Invaders.mp4")
  }

  create() {
    this.add.image(2550, 1400, "title").setDisplaySize(5098, 2800)
    let x = 5098 / window.innerWidth
    let y = 2800 / window.innerHeight
    this.nameInput = this.add.dom(5098 / 2, 2800 / 2).createFromCache("form")
    this.nameInput.setScale(Math.max(x, y))


    //console.log("inputname", this.nameInput);



    this.message = this.add.text(1400, 1400, "Forward - W | Backward - S | Left - A | Right - D", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });

    this.message = this.add.text(2200, 1500, "Attack - SPACE ", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });

    //list of levels

    this.message = this.add.text(2200, 1800, "SELECT A LEVEL", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    })

    var earth = this.add.text(2200, 1900, "EARTH", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    })

    var uranus = this.add.text(2200, 2000, "URANUS LOL", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    })
    var venus = this.add.text(2200, 2100, "VENUS", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    })

    let video = this.add.video(800, 600, "intro-video").setPosition(2500, 600);
    // video.play(true);

    earth.setInteractive({useHandCursor: true})
    earth.on('pointerdown', ()=>this.clickButtonEarth())
    uranus.setInteractive({useHandCursor: true})
    uranus.on('pointerdown', ()=>this.clickButtonUranus())
    venus.setInteractive({useHandCursor: true})
    venus.on('pointerdown', ()=>this.clickButtonVenus())

  }

  clickButtonEarth() {
    this.scene.start("Test_Level");
  }
  clickButtonUranus(){
    this.scene.start("Uranus")
  }
  clickButtonVenus(){
    this.scene.start("Venus")
  }
}


    



    // this.returnKey = this.nameInput.addListener("click");

    // this.returnKey.on("click", async (event) => {
    //   if (event.target.name === "loginButton") {
    //     this.scene.switch("Login_Scene");
    //   }

    //   if (event.target.name === "playButton") {
    //     this.scene.switch("Test_Level");
    //     video.stop()
    //   }
    // });