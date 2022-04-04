import Phaser from "phaser";
import Ship from "../HelperClasses/ship";
import MotherShip from "../HelperClasses/mothership";
import Planet from "../HelperClasses/planet";
import CountdownController from "../UI/CountdownController";
import AttackBase from "../HelperClasses/attackBase";
import DefenseBase from "../HelperClasses/defenseBase";
 
import ColliderHelper from "../HelperClasses/ColliderHelper";
import Music from "../HelperClasses/MusicHandler";
import HealthPickup from "../HelperClasses/healthPickup";

import PowerUp from "../HelperClasses/powerup";



export default class Jupiter extends Phaser.Scene {
  /** @type {CountdownController} */
  countdown;

  constructor() {
    super("Jupiter");
  }

  preload() {
    this.load.image("background", "assets/starry-background.jpeg");
    this.load.image("planet", "assets/jupiter.png");
    this.load.image("boomplanet", "assets/destroyedEarth.png");
    this.load.image("defense-base", "assets/defense-base.png");
    this.load.image("offense-base", "assets/offense-base.png");
    this.load.image("ship", "assets/spaceship-sprite.png");
    this.load.image("defense", "assets/space-wall-defense.png");
    this.load.image("offense", "assets/space-wall-offense.png");
    this.load.spritesheet("satellite-explosion", "assets/satellite-explosion", { frameWidth: 75, frameHeighth: 65 });
    this.load.image("laser_bullet", "assets/medium_laser_bullets.png");
    this.load.image("alien_bullet", "assets/alien-laser.png");
    this.load.image("offense-bullet", "assets/offense-bullets.png");
    this.load.image("offense-exhaust", "assets/offense-satellite-exhaust.png");
    this.load.image("exhaust", "assets/exhaust.png");
    this.load.image("alien_exhaust", "assets/alien_exhaust.png");
    this.load.image("mothership", "assets/mothership.png");
    this.load.spritesheet("mExplode", "assets/mExplode.png", {
      frameWidth: 482,
      frameHeight: 482,
    });
    this.load.image("galaxy", "assets/galaxy-min.png");
    this.load.image("sun", "assets/sun.png");
    this.load.image("io", "assets/io.png");
    this.load.image("europa", "assets/europa.png");
    this.load.image("ganymede", "assets/ganymede.png");
    this.load.image("callisto", "assets/callisto.png");
    this.load.spritesheet("alien", "assets/alien-invader.png", {
      frameWidth: 75,
      frameHeight: 65,
    });
    this.load.image("galaxy", "assets/galaxy-min.png");
    this.load.image("command", "assets/spacebase.png");
    this.load.image("health_pickup", "assets/energy_health.png");
    this.load.image("powerup", "assets/powerup.png");
    this.load.audio("alien-blowup", "assets/alien-blowup.mp3");
    this.load.audio("playerShot", "assets/playerbullet.mp3");
    this.load.audio("alienShot", "assets/alienshot.mp3");
    this.load.audio("pickup", "assets/pickup.mp3");
    this.load.audio("motherboom", "assets/motherboom.mp3");
    this.load.audio("bg", "assets/bg.mp3");
  }

