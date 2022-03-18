import Phaser from 'phaser'
import Bullet from '../HelperClasses/bullets'

export default class Test extends Phaser.Scene {
    constructor() {
        super('Test_Level')
    }
    preload() {
        this.load.image('background', 'assets/backgroundtile.png');
        this.load.image('planet', 'assets/earth-transparent-min.png');
        this.load.image('ship', 'assets/spaceship-sprite(1).png');
        this.load.image('satellite', 'assets/space-wall-defense.png')
        this.load.image('laser_bullet', 'assets/medium_laser_bullets.png')
        this.load.image('space', 'assets/', 'assets/space.json')
    }
    create() {
        this.bg = this.add.tileSprite(400, 300, 8000, 6000, 'background').setScrollFactor(0);

        this.lastFired = 0
        this.angle1 = 0
        this.distance1 = 750
        
        this.planet = this.physics.add.sprite(2000, 1500, 'planet');

        this.satellite = this.physics.add.sprite(1280, 720, 'satellite')

        // this.satellite = this.physics.add.group({
        //     key: 'satellite',
        //     repeat: 10,
        //     setXY: {x: 1280, y: 720, stepX: 10, stepY: 10}
        // })

        this.ship = this.physics.add.sprite(1280, 1500, 'ship').setDepth(1);
        this.ship.setDrag(300);
        this.ship.setAngularDrag(400);
        this.ship.setMaxVelocity(600);

        // this.camera = scene.camera.main
        this.cameras.main.startFollow(this.ship)

        this.bullet = new Bullet(this, 'laser_bullet')

        this.bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 30,
            runChildUpdate: true
        });

        // var particles = this.add.particles();

        // var emitter = particles.createEmitter({
        //     frame: 'blue',
        //     speed: 100,
        //     lifespan: {
        //         onEmit: function (particle, key, t, value)
        //         {
        //             return Phaser.Math.Percent(ship.body.speed, 1, 300) * 2000;
        //         }
        //     },
        //     alpha: {
        //         onEmit: function (particle, key, t, value)
        //         {
        //             return Phaser.Math.Percent(ship.body.speed, 1, 300);
        //         }
        //     },
        //     angle: {
        //         onEmit: function (particle, key, t, value)
        //         {
        //             var v = Phaser.Math.Between(-10, 10);
        //             return (ship.angle - 180) + v;
        //         }
        //     },
        //     scale: { start: 0.6, end: 0 },
        //     blendMode: 'ADD'
        // });

        // emitter.startFollow(ship);

        // this.scene.cameras.main.startFollow(ship);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    update(time) {

        this.satellite.setPosition(640, 380);
        Phaser.Math.RotateAroundDistance(this.satellite, this.planet.x, this.planet.y, this.angle1, this.distance1);
        this.angle1 = Phaser.Math.Angle.Wrap(this.angle1 + 0.005);

        this.ship.body.velocity.x = 0;
        this.ship.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            this.ship.setAngularVelocity(-150);
        }
        else if (this.cursors.right.isDown) {
            this.ship.setAngularVelocity(150);
        }
        else {
            this.ship.setAngularVelocity(0)
        }
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.ship.rotation, 10000, this.ship.body.acceleration)
        } else {
            this.ship.setAcceleration(0)
        }

        if (this.fire.isDown && time > this.lastFired) {
            var bullet = this.bullets.get();

            if (bullet) {
                bullet.fire(this.ship);

                this.lastFired = time + 100;
            }
        }

        this.bg.tilePositionX += this.ship.body.deltaX() * 0.5;
        this.bg.tilePositionY += this.ship.body.deltaY() * 0.5;

    }
}
