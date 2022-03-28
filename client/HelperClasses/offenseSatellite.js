import Phaser from "phaser";
import Bullet from "./bullets";

export default class Offense extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(false, true);
    this.setImmovable(true);
    this.setSize(50, 50);
    this.setDepth(2);

    this.scene = scene
    this.target = null
    this.health = 50;
    this.shotdelay = 2000

    const path = new Phaser.Math.Vector2(1, 0);
    path.setToPolar(this.rotation, 1);
    const px = -path.x;
    const py = -path.y;
    const particles = scene.add.particles("offense-exhaust");

    particles.createEmitter({
      quantity: 10,
      speedY: { min: 20 * py, max: 50 * px },
      speedX: { min: -10 * px, max: 10 * px },
      accelerationY: 1000 * py,
      accelerationx: 1000 * px,
      lifespan: { onEmit: () => { return Phaser.Math.Percent(this.body.speed, 0, 300) * 2000 } },
      alpha: { start: 0.5, end: 0, ease: "Sine.easeIn" },
      rotate: { min: -180, max: 180 },
      angle: { min: 30, max: 110 },
      blendMode: "ADD",
      frequency: 75,
      scale: { start: 0.02, end: 0.02 },
      follow: this,
      followOffset: { y: this.height - 60 },
    });
    particles.setDepth(2);

    this.target = 0
    this.targets = []
  }

  update(time) {
    if (this.targets.length < 2) {
      this.targets = this.scene.aliens.getChildren();
      this.target = 0
    }
    if (this.targets[this.target]) {

      this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.targets[this.target])
      this.scene.physics.moveToObject(this, this.targets[this.target])

    } else this.target++


    if (time > this.shotdelay) {
      let bullet = this.scene.offensebullets.get(0, 0, "offense-bullet");
      bullet.setDisplaySize(20, 10).fire(this)
      this.shotdelay = time + (1000);
    }
  }
}