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
    this.message = this.add
      .text(2000, 1000, "Hello Please Login", {
        color: "#FFFFFF",
        fontSize: 60,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    console.log("message", this.message);

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
