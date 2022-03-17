import Phaser from 'phaser'

export default class Test extends Phaser.Scene {
    constructor() {
        super('Test')
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
        bg = this.add.image(640, 380, 'background');
    
    planet = this.add.sprite(640, 380, 'planet');
    
    satellite = this.add.sprite(640, 380, 'satellite');

    ship = this.physics.add.sprite(800, 600,'ship').setDepth(1);
    ship.setDrag(300);
    ship.setAngularDrag(400);
    ship.setMaxVelocity(600);


    var Bullet = new Phaser.Class({

        Extends: Phaser.Physics.Arcade.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'laser_bullet');

            this.setBlendMode(5);
            this.setDepth(1);

            this.speed = 10000;
            this.lifespan = 5000;

            this._temp = new Phaser.Math.Vector2();
        },

        fire: function (ship)
        {
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
        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
                this.body.stop();
            }
        }

    });

    bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: 30,
        runChildUpdate: true
    });

    var particles = this.add.particles();

    var emitter = particles.createEmitter({
        frame: 'blue',
        speed: 100,
        lifespan: {
            onEmit: function (particle, key, t, value)
            {
                return Phaser.Math.Percent(ship.body.speed, 1, 300) * 2000;
            }
        },
        alpha: {
            onEmit: function (particle, key, t, value)
            {
                return Phaser.Math.Percent(ship.body.speed, 1, 300);
            }
        },
        angle: {
            onEmit: function (particle, key, t, value)
            {
                var v = Phaser.Math.Between(-10, 10);
                return (ship.angle - 180) + v;
            }
        },
        scale: { start: 0.6, end: 0 },
        blendMode: 'ADD'
    });

    emitter.startFollow(ship);


    cursors = this.input.keyboard.createCursorKeys();
    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() { 
        satellite.setPosition(640, 380);
   Phaser.Math.RotateAroundDistance(satellite, planet.x, planet.y, angle1, distance1);
   angle1 = Phaser.Math.Angle.Wrap(angle1 + 0.02);

   ship.body.velocity.x = 0;
   ship.body.velocity.y = 0;

   if (cursors.left.isDown)
    {
        ship.setAngularVelocity(-150);
    }
    else if (cursors.right.isDown)
    {
        ship.setAngularVelocity(150);
    }
    else {
        ship.setAngularVelocity(0)
    }
    if (cursors.up.isDown)
    {
        this.physics.velocityFromRotation(ship.rotation, 10000, ship.body.acceleration)
    } else {
        ship.setAcceleration(0)
    }

    if (fire.isDown && time > lastFired)
    {
        var bullet = bullets.get();

        if (bullet)
        {
            bullet.fire(ship);

            lastFired = time + 100;
        }
    }

    }
}