  create() {
    this.Music = this.sys.game.globals.music
    if (this.Music.musicOn === true && this.Music.bgMusicPlaying === false) {
      this.bg = this.sound.add('bg', { volume: 0.5 })
      this.bg.play({
        loop: true
      })
      this.Music.bgMusicPlaying = true;
    }

    this.lastFired = 0;
    this.angle1 = 0;
    this.galaxyAngle = 0;
    this.galaxyDistance = 0;
    this.distance1 = 750;
    this.distance3 = 1000;
    this.angle3 = 0;
    this.physics.world.setBounds(-1500, -1500, 8000, 6000)
    this.aliensDestroyed = 0
  

    this.sun = this.add.sprite(5500, 1450, "sun").setDisplaySize(2000, 2000).setDepth(1);
    this.io = this.add.sprite(3000, 1500, "io").setDisplaySize(150, 150).setDepth(1);
    this.europa = this.add.sprite(1500, 200, "europa").setDisplaySize(150, 150).setDepth(1);
    this.ganymede = this.add.sprite(-500, 2000, "ganymede").setDisplaySize(250, 250).setDepth(1);
    this.callisto = this.add.sprite(-2000, 1500, "callisto").setDisplaySize(50, 50).setDepth(1);
    this.bg = this.add
      .tileSprite(1024, 1024, 16392, 12288, "background")
      .setScrollFactor(0.8);
    this.galaxy = this.add
      .sprite(1200, 1500, "galaxy")
      .setDisplaySize(3000, 3000);
    // galaxy spin
    this.tweens.add({
      targets: this.galaxy,
      angle: -360,
      duration: 500000,
      ease: "Linear",
      loop: 10,
    });
    
    // Create core for orbiting defense satellites
    this.core = this.physics.add.sprite(2000, 1500, "defense");
    this.core.setDepth(-1).setCircle(750, -700, -700);

    // Set plant and its health
    this.planet = new Planet(this, 2000, 1500, "planet").setDisplaySize(1500, 1500).setDepth(1);
    this.planet.health = 25000;
    this.add.image(this.planet.x, this.planet.y, "boomplanet").setDepth(0);

    //The base starts as invisible but renders after 100000 seconds
    this.command = this.physics.add
      .sprite(2000, 1500, "command")
      .setDepth(2)
      .setVisible(false);

    //spawn ship
    this.ship = new Ship(this, 1200, 1200);
    this.ship.health = 1500


    //spawn attackBases
    this.attackBases = this.physics.add.group({
      classType: AttackBase,
      scene: this,
      immovable: true,
      runChildUpdate: true,
    });
    this.attackBases.get(2000, 2200).setAngle(180);
    this.attackBases.get(2000, 800).setAngle(0);
    this.attackBases.get(2550, 1100).setAngle(60);
    this.attackBases.get(1450, 1850).setAngle(240)

    //spawn defenseBases
    this.defenseBases = this.physics.add.group({
      classType: DefenseBase,
      scene: this,
      maxSize: 2,
      immovable: true,
      runChildUpdate: true,
    });
    this.defenseBases.get(2550, 1850).setAngle(120);
    this.defenseBases.get(1500, 1100).setAngle(300);

    //spawn mothership
    this.motherships = this.physics.add.group({
      classType: MotherShip,
      scene: this,
      maxSize: 6,
      immovable: true,
      runChildUpdate: true,
    });
    this.mothership1 = this.motherships.get(-1000, -1000);
    this.mothership2 = this.motherships.get(2000, -1000);
    this.mothership3 = this.motherships.get(5000, -1000);
    this.mothership4 = this.motherships.get(-1000, 3500);
    this.mothership5 = this.motherships.get(2000, 3500);
    this.mothership6 = this.motherships.get(5000, 3500);

    //player ship controls
    this.cursors = this.input.keyboard.addKeys({
      forward: Phaser.Input.Keyboard.KeyCodes.W,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      backward: Phaser.Input.Keyboard.KeyCodes.S
    });
    this.fire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //camera

    this.cameras.main.startFollow(this.ship, false, 1, 1, 0, -750).setZoom(0.75, 0.75)


    // countDownController
    const timerLabel = this.add
      .text(2300, -400, "CountDown", {
        fontSize: 150,
        fontStyle: "bold",
        color: "#00FF00",
      })
      .setScrollFactor(0, 0)
      .setDepth(2)

    this.countdown = new CountdownController(this, timerLabel);
    this.countdown.start(this.handleCountDownFinished.bind(this));


    //keep at end
    this.ColliderHelper = new ColliderHelper(this);
  }

  handleCountDownFinished() {
    this.countdowndone = true
  }

  hDelay = 0
  spawnHealth(time, delay) {
    //health lifespan is 5000
    if (time > this.hDelay) {
      new HealthPickup(this, Phaser.Math.Between(300, 3700), Phaser.Math.Between(300, 2800))
      this.hDelay = time + delay
    }


  }

  powerUpDelay = 0
  spawnPower(time, delay){
    if(time > this.powerUpDelay){
      new PowerUp(this, Phaser.Math.Between(300, 3700), Phaser.Math.Between(300, 2800))
      this.powerUpDelay = time + delay
    }
  }

  removePowerDelay = 0
  removePower(time, delay){
    if(time > this.removePowerDelay){
      this.ship.invulnerable = false
      this.removePowerDelay = time + delay
    }
  }

  update(time) {
    this.angle3 = Phaser.Math.Angle.Wrap(this.angle3 + 0.01);

    this.motherShipsDestroyed = 6 - this.motherships.getLength();

    this.spawnHealth(time, 6000);

    //win condition
    if (this.gameWon === true || this.motherships.getLength() === 0) {
      this.aliensScore = this.aliensDestroyed
      this.motherShipScore = this.motherShipsDestroyed
      this.command.setVisible(true);
      this.scene.start("End_Screen", { 
        condition: true,
        aliensScore: this.aliensDestroyed,
        motherShipScore: this.motherShipsDestroyed
      });
    }

    //loss condition
    if (this.planet.health <= 0 || this.ship.health <= 0) {
      this.aliensScore = this.aliensDestroyed
      this.motherShipScore = this.motherShipsDestroyed;
      this.planet.setVisible(false);
      this.scene.start("End_Screen", { 
        condition: false, 
        aliensScore: this.aliensDestroyed,
        motherShipScore: this.motherShipsDestroyed
       });
    }

    //ship movement
    if (this.cursors.left.isDown) {
      this.ship.setAngularVelocity(-150);
    } else if (this.cursors.right.isDown) {
      this.ship.setAngularVelocity(150);
    } else {
      this.ship.setAngularVelocity(0);
    }
    if (this.cursors.forward.isDown) {
      this.physics.velocityFromRotation(
        this.ship.rotation,
        50000,
        this.ship.body.acceleration
      );
    } else if (this.cursors.backward.isDown) {
      this.physics.velocityFromRotation(
        this.ship.rotation,
        -50000,
        this.ship.body.acceleration
      );
    } else {
      this.ship.setAcceleration(0);
    }

    this.ship.body.velocity.x = 0;
    this.ship.body.velocity.y = 0;

    //ship bullets
    if (this.fire.isDown && time > this.lastFired) {
      let bullet = this.playerbullets.get(0, 0, "laser_bullet");
      if (bullet) {
        this.ship.shoot.play();
        bullet.fire(this.ship);
        this.lastFired = time + 100;
      }
    }

    this.bg.tilePositionX += this.ship.body.deltaX() * 0.5;
    this.bg.tilePositionY += this.ship.body.deltaY() * 0.5;

    //counter
    this.countdown.update();
  }
}
