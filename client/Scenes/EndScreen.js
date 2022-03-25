import Phaser from "phaser";
import axios from "axios";

export default class EndScreen extends Phaser.Scene {
  constructor() {
    super("End_Screen");
  }
  init(data) {}

  preload() {
    this.load.rexAwait(async (successCallback, failureCallback) => {
      this.name = await axios.get("/api/user/1");
      console.log(this.name.data.username);

      successCallback();
    });
    // const asyncLoader = (loaderPlugin) =>
    //   new Promise((resolve, reject) => {
    //     loaderPlugin.on("filecomplete", resolve).on("loaderror", reject);
    //     loaderPlugin.start();
    //   });
    // const doStuff = async () => {
    //   asyncLoader(await axios.get("/api/user/1"));
    // };
    // console.log("hello", doStuff());
  }
  create() {
    this.add.text(2000, 1500, this.name.data.username, {
      fontSize: 100,
    });
  }
}
