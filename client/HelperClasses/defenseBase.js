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
        immovable: true
      })
    }

  }
  spawnSatellites() {
    let b = this.getCenter();
      // new defenseSatellite(this.scene, b.x + Phaser.Math.Between(-100,100), b.y, "defense")

    let defense = this.scene.defenseSatellite.get((b.x) + Phaser.Math.Between(-100, 100), (b.y) + Phaser.Math.Between(-100,100), "defense")
    this.scene.physics.moveToObject(defense, this.scene.planet, 10, 750)
  }
  update(time) {
    if (time > this.spawnDelay) {
      this.spawnSatellites()
      // let numDefense = this.scene.defenseBases.getlength()
      this.spawnDelay = time + (2 * 750) + Phaser.Math.Between(0, 300)
    }
  }
}
