import axios from "axios";
import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title_Scene");
  }

  preload() {
    //   this.load.image('background','assets/title.png')
    this.load.html("form", "/assets/text/form.html");
  }

  create() {
    this.nameInput = this.add.dom(2000, 1500).createFromCache("form");
    this.nameInput.width = 400;
    this.nameInput.displayWidth = 400;
    this.nameInput.height = 250;
    this.nameInput.displayHeight = 250;

    //console.log("inputname", this.nameInput);

    this.message = this.add.text(
      600,
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
    this.message = this.add.text(700, 200, "Instructions", {
      color: "#FFFFFF",
      fontSize: 50,
      fontStyle: "bold",
    });
    this.message = this.add.text(700, 300, "Press Key for movement : ", {
      backgroundColor: "#2372C0",
      fontSize: 50,
      fontFamily: "Ultra",
    });
    this.message = this.add.text(700, 400, "Move Forward .... W ", {
      color: "#FFFFFF",
      fontSize: 50,
      fontStyle: "bold",
      backgroundColor: "#7B9D1E",
    });
    this.message = this.add.text(700, 500, "Move Left .... A ", {
      color: "#FFFFFF",
      fontSize: 50,
      fontStyle: "bold",
      backgroundColor: "#7B9D1E",
    });
    this.message = this.add.text(700, 600, "Move Down .... S ", {
      color: "#FFFFFF",
      fontSize: 50,
      fontStyle: "bold",
      backgroundColor: "#7B9D1E",
    });
    this.message = this.add.text(700, 700, "Move Right .... D ", {
      color: "#FFFFFF",
      fontSize: 50,
      fontStyle: "bold",
      backgroundColor: "#7B9D1E",
    });
    this.message = this.add.text(700, 800, "Fire Attack .... SPACE ", {
      color: "#FFFFFF",
      fontSize: 50,
      fontStyle: "bold",
      backgroundColor: "#D0021B",
    });
    this.message = this.add
      .text(2000, 1000, "Hello Please Login", {
        color: "#FFFFFF",
        fontSize: 60,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    // console.log("return key", this.returnKey);

    this.returnKey.on("down", async (event) => {
      let name = this.nameInput.getChildByName("name");
      // console.log("name", name);
      let loginResult = await axios.post("/api/login", {
        username: name.value,
      });
      console.log("loginResult", loginResult);
      if (loginResult.data.username === name.value) {
        this.scene.switch("Test_Level");
      } else {
        this.message.setText("Wrong User Name");
      }
      name.value = "";
    });
  }
  clickButton() {
    this.scene.switch("Test_Level");
  }
}
