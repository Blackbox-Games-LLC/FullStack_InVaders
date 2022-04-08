import Phaser from "phaser";
import Alien from "./alien";
import HealthBar from "../UI/HealthBar";
import Bullet from "./bullets";

export default class OrbitingMotherShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'mothership');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    

    this.health = 1000;
    this.spawnDelay = 0
    this.hp = new HealthBar(this.scene, this.x - 200, this.y + 100, this.health, 400, 25)
    scene.physics.add.existing(this.hp);
    scene.physics.add.existing(this.hp.bar);
    // this.hp.bar.scene.physics.setOffset(-200, -200)

    let mothershipAngle = 0;

    this.setSize(400, 550);
    this.setCollideWorldBounds(false, true);
    this.setDepth(2)
    this.setImmovable(true);

    //sounds
    const mblowup = scene.sound.add('motherboom', { volume: 0.8 })

    //player bullet damage
    scene.physics.add.overlap(this, scene.playerbullets, () => {
      if (this.health > 0) {
        this.health -= 10;
        this.hp.decrease(this.health)
      } else {
        mblowup.play()
        this.hp.delete()
        this.body.destroy()
        this.play("blowup")
        this.once("animationcomplete", () => {
          this.destroy();
          this.hp.setVisible(false)
        })
      }
    });

    //player collision damage
    scene.physics.add.overlap(this, scene.ship, () => {
      scene.ship.health -= 1
      scene.ship.hp.decrease(scene.ship.health)

    })

    scene.physics.add.overlap(this, scene.motherCore, () => {
      this.setPosition(x, y);
      mothershipAngle = Phaser.Math.Angle.Wrap(mothershipAngle - 0.001)
      Phaser.Math.RotateAroundDistance(this, scene.core.x, scene.core.y, mothershipAngle, 2000)
    })

    
    //animation
    this.anims.create({
      key: "blowup",
      frameRate: 35,
      frames: this.anims.generateFrameNumbers("mExplode", { start: 0, end: 47 })
    })


    scene.aliens = scene.physics.add.group({
      classType: Alien,
      scene: scene,
      runChildUpdate: true,
      immovable: true,
    })

    //alienbullets group

    scene.alienbullets = scene.physics.add.group({
      classType: Bullet,
      runChildUpdate: true
    })

    console.log(this.hp.bar.getData())

  }
  spawnAliens() {
    let b = this.getCenter();
    let alien = this.scene.aliens.get((b.x) + Phaser.Math.Between(-100, 100), (b.y) + Phaser.Math.Between(-100, 100), 'alien')
    this.scene.physics.moveToObject(alien, this.scene.planet, 20, 10000)
    return alien
  }
  update(time) {
    this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.core)
    if (time > this.spawnDelay) {
      this.spawnAliens();
      let num = this.scene.motherships.getLength()
      this.spawnDelay = time + (num * 800);
    }

    this.hp.scene.physics.moveToObject(this.hp, this, 110)
    
  }
}


