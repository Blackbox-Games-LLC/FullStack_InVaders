import Phaser from 'phaser'

export default class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene) {
        super(scene)
        Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'laser_bullet');

        this.speed = 1000;
        this.setBlendMode(5);
        this.setDepth(1);

        this.lifespan = 5000;

        this._temp = new Phaser.Math.Vector2();
    }

    fire(ship) {
        this.lifespan = 5000;

        this.setActive(true);
        this.setVisible(true);

        this.setAngle(ship.body.rotation);
        this.setPosition(ship.x, ship.y);
        this.body.reset(ship.x, ship.y);


        var angle = Phaser.Math.DegToRad(ship.body.rotation);

        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);

        this.body.velocity.x *= 2;
        this.body.velocity.y *= 2;
    }

    update(time, delta) {
        this.lifespan -= delta;

        if (this.lifespan <= 0) {
            this.setActive(false);
            this.setVisible(false);
            this.body.stop();
        }
    }
}
