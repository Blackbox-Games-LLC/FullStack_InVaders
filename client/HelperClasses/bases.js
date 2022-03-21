import Phaser from "phaser";
import defenseSatellite from "./defenseSatellite";
import offenseSatellite from "./offenseSatellite";

export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this)
    scene.physics.add.collider(this, scene.bullets, () => {
      if (this.health > 0) {
        this.health -= 10
      } else {
        this.destroy()
      }
    })

    this.setCollideWorldBounds(true)
    this.setImmovable(true)
    // this.setSize(100,100)
    this.health = 100

  }
  spawnSatellites() {

  }
}
