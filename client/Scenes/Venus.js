import Phaser from "phaser";
import Ship from "../HelperClasses/ship";
import MotherShip from "../HelperClasses/mothership";
import Planet from "../HelperClasses/planet";
import CountdownController from "../UI/CountdownController";
import AttackBase from "../HelperClasses/attackBase";
import DefenseBase from "../HelperClasses/defenseBase";
 
import ColliderHelper from "../HelperClasses/ColliderHelper";
import Music from "../HelperClasses/MusicHandler";


export default class Venus extends Phaser.Scene {
  /** @type {CountdownController} */
  countdown;

  constructor() {
    super("Venus");
  }

  preload() {
    this.load.image("background", "assets/starry-background.jpeg");
    this.load.image("planet", "assets/venus.png");
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
    this.load.image("moon1", "assets/moon1.png");
    this.load.image("moon2", "assets/moon6.png");
    this.load.spritesheet("alien", "assets/alien-invader.png", {
      frameWidth: 75,
      frameHeight: 65,
    });
    this.load.image("galaxy", "assets/galaxy-min.png");
    this.load.image("command", "assets/spacebase.png");
    this.load.audio("alien-blowup", "assets/alien-blowup.mp3");
    this.load.audio("playerShot", "assets/playerbullet.mp3");
    this.load.audio("alienShot", "assets/alienshot.mp3");
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
    this.gameWon = false;
    this.physics.world.setBounds(-1500, -1500, 8000, 6000)
  

    this.sun = this.add.sprite(-500, 2000, "sun").setDepth(1).setDisplaySize(3000, 3000);
    this.moon1 = this.add.sprite(-200, 1500, "moon1").setDisplaySize(150, 150);
    this.moon2 = this.add.sprite(2500, 2500, "moon2").setDisplaySize(150, 150);
    this.bg = this.add
      .tileSprite(1024, 1024, 16392, 12288, "background")
      .setScrollFactor(0.8);
    this.galaxy = this.add
      .sprite(2000, 4000, "galaxy")
      .setDisplaySize(3000, 3000);
    // galaxy spin
    this.tweens.add({
      targets: this.galaxy,
      angle: -360,
      duration: 500000,
      ease: "Linear",
      loop: 10,
    });
    this.planet = new Planet(this, 2000, 1500, "planet").setDepth(1).setDisplaySize(1350,1350)
    this.add.image(this.planet.x, this.planet.y, "boomplanet").setDepth(0);
    this.core = this.physics.add.sprite(2000, 1500, "defense");
    this.core.setDepth(-1).setCircle(750, -700, -700);

    //The base starts as invisible but renders after 100000 seconds
    this.command = this.physics.add
      .sprite(2000, 1500, "command")
      .setDepth(2)
      .setVisible(false);

    //spawn ship
    this.ship = new Ship(this, 1200, 1200);


    //spawn attackBases
    this.attackBases = this.physics.add.group({
      classType: AttackBase,
      scene: this,
      immovable: true,
      runChildUpdate: true,
    });
    this.attackBases.get(2000, 2100).setAngle(-180);
    this.attackBases.get(2000, 900);

    //spawn defenseBases
    this.defenseBases = this.physics.add.group({
      classType: DefenseBase,
      scene: this,
      maxSize: 2,
      immovable: true,
      runChildUpdate: true,
    });
    this.defenseBases.get(1400, 1500).setAngle(-90);
    this.defenseBases.get(2625, 1500).setAngle(90);

    //spawn mothership
    this.motherships = this.physics.add.group({
      classType: MotherShip,
      scene: this,
      maxSize: 4,
      immovable: true,
      runChildUpdate: true,
    });
    this.mothership1 = this.motherships.get();
    this.mothership2 = this.motherships.get(4000, 0);
    this.mothership3 = this.motherships.get(0, 3000);
    this.mothership4 = this.motherships.get(4000, 3000);

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


    //This manages game time within the scene.
    this.timedEvent = this.time.delayedCall(300000, changeWin, [], this)
    function changeWin(){
      this.gameWon = true
    }

    //keep at end
    this.ColliderHelper = new ColliderHelper(this);
  }



  handleCountDownFinished() {
    //this.player.active=false
    //const {width,height}=this.scale
    //this.add.text(width*0.5,height*0.5,"you Lose!",{fontSize:48})
  }
  update(time) {
    this.angle3 = Phaser.Math.Angle.Wrap(this.angle3 + 0.01);

    //win condition
    if (this.gameWon === true || this.motherships.getLength() === 0) {
      // this.physics.pause()
      this.gameWon = true;
      this.command.setVisible(true);
      this.scene.start("End_Screen", { win: this.gameWon });
    }

    //loss condition
    if (this.planet.health <= 0 || this.ship.health <= 0) {
      // this.physics.pause()
      this.gameWon = false;
      this.planet.setVisible(false);
      this.scene.start("End_Screen", { loss: this.gameWon });
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
