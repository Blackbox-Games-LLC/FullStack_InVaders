import Phaser from "phaser";
import Bullet from "./bullets";

export default class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.bullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
      }
    });

    scene.physics.add.overlap(this, scene.planet, () => {
      this.freefire = false
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.planet)
    })

    this.setScale(0.09, 0.09);
    this.setCircle(250);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.freefire = false
    this.health = 10;
    this.shotdelay = 1000

    scene.alienbullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })

  }

  update(time) {
    //if freefire is true, fire at ship
    if (this.freefire) {
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.ship)
      if (time > this.shotdelay) {
        let bullet = this.scene.alienbullets.get()
        bullet.fire(this)
        this.shotdelay = time + (5000);
      }
    }
  }
}
