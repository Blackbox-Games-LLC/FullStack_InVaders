import Phaser from "phaser";
import Bullet from "./bullets";

export default class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);
    this.setSize(50, 50)
    this.setDepth(1)

    //stats
    this.playerTarget = true
    this.health = 50;
    this.shotdelay = 2000

    //sounds
    const blowup = scene.sound.add('alien-blowup', { volume: 0.4 })
    this.shoot = scene.sound.add('alienShot', { volume: 0.2 })

    //animations
    this.anims.create({
      key: "blowup",
      frameRate: 25,
      frames: this.anims.generateFrameNumbers("alien", { start: 2, end: 31 }),
    })

    // damage from aliens blasters
    scene.physics.add.overlap(this, scene.offensebullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.playerTarget = false
        blowup.play()
        this.body.stop()
        this.body.destroy()
        this.play("blowup")
        this.once("animationcomplete", () => {
          this.destroy();
          particles.destroy()
        })
      }
    });

    //alien bullet Damage
    scene.physics.add.overlap(this, scene.playerbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.playerTarget = false
        blowup.play()
        this.body.stop()
        this.body.destroy()
        this.play("blowup")
        this.once("animationcomplete", () => {
          this.destroy();
          particles.destroy()
        })
      }
    });

    //alien planet collision
    scene.physics.add.collider(this, scene.planet, () => {
      this.playerTarget = false
      blowup.play()
      this.body.stop()
      this.body.destroy()
      this.play("blowup")
      this.once("animationcomplete", () => {
        this.destroy();
        particles.destroy()
      })
    });

    //alien planet collision
    scene.physics.add.collider(this, scene.defenseSatellite, () => {
      blowup.play()
      this.body.stop()
      this.body.destroy()
      this.play("blowup")
      this.once("animationcomplete", () => {
        this.destroy();
        particles.destroy()
      })
    });

    //alien AI switch
    let angle1 = 0
    scene.physics.add.overlap(this, scene.zone, () => {
      if (this.health >= 30) {
        this.setPosition(x, y)
        this.playerTarget = false
        angle1 = Phaser.Math.Angle.Wrap(angle1 + 0.001)
        Phaser.Math.RotateAroundDistance(this, scene.planet.x, scene.planet.y, angle1, scene.planet.width)
      } else {
        this.scene.physics.moveToObject(this, this.scene.planet, 20, 10000)
      }
    })

    //particles
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
    particles.setDepth(0)
  }

  update(time) {

    //if freefire is true, fire at ship
    if (this.playerTarget) {
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.ship)
    } else {
      this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.planet)
    }

    //fireDelay
    if (time > this.shotdelay) {
      this.shoot.play()
      let bullet = this.scene.alienbullets.get(0, 0, 'alien_bullet')
      bullet.fire(this)
      this.shotdelay = time + Phaser.Math.Between(1000, 4000);
    }
  }
}
