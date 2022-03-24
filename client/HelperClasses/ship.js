import Phaser from "phaser";
import HealthBar from "../UI/HealthBar";
import Bullet from "./bullets";

export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ship");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.shoot = scene.sound.add('playerShot', { volume: 0.3 })
    scene.physics.add.overlap(this, scene.motherships, () => {
      if (this.health > 0) {
        this.health -= 1;
      } else {
        console.log("destroy animation");
      }
    });

    this.setDrag(300);
    this.setAngularDrag(100);
    this.setMaxVelocity(1000);
    this.setDepth(1);
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.health = 1000;
    // this.hp = new HealthBar(this.scene, 50, 50, this.health);

    scene.playerbullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });

    const particles = scene.add.particles("exhaust");

    const direction = new Phaser.Math.Vector2(1, 0);
    direction.setToPolar(this.rotation, 1);
    const dx = -direction.x;
    const dy = -direction.y;
    particles.createEmitter({
      quantity: 50,
      speedY: { min: 20 * dy, max: 50 * dx },
      speedX: { min: -10 * dx, max: 10 * dx },
      accelerationY: 1000 * dy,
      accelerationx: 1000 * dx,
      lifespan: {
        onEmit: () => {
          return Phaser.Math.Percent(this.body.speed, 0, 300) * 1000;
        },
      },
      alpha: { start: 0.5, end: 0, ease: "Sine.easeIn" },
      rotate: { min: -180, max: 180 },
      angle: { min: 30, max: 110 },
      blendMode: "ADD",
      frequency: 100,
      scale: { start: 0.07, end: 0.07 },
      follow: this,
      followOffset: { y: this.height - 100 },
    });
  }
}
