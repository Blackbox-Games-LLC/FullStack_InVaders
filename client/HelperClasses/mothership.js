import Phaser from "phaser";
import Alien from "./alien";
import HealthBar from "../UI/HealthBar";

export default class MotherShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'mothership');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, scene.playerbullets, () => {
      //healthbar. have to figure out how to render one health bar per mothership instance.

      if (this.health > 0) {
        this.health -= 10;
        this.hp.decrease(this.health)
      } else {
        this.destroy();
      }
      console.log(this.health)
    });
    scene.physics.add.overlap(this, scene.ship, () => {
      scene.ship.health -= 1
      console.log(scene.ship.health)
    })

    this.setSize(400, 550);

    this.setCollideWorldBounds(true);
    this.setDepth(2)
    this.setImmovable(true);

    this.health = 1000;
    this.spawnDelay = 0

    this.hp = new HealthBar(this.scene, this.x, this.y, this.health);

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
      this.spawnDelay = time + (num * 1000) + Phaser.Math.Between(0, 300);
    }
  }
}
