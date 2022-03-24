import Phaser from "phaser";
import axios from "axios";

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super("Login_Scene");
  }

  preload() {
    this.load.html("login", "/assets/text/login.html");
  }

  create() {
    this.message = this.add
      .text(2000, 1000, "Login or Register ", {
        color: "#FFFFFF",
        fontSize: 60,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.nameInput = this.add.dom(2000, 1500).createFromCache("login");

    this.returnKey = this.nameInput.addListener("click");

    this.returnKey.on("click", async (event) => {
      let name = this.nameInput.getChildByName("name");

      if (event.target.name == "loginButton") {
        let loginResult = await axios.post("/api/login", {
          username: name.value,
        });
        console.log("loginResult", loginResult);
        if (loginResult.data.username === name.value) {
          // localStorage.setItem("username", name.value);
          // localStorage.setItem("score", loginResult.data.score);
          // localStorage.getItem("score");
          this.scene.switch("Test_Level");
        }
      }
      if (event.target.name === "registerButton") {
        let registerResult = await axios.post("/api/register", {
          username: name.value,
          score: 0,
        });
        console.log("register", registerResult);
        if (registerResult.data.hasOwnProperty("error")) {
          console.log(registerResult.data.error);
          this.message.setText(registerResult.data.error);
        } else {
          this.message.setText("Register Successful Please Login to Play");
        }
      }
      name.value = "";
    });
  }
  update() {}
  clickButton() {
    this.scene.switch("Test_Level");
  }
}

//localStorage.removeItem("score");
