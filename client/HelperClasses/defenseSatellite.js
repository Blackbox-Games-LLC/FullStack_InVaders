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
    scene.physics.add.overlap(this, scene.alienbulletes, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.body.destroy();
      }
    });

    let defenseAngle = 0;
    scene.physics.add.overlap(this, scene.planet, () => {
      this.setPosition(x, y);
      defenseAngle = Phaser.Math.Angle.Wrap(defenseAngle - 0.001)
      Phaser.Math.RotateAroundDistance(this, scene.planet.x, scene.planet.y, defenseAngle, 750)
    })

    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setDepth(1);

    this.health = 250;
    
  }

}
