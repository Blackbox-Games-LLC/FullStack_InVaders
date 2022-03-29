import Phaser from "phaser";
export default class CountdownController {
  /** @type {Phaser.Scene} */

  scene;

  /** @type {Phaser.GameObjects.Text} */
  label;

  /** @type {Phaser.Time.TimerEvent} */
  timerEvent;

  duration = 0;

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {Phaser.GameObjects.Text} label
   */
  constructor(scene, label) {
    this.scene = scene;
    this.label = label;
  }
  /**
   * @param {()=>void} callback
   * @param {number} duration
   */
  start(callback, duration = 300000) {
    this.stop();

    this.finishedCallback = callback;
    this.duration = duration;

    this.timerEvent = this.scene.time.addEvent({
      delay: duration,
      callback: () => {
        // this.label.text = "0";
        this.stop();
        if (callback) {
          callback();
        }
      },
      //  loop: true,
    });
  }
  stop() {
    if (this.timerEvent) {
      this.timerEvent.destroy();
      this.timerEvent = undefined;
    }
  }

  update() {
    if (!this.timerEvent || this.duration <= 0) {
      return false;
    }
    const elapsed = this.timerEvent.getElapsed();
    // console.log(elapsed);
    let remaining = this.duration - elapsed;
    console.log(remaining);
    let seconds = remaining / 1000;
    //console.log("seconds", seconds);
    let mins = Math.floor(seconds / 60);
    let currentSeconds = seconds - mins * 60;
    // console.log("mins", mins);
    this.label.text = `${mins.toFixed(0)}:${currentSeconds.toFixed(1)}`;
  }
}
