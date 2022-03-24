import Phaser from "phaser";
import BaseOffenseAI from "./AI";
import Bullet from "./bullets";
// import Alien from "./alien";
// import MotherShip from "./mothership";

export default class Offense extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
        particles.destroy()
      }
    });
    let offenseAngle = 0;
    scene.physics.add.overlap(this, scene.mothership, () => {
      this.setposition(x, y);
      this.alienTarget = false;
      offenseAngle = Phaser.Math.Angle.Wrap(offenseAngle, 0.01)
      Phaser.Math.RotateAroundDistance(this, scene.mothership1.x, scene.mothership1.y, offenseAngle, -250)
    })

    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setSize(50, 50);
    this.setDepth(1);

    this.alienTarget = true;
    this.health = 50;
    this.shotdelay = 2000

    scene.offensebullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })

    const path = new Phaser.Math.Vector2(1,0);
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
    particles.setDepth(0);

  }

  update(time) {
    if (this.alienTarget) {
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.mothership1)
    } else {
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.mothership2)
    }
    if (time > this.shotdelay) {
      let bullet = this.scene.offensebullets.get(0, 0, "offense-bulllet");
      bullet.fire(this)
      this.shotdelay = time + (1000);
    }
  }

  // seekAndDestroy() {
  //   new BaseOffenseAI(scene, x, y, offense, alien, mothership)
  // }


  // seek() {
  //   //  Pick a random target point
  //   var entry = Phaser.Utils.Array.GetRandom(this.scene.points);

  //   this.target = entry;

  //   this.isSeeking = false;

  //   this.scene.tweens.add({
  //     targets: this.body.velocity,
  //     x: 0,
  //     y: 0,
  //     ease: "Linear",
  //     duration: 500,
  //     onComplete: function (tween, targets, alien) {
  //       ship.isSeeking = true;
  //       ship.scene.tweens.add({
  //         targets: alien,
  //         speed: 150,
  //         delay: 500,
  //         ease: "Sine.easeOut",
  //         duration: 1000,
  //       });
  //     },
  //     onCompleteParams: [this],
  //   });
  // }
}