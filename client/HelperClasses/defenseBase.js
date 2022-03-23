import Phaser from "phaser";
import defenseSatellite from "./defenseSatellite";
import HealthBar from "../UI/HealthBar";

export default class DefenseBase extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'defense-base');
    this.scene = scene;
   scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.alienbullets, () => {
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
    let b = this.getTopCenter();


      new defenseSatellite(this.scene, b.x + Phaser.Math.Between(-100,100), b.y, "defense")

    // let offense = this.scene.offenseSatellite.get((b.x) + Phaser.Math.Between(-100, 100), (b.y) + Phaser.Math.Between(-100,100), "offense")
    // this.scene.physics.moveToObject(offense, this.scene.motherships, 20, 1000)
  }
  update(time) {
    if (this && time > this.spawnDelay) {
      this.spawnSatellites()
      this.spawnDelay = time + 50000
    }
    // this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.motherships)
  }
}
