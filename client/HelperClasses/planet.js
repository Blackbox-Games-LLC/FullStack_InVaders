import Phaser from "phaser";

export default class Planet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    this.scene = scene;
    scene.add.existing(this)
    scene.physics.add.existing(this);


    this.setCircle(1000, -390, -390);


    this.setCollideWorldBounds(true)
    this.setImmovable(true)

  }
}

