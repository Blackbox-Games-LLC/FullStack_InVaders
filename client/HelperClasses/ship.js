import Phaser from "phaser";
import HealthBar from "../UI/HealthBar";
import Bullet from "./bullets";

export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ship");
    this.scene = scene
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDrag(300);
    this.setAngularDrag(100);
    this.setMaxVelocity(1000);
    this.setDepth(2);
    this.setCollideWorldBounds(true, true);
    this.setImmovable(true);

    //sounds
    const explode = scene.sound.add('motherboom', { volume: 0.6 })
    const blowup = scene.sound.add('alien-blowup', { volume: 0.4 })
    this.shoot = scene.sound.add('playerShot', { volume: 0.3 })

  

    //animations
    this.anims.create({
      key: "explode",
      frameRate: 25,
      frames: this.anims.generateFrameNumbers("mExplode", { start: 0, end: 47 }),
    })

    //ship stats
    this.health = 1000;
    this.invulnerable = false
    this.hp = new HealthBar(this.scene, 2475, 700, this.health, 150, 20)
    this.hp.followCamera()
    

    // damage from aliens blasters
    scene.physics.add.overlap(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.alienTarget = false;
        explode.play();
        this.body.stop();
        this.body.destroy();
        this.play("explode");
        this.once("animationcomplete", () => {
          this.destroy();
          particles.destroy();
        })
      }
    });

    //player bullets group
    scene.playerbullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
    });
    
  
    //gotta fix this and make aura appear logic based
    const aura = scene.add.sprite(2550, 675, "aura").setDepth(1).setDisplaySize(300,300)
    aura.setScrollFactor(0,0)
    aura.setVisible(false)


  

    //particles
    const particles = scene.add.particles("exhaust").setDepth(1);
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
