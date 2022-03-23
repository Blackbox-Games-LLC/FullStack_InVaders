import Phaser from "phaser";

export default class Defense extends Phaser.Physics.Arcade.Sprite {
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

    this.setCircle();
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.health = 250;
  }

}
