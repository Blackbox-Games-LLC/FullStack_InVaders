import Phaser from "phaser";
import HealthBar from "../UI/HealthBar";
export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ship");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // scene.physics.add.collider(this, scene.bullet, () => {
    //   if (this.health > 0) {
    //             scene.bullet.destroy()
    //             this.health -= 10
    //         } else {
    //             scene.bullet.destroy()
    //             this.destroy()
    //         }
    // })

    this.setDrag(300);
    this.setAngularDrag(400);
    this.setMaxVelocity(1000);
    this.setDepth(1);

    this.setCollideWorldBounds(true);
    this.health = 100;
    this.hp = new HealthBar(this.scene, 100, 1000, this.health);

  }
}
