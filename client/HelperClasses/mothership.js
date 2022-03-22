import Phaser from "phaser";
import Alien from "./alien";

export default class MotherShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'mothership');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, scene.playerbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
      }
      console.log(this.health)
    });
    scene.physics.add.overlap(this, scene.ship, () => {
      scene.ship.health -= 1
      console.log(scene.ship.health)
    })

    this.setDepth(2)
    this.setImmovable(true);

    this.health = 1000;
    this.spawnDelay = 0

    if (!scene.aliens) {
      scene.aliens = scene.physics.add.group({
        classType: Alien,
        scene: scene,
        runChildUpdate: true,
        immovable: true
      })
    }
  }
  spawnAliens() {
    let b = this.getCenter();
    let alien = this.scene.aliens.get((b.x) + Phaser.Math.Between(-100, 100), (b.y) + Phaser.Math.Between(-100, 100), 'alien')
    this.scene.physics.moveToObject(alien, this.scene.planet, 20, 10000)
  }
  update(time) {
    this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.planet)
    if (time > this.spawnDelay) {
      this.spawnAliens();
      let num = this.scene.motherships.getLength()
      this.spawnDelay = time + (num * 1000);
    }
  }
}
