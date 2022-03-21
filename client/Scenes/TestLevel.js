import Phaser from "phaser";
import Bullet from "../HelperClasses/bullets";
import Ship from "../HelperClasses/ship";
import MotherShip from "../HelperClasses/mothership";
import Planet from "../HelperClasses/planet"
import Defense from "../HelperClasses/defenseSatellite";
import Offense from "../HelperClasses/offenseSatellite";
import Base from "../HelperClasses/bases"

export default class Test extends Phaser.Scene {
  constructor() {
    super("Test_Level");
  }
  preload() {
    this.load.image("background", "assets/backgroundtile-min.png");
    this.load.image("planet", "assets/earth-transparent-min.png");
    this.load.image("defense-base", "assets/defense-base.png");
    this.load.image("offense-base", "assets/offense-base.png");
    this.load.image("ship", "assets/spaceship-sprite.png");
    this.load.image("defense", "assets/space-wall-defense.png");
    this.load.image("offense", "assets/space-wall-offense.png")
    this.load.image("laser_bullet", "assets/medium_laser_bullets.png");
    this.load.image("exhaust", "assets/exhaust.png");
    this.load.image("alien", "assets/alien.png");
    this.load.image("mothership", "assets/mothership.png");
    this.load.image("galaxy", "assets/galaxy-min.png")
    this.load.multiatlas("space", 'assets/space-sprite-sheet.json', 'assets');
  }
  create() {
    this.bg = this.add
      .tileSprite(400, 300, 8000, 6000, "background")
      .setScrollFactor(0);

    this.lastFired = 0;
    this.spawnDelay = 0;
    this.angle1 = 0;
    this.galaxyAngle = 0;
    this.galaxyDistance = 0;
    this.distance1 = 750;


    this.planet = new Planet(this, 2000, 1500, "planet")
    this.galaxy = this.physics.add.sprite(4000, 1200, "galaxy")

      this.offbase = new Base(this, 1900, 875, "offense-base")
      this.defbase = new Base(this, 2000, 900, "defense-base")



    this.defense = new Defense(this, 1280, 720, "defense");
    this.offense = new Offense(this, 2000, 1500, "offense");

    this.bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true,
    });

    this.mothership = new MotherShip(this, 0, 0, "mothership");

    const particles = this.add.particles("exhaust");
    this.ship = new Ship(this, 1200, 1200);

    const direction = new Phaser.Math.Vector2(1, 0);
    direction.setToPolar(this.ship.rotation, 1);
    const dx = -direction.x;
    const dy = -direction.y;
    particles.createEmitter({
      quantity: 50,
      speedY: { min: 20 * dy, max: 50 * dx },
      speedX: { min: -10 * dx, max: 10 * dx },
      accelerationY: 1000 * dy,
      accelerationx: 1000 * dx,
      lifespan: { min: 100, max: 1000 },
      alpha: { start: 0.5, end: 0, ease: "Sine.easeIn" },
      rotate: { min: -180, max: 180 },
      angle: { min: 30, max: 110 },
      blendMode: "ADD",
      frequency: 100,
      scale: { start: 0.07, end: 0.07 },
      follow: this.ship,
      followOffset: { y: this.ship.height * 0.5 },
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.fire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );



    this.cameras.main.startFollow(this.ship)
    this.cameras.main.setZoom(0.6, 0.6);
  }

  update(time) {
    //vars
    this.defense.setPosition(640, 380);
    this.bg.tilePositionX += this.ship.body.deltaX() * 0.5;
    this.bg.tilePositionY += this.ship.body.deltaY() * 0.5;
    this.ship.body.velocity.x = 0;
    this.ship.body.velocity.y = 0;
    this.angle1 = Phaser.Math.Angle.Wrap(this.angle1 + 0.005);

    //mothership spawner
    if (this.mothership && time > this.spawnDelay) {
      this.mothership.spawnAliens();
      this.spawnDelay = time + 2000;
    }

    //satellite base spawner
    if (this.defbase && time > this.spawnDelay) {
          this.defbase.spawnSatellites()
          this.spawnDelay = time + 10000
    }

    //satellite rotation
    Phaser.Math.RotateAroundDistance(
      this.defense,
      this.planet.x,
      this.planet.y,
      this.angle1,
      this.distance1
    );

    //ship movement
    if (this.cursors.left.isDown) {
      this.ship.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.ship.setAngularVelocity(150);
    } else {
      this.ship.setAngularVelocity(0);
    }
    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.ship.rotation,
        50000,
        this.ship.body.acceleration
      );
    } else {
      this.ship.setAcceleration(0);
    }


    this.bg.tilePositionX += this.ship.body.deltaX() * 0.5;
    this.bg.tilePositionY += this.ship.body.deltaY() * 0.5;


    //ship bullets
    if (this.fire.isDown && time > this.lastFired) {
      this.bullet = this.bullets.get();

      if (this.bullet) {
        this.bullet.fire(this.ship);
        // this.bullet.setCollideWorldBounds(true)
        this.lastFired = time + 100;
      }
    }
  }
}
