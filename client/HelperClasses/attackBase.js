import Phaser from "phaser";
import offenseSatellite from "./offenseSatellite";
import HealthBar from "../UI/HealthBar";

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

    this.health = 1000
    this.spawnDelay = 0

    if (!scene.offenseSatellites) {
      scene.offenseSatellites = scene.physics.add.group({
        classType: offenseSatellite,
        scene: scene,
        runChildUpdate: true,
        immovable: true
      })
    }

  }
  spawnSatellites() {
    let b = this.getTopCenter();
    // new offenseSatellite(this.scene, b.x + Phaser.Math.Between(-100,100), b.y, "offense")



    let offense = this.scene.offenseSatellites.get((b.x) + Phaser.Math.Between(-100, 100), (b.y) + Phaser.Math.Between(-100,100), "offense")
    this.scene.physics.moveToObject(offense, this.scene.mothership1, 20, 10000)
  }
  update(time) {
    if (time > this.spawnDelay) {
      this.spawnSatellites()
      let numOffense = this.scene.attackBases.getLength();
      this.spawnDelay = time + (numOffense * 2000) + Phaser.Math.Between(0, 300)
    }
    
  }
}
