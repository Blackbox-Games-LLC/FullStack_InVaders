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
    this.setDepth(1);


    // damage from aliens blasters
    scene.physics.add.overlap(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.body.stop();
        this.body.destroy();
        // particles.destroy()
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
      lifespan: { onEmit: () => { return Phaser.Math.Percent(this.body.speed, 0, 300) * 500 } },
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
    let offenseAngle = 0;
    let alienEnemy = this.scene.aliens.getChildren();
    let enemyNumber = 0;
    if (alienEnemy[enemyNumber]) {
      // this.scene.physics.add.overlap(this, alienEnemy, () => {
      //   this.setPosition(x, y);
      //   offenseAngle = Phaser.Math.Angle.Wrap(offenseAngle, 0.01)
      //   Phaser.Math.RotateAroundDistance(this, alienEnemy[enemyNumber].x, alienEnemy[enemyNumber].y, offenseAngle, -250)
      // })
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, alienEnemy[enemyNumber])
      this.scene.physics.moveToObject(this, alienEnemy[enemyNumber])
    } else {
      enemyNumber += 1;
    }

    if (time > this.shotdelay) {
      // this.shoot.play
      let bullet = this.scene.offensebullets.get(0, 0, "offense-bulllet");
      bullet.setDisplaySize(20, 10).fire(this)
      this.shotdelay = time + (1000);
    }
  }
}