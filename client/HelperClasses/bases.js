import Phaser from "phaser";

export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);

  }
}
