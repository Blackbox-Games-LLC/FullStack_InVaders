import Phaser from "phaser";

export default class Planet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey);
    this.scene = scene;
    scene.add.existing(this)
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.alienbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
      }
    });

    //what happens when an alien kamakazes into earth
    scene.physics.add.overlap(this, scene.alien, () => {
      scene.planet.health -= 100
      console.log(this.health)
    })

    this.setCircle(1000, -390, -390);
    this.setCollideWorldBounds(true)
    this.setImmovable(true)
    this.health = 20000;


    var shape2 = new Phaser.Geom.Circle(0, 0, 800);
    var particles = scene.add.particles("exhaust");
    if (scene.gameWon === true) {
        particles.createEmitter({
        x: 2000, y: 1500,
        speed: 0,
        lifespan: 10000,
        quantity: 1,
        scale: { start: 0.1, end: 0 },
        blendMode: 'ADD',
        emitZone: { type: 'edge', source: shape2, quantity: 48, yoyo: false }
    });
    }

  }
}

