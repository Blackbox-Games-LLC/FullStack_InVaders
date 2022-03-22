import Phaser from "phaser";

export default class Planet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    this.scene = scene;
    scene.add.existing(this)
    scene.physics.add.existing(this);


    this.setCircle(800, -180 ,-180)

    //Adjust barrier around planet

    this.setCollideWorldBounds(true)
    this.setImmovable(true)

  }
}

