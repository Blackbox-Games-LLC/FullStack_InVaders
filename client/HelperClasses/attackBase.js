import Phaser from "phaser";
import offenseSatellite from "./offenseSatellite";
import Bullet from "./bullets";

export default class AttackBase extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'offense-base');
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
    this.setDepth(2)

    this.health = 1000
    this.spawnDelay = 10000

    if (!scene.offenseSatellites) {
      scene.offenseSatellites = scene.physics.add.group({
        classType: offenseSatellite,
        scene: scene,
        runChildUpdate: true,
        immovable: true
      })
    }
    scene.offensebullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })
  }
  spawnSatellites() {
    let b = this.getTopCenter();
    this.scene.offenseSatellites.get((b.x) + Phaser.Math.Between(-100, 100), (b.y) + Phaser.Math.Between(-100, 100), "offense")
  }
  update(time) {
    if (time > this.spawnDelay) {
      this.spawnSatellites()
      this.spawnDelay = time * 5
    }
  }
}
