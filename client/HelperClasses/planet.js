import Phaser from "phaser";
import Bases from "./bases"

export default class Planet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    this.scene = scene;
    scene.add.existing(this)
    scene.physics.add.existing(this);


    let barrier = this.setCircle(1000)

    //Adjust barrier around planet

    this.setCollideWorldBounds(true)
    this.setImmovable(true)

  }

  spawnBases() {

  }
}

