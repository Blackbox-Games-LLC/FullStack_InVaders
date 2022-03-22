import Phaser from "phaser";
import defenseSatellite from "./defenseSatellite";
import offenseSatellite from "./offenseSatellite";
import HealthBar from "../UI/HealthBar";

export default class Base extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'defense-base');
    this.scene = scene;
   scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.bullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
      }
    });

    this.setCollideWorldBounds(true)
    this.setImmovable(true)

    this.health = 1000
     this.spawnDelay = 0

  }
  spawnSatellites() {
    let random = Math.round(Math.random())
    let b = this.getTopCenter();
    if (random === 1) {
      new offenseSatellite(this.scene, b.x + Phaser.Math.Between(-100,100), b.y, "offense")
    } else if (random === 0) {
      new defenseSatellite(this.scene, b.x + Phaser.Math.Between(-100,100), b.y, "defense")
    }
  }
  update(time) {
    if (this && time > this.spawnDelay) {
      this.spawnSatellites()
      this.spawnDelay = time + 50000
    }
  }
}
