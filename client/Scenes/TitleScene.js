import axios from "axios";
import Phaser from "phaser";
import Test from "../Scenes/TestLevel";
import Mercury from "../Scenes/Mercury";
import Venus from "../Scenes/Venus";
import Mars from "../Scenes/Mars";
import Jupiter from "../Scenes/Jupiter";
import Saturn from "../Scenes/Saturn";
import Uranus from "../Scenes/Uranus";
import Neptune from "../Scenes/Neptune";
import Pluto from "../Scenes/Pluto";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title_Scene");
  }

  preload() {
    this.load.image("title", "/assets/titlescreen-min.png");
    this.load.video("intro-video", "/assets/Fullstack_Invaders.mp4");
    this.load.image("logo", "/assets/logo.png")
  }

  create() {
    this.add.image(2550, 1400, "title").setDisplaySize(5098, 2800)
    this.add.image(2500, 300, "logo").setDisplaySize(4000 ,300)

    let video = this.add.video(800, 600, "intro-video").setPosition(2500, 900);
    // video.play(true);


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

    var earth = this.add.text(1050, 1900, "EARTH", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });

    var mercury = this.add.text(1350, 1900, "MERCURY", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });

    var venus = this.add.text(1750, 1900, "VENUS", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    })

    var mars = this.add.text(2050, 1900, "MARS", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });

    var jupiter = this.add.text(2300, 1900, "JUPITER", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });

    var saturn = this.add.text(2700, 1900, "SATURN", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    });

    var uranus = this.add.text(3050, 1900, "URANUS", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    })

    var neptune = this.add.text(3400, 1900, "NEPTUNE", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    })

    var pluto = this.add.text(3800, 1900, "PLUTO", {
      color: "#FFFFFF",
      fontSize: 80,
      fontStyle: "bold",
      backgroundColor: "#000000",
    })



    earth.setInteractive({ useHandCursor: true })
    earth.on('pointerdown', () => this.clickButtonEarth())
    mercury.setInteractive({ useHandCursor: true })
    mercury.on('pointerdown', () => this.clickButtonMercury())
    venus.setInteractive({ useHandCursor: true })
    venus.on('pointerdown', () => this.clickButtonVenus())
    mars.setInteractive({ useHandCursor: true })
    mars.on('pointerdown', () => this.clickButtonMars())
    jupiter.setInteractive({ useHandCursor: true })
    jupiter.on('pointerdown', () => this.clickButtonJupiter())
    saturn.setInteractive({ useHandCursor: true })
    saturn.on('pointerdown', () => this.clickButtonSaturn())
    uranus.setInteractive({ useHandCursor: true })
    uranus.on('pointerdown', () => this.clickButtonUranus())
    neptune.setInteractive({ useHandCursor: true })
    neptune.on('pointerdown', () => this.clickButtonNeptune())
    pluto.setInteractive({ useHandCursor: true })
    pluto.on('pointerdown', () => this.clickButtonPluto())


  }

  clickButtonEarth() {
    this.scene.remove("Test_Level");
    this.scene.add("Test_Level", Test);
    this.scene.start("Test_Level");
  }
  clickButtonMercury() {
    this.scene.remove("Mercury");
    this.scene.add("Mercury", Mercury);
    this.scene.start("Mercury");
  }
  clickButtonVenus() {
    this.scene.remove("Venus");
    this.scene.add("Venus", Venus);
    this.scene.start("Venus")
  }
  clickButtonMars() {
    this.scene.remove("Mars");
    this.scene.add("Mars", Mars);
    this.scene.start("Mars")
  }
  clickButtonJupiter() {
    this.scene.remove("Jupiter");
    this.scene.add("Jupiter", Jupiter);
    this.scene.start("Jupiter")
  }
  clickButtonSaturn() {
    this.scene.remove("Saturn");
    this.scene.add("Saturn", Saturn);
    this.scene.start("Saturn")
  }
  clickButtonUranus() {
    this.scene.remove("Uranus");
    this.scene.add("Uranus", Uranus);
    this.scene.start("Uranus")
  }
  clickButtonNeptune() {
    this.scene.remove("Neptune");
    this.scene.add("Neptune", Neptune);
    this.scene.start("Neptune")
  }
  clickButtonPluto() {
    this.scene.remove("Pluto");
    this.scene.add("Pluto", Pluto);
    this.scene.start("Pluto")
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