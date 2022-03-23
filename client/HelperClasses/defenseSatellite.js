import Phaser from "phaser";

export default class Defense extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
      }
    });

    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setDepth(1);

    this.health = 250;
    
    const path = new Phaser.Math.Vector2(1,0)
    path.getLength
  }

}
