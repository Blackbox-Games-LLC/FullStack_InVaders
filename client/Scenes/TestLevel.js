import Phaser from 'phaser'
import Bullet from '../HelperClasses/bullets'
import Ship from '../HelperClasses/ship'

export default class Test extends Phaser.Scene {
    constructor() {
        super('Test_Level')
    }
    preload() {
        this.load.image('background', 'assets/space-background-reduced.png');
        this.load.image('planet', 'assets/venus-transparent.png');
        this.load.image('ship', 'assets/spaceship-sprite(1).png');
        this.load.image('satellite', 'assets/satellite-transparent.png')
        this.load.image('laser_bullet', 'assets/medium_laser_bullets.png')
        this.load.image('space', 'assets/', 'assets/space.json')
     }
    create() {
        this.bg = this.add.image(640, 380, 'background');
        this.lastFired = 0
        this.angle1 = 0
        this.distance1 = 250
        this.planet = this.add.sprite(640, 380, 'planet');

        this.satellite = this.add.sprite(840, 380, 'satellite')
        this.ship = new Ship(this, 500, 500)
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


    this.cursors = this.input.keyboard.createCursorKeys();
    this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }


    update(time, delta) {
    this.satellite.setPosition(640, 380);
   Phaser.Math.RotateAroundDistance(this.satellite, this.planet.x, this.planet.y, this.angle1, this.distance1);
   this.angle1 = Phaser.Math.Angle.Wrap(this.angle1 + 0.02);

   this.ship.body.velocity.x = 0;
    this.ship.body.velocity.y = 0;



   if (this.cursors.left.isDown)
    {
        this.ship.setAngularVelocity(-150);
    }
    else if (this.cursors.right.isDown)
    {
        this.ship.setAngularVelocity(150);
    }
    else {
        this.ship.setAngularVelocity(0)
    }
    if (this.cursors.up.isDown)
    {
        this.physics.velocityFromRotation(this.ship.rotation, 10000, this.ship.body.acceleration)
    } else {
        this.ship.setAcceleration(0)
    }

    if (this.fire.isDown && time > this.lastFired)
    {
        this.bullet = this.bullets.get();

        if (this.bullet)
        {
            this.bullet.fire(this.ship);
            this.bullet.setCollideWorldBounds(true)
            this.lastFired = time + 100;
            this.bullet.update(time, delta) // this is logic for when bullet hits something
        }
    }
    }
}

//WHY IS GIT WORKFLOW SO ANNOYING REEEEE



