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

    if(!scene.defenseSatellite) {
      scene.defenseSatellite = scene.physics.add.group({
        classType: defenseSatellite,
        scene: scene,
        runChildUpdate: true,
        immovable: true,
        maxSize: 200
      })
    }

  }
  spawnSatellites() {
    let b = this.getCenter();
      // new defenseSatellite(this.scene, b.x + Phaser.Math.Between(-100,100), b.y, "defense")

    let defense = this.scene.defenseSatellite.get((b.x) + Phaser.Math.Between(-100, 100), (b.y) + Phaser.Math.Between(-100,100), "defense")
    this.scene.physics.moveToObject(defense, this.scene.core, -20)
  }
  update(time) {
    // this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.core)
    if (time > this.spawnDelay) {
      this.spawnSatellites()
      this.spawnDelay = time * 1.5
    }
  }
}
