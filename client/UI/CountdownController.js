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
  start(callback, duration = 6000000) {
    this.stop();

    this.finishedCallback = callback;
    this.duration = 10;

    this.timerEvent = this.scene.time.addEvent({
      delay: duration,
      // repeat: duration,
      callback: () => {
        // this.label.text = "0";
        this.stop();
        if (callback) {
          callback();
        }
      },
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
    const remaining = this.duration + elapsed;
    const seconds = remaining / 1000;
    const mins = seconds / 60;
    // console.log(seconds);
    this.label.text = `${mins.toFixed(0)}:${seconds.toFixed(1)}`;
  }
}
