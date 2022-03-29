import Phaser from "phaser";

export default class Defense extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setDepth(1);

    this.health = 500;
    this.offenseTarget = true;

    const explode = scene.sound.add('alien-blowup', { volume: 0.4 });
    let defenseAngle = 0;

    this.anims.create({
      key:  "satellite-explosion",
      frameRate: 25,
      frames: this.anims.generateFrameNumbers("alien", {start: 2, end: 31})
    })

    scene.physics.add.overlap(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.offenseTarget = false;
        explode.play()
        this.body.stop();
        this.body.destroy();
        this.play("satellite-explosion");
        this.once("animationcomplete", () => {
          this.destroy();
        })
      }
    });

    scene.physics.add.overlap(this, scene.core, () => {
      this.setPosition(x, y);
      defenseAngle = Phaser.Math.Angle.Wrap(defenseAngle - 0.0025)
      Phaser.Math.RotateAroundDistance(this, scene.core.x, scene.core.y, defenseAngle, 750)
    })
  }

}
