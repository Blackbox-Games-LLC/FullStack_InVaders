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

    //alien Bullet Damage
    scene.physics.add.collider(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.hp.delete()
        this.destroy();
      }
    });

    //alien kamakazi Damage
    scene.physics.add.overlap(this, scene.aliens, () => {
      scene.planet.health -= 100
      console.log(this.health)
    })

    //planet stats
    this.health = 20000;
    this.hp = new HealthBar(this.scene, this.x, this.y, this.health, 800, 80)


    scene.zone = scene.physics.add.image(this.x, this.y).setCircle(this.width, -(this.width - 20), -(this.height - 20))
  }
}

