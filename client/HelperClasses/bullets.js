import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key) {
    super(scene, 0, 0, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.motherships, () => {
      this.destroy();
    })
    scene.physics.add.collider(this, scene.aliens, () => {
      this.destroy();
    })
    scene.physics.add.collider(this, scene.ship, () => {
      this.destroy();
    })
    scene.physics.add.collider(this, scene.ship, () => {
      this.destroy();
    })
    scene.physics.add.collider(this, scene.planet, () => {
      this.destroy();
    })


    this.setCircle(8, 15);
    this.setBlendMode(5);
    this.setDepth(1);
    this.speed = 1000;
    this.lifespan = 3000;
    this._temp = new Phaser.Math.Vector2();
  }

  fire(ship) {
    this.lifespan = 3000;

    this.setAngle(ship.body.rotation);
    this.setPosition(ship.x, ship.y);
    this.body.reset(ship.x, ship.y);

    var angle = Phaser.Math.DegToRad(ship.body.rotation);

    this.scene.physics.velocityFromRotation(
      angle,
      this.speed,
      this.body.velocity
    );

    this.body.velocity.x *= 2;
    this.body.velocity.y *= 2;
  }

  update(time, delta) {
    this.lifespan -= delta;
    if (this.lifespan <= 0 || this.speed == 0) {
      this.destroy();
    }
  }
}
