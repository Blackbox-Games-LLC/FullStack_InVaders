import Phaser from "phaser";
import HealthBar from "../UI/HealthBar"

export default class Planet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    this.scene = scene;
    scene.add.existing(this)
    scene.physics.add.existing(this);
    this.setCircle(this.width / 2);
    this.setCollideWorldBounds(true)
    this.setImmovable(true)

    //planet stats
    this.health = 20000;
    this.hp = new HealthBar(this.scene, 1600, 1700, this.health, 800, 80)

    scene.zone = scene.physics.add.image(this.x, this.y).setCircle(this.width, -(this.width - 20), -(this.height - 20))
  }
}

