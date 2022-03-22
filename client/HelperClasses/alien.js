import Phaser from "phaser";
import Bullet from "./bullets";

export default class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, scene.playerbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
        particles.destroy()
      }
    });

    scene.physics.add.overlap(this, scene.planet, () => {
      this.body.reset(this.x, this.y)
      this.freefire = false
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, scene.offbase)

    })

    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setSize(50, 50)
    this.setDepth(1)


    this.freefire = true
    this.health = 10;
    this.shotdelay = 2000

    scene.alienbullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })

    const particles = scene.add.particles("alien_exhaust");

    const direction = new Phaser.Math.Vector2(1, 0);
    direction.setToPolar(this.rotation, 1);
    const dx = -direction.x;
    const dy = -direction.y;
    particles.createEmitter({
      quantity: 10,
      speedY: { min: 20 * dy, max: 50 * dx },
      speedX: { min: -10 * dx, max: 10 * dx },
      accelerationY: 1000 * dy,
      accelerationx: 1000 * dx,
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
    particles.setDepth(0)
  }

  update(time) {
    //if freefire is true, fire at ship
    if (this.freefire) {
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.ship)
    }
    if (time > this.shotdelay) {
      let bullet = this.scene.alienbullets.get(0, 0, 'alien_bullet')
      bullet.fire(this)
      this.shotdelay = time + (1000);
    }
  }
}
