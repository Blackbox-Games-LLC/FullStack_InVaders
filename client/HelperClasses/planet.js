import Phaser from "phaser";

export default class Planet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    this.scene = scene;
    scene.add.existing(this)
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
      }
    });

    //what happens when an alien kamakazes into earth
    scene.physics.add.overlap(this, scene.alien, () => {
      scene.planet.health -= 100
      console.log(this.health)
    })

    this.setCircle(1000, -390, -390);
    this.setCollideWorldBounds(true)
    this.setImmovable(true)
    this.health = 20000;
  }
}

