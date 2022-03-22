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
    this.load.image("alien_bullet", "assets/alien-laser.png")
    this.load.image("exhaust", "assets/exhaust.png");
    this.load.image("alien_exhaust", "assets/alien_exhaust.png");
    this.load.image("mothership", "assets/mothership.png");
    this.load.image("alien", "assets/alien-invader.png")
    this.load.image("galaxy", "assets/galaxy-min.png")
    this.load.multiatlas("space", 'assets/space-sprite-sheet.json', 'assets');
  }
  create() {
    this.bg = this.add
      .tileSprite(400, 300, 8000, 6000, "background")
      .setScrollFactor(0);
    this.lastFired = 0;
    this.angle1 = 0;
    this.galaxyAngle = 0;
    this.galaxyDistance = 0;
    this.distance1 = 750;

    this.galaxy = this.add.sprite(4000, 1200, "galaxy")
    this.planet = new Planet(this, 2000, 1500, "planet")

    this.offbase = new Base(this, 2625, 1500, "offense-base")
    this.defbase = new Base(this, 2000, 900, "defense-base")
    this.offbase.setAngle(90)

    this.defense = new Defense(this, 1280, 720, "defense");
    this.offense = new Offense(this, 2000, 1500, "offense");


    this.cursors = this.input.keyboard.createCursorKeys();
    this.fire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.ship = new Ship(this, 1200, 1200);

    this.motherships = this.physics.add.group({
      classType: MotherShip,
      scene: this,
      maxSize: 4,
      immovable: true,
      runChildUpdate: true,
    });
    this.motherships.get()
    this.motherships.get(4000, 0)
    this.motherships.get(0, 3000)
    this.motherships.get(4000, 3000)
    //camera

    //this.cameras.main.startFollow(this.ship)
    this.cameras.main.setZoom(0.29, 0.29);
  }

  update(time) {
    //vars
    this.defense.setPosition(640, 380);
    this.bg.tilePositionX += this.ship.body.deltaX() * 0.5;
    this.bg.tilePositionY += this.ship.body.deltaY() * 0.5;
    this.ship.body.velocity.x = 0;
    this.ship.body.velocity.y = 0;
    this.angle1 = Phaser.Math.Angle.Wrap(this.angle1 + 0.005);


    //satellite base spawner. still kinda buggy. need to play with some numbers?
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
      let bullet = this.playerbullets.get(0, 0, 'laser_bullet');

      if (bullet) {
        bullet.fire(this.ship);
        //this.bullet.setCollideWorldBounds(true)
        this.lastFired = time + 100;
      }
    }
  }
}
