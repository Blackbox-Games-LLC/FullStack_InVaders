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


    // damage from aliens blasters
    scene.physics.add.overlap(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
        particles.destroy()
      }
    });


    this.health = 50;
    this.shotdelay = 2000

    scene.offensebullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })

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

  }

  update(time) {
    let offenseAngle = 0;
    let alienEnemy = this.scene.aliens.getChildren();
    let enemyNumber = 0;
    if (alienEnemy[enemyNumber]) {
      this.scene.physics.add.overlap(this, alienEnemy, () => {
      this.setPosition(x, y);
      offenseAngle = Phaser.Math.Angle.Wrap(offenseAngle, 0.01)
      Phaser.Math.RotateAroundDistance(this, alienEnemy[enemyNumber].x, alienEnemy[enemyNumber].y, offenseAngle, -250)
      })
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, alienEnemy[enemyNumber])
      this.scene.physics.moveToObject(this, alienEnemy[enemyNumber])
    } else {
      enemyNumber += 1;
    }
    
    // if (this.scene.physics.closest(this.aliens)) {
    //   this.scene.physics.moveToObject(this, this.aliens)
    // } else if (this.scene.physics.closest(this.scene.mothership4)) {
    //   let offenseAngle = 0;
    //   this.scene.physics.add.overlap(this, this.scene.mothership4, () => {
    //   this.setposition(x, y);
    //   offenseAngle = Phaser.Math.Angle.Wrap(offenseAngle, 0.01)
    //   Phaser.Math.RotateAroundDistance(this, this.scene.mothership4.x, this.scene.mothership4.y, offenseAngle, -250)
    //   })
    //   this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.mothership4)
    //   this.scene.physics.moveToObject(this, this.scene.mothership4)
    // } else if (this.scene.physics.closest(this.scene.mothership2)) {
    //   this.scene.physics.moveToObject(this, this.scene.mothership2)
    // } else if (this.scene.physics.closest(this.scene.mothership3)) {
    //   this.scene.physics.moveToObject(this, this.scene.mothership3)
    // } else {
    //   this.scene.physics.moveToObject(this, this.scene.mothership4)
    // }

    if (time > this.shotdelay) {
      let bullet = this.scene.offensebullets.get(0, 0, "offense-bulllet");
      bullet.setDisplaySize(20, 10).fire(this)
      this.shotdelay = time + (1000);
    }
  } aww

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