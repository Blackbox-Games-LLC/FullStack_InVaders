import Phaser from "phaser";
import Alien from "./alien";
import HealthBar from "../UI/HealthBar";

export default class MotherShip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'mothership');
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.health = 1000;
    this.spawnDelay = 0
    this.hp = new HealthBar(this.scene, this.x, this.y, this.health, 300, 40)

    this.setSize(400, 550);
    this.setCollideWorldBounds(true);
    this.setDepth(2)
    this.setImmovable(true);

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
      console.log(this.health)
    });

    //player collision damage
    scene.physics.add.overlap(this, scene.ship, () => {
      scene.ship.health -= 1
      scene.ship.hp.decrease(scene.ship.health)
      console.log(scene.ship.health)
    })

    //sounds
    const mblowup = scene.sound.add('motherboom', { volume: 0.8 })

    //animation
    this.anims.create({
      key: "blowup",
      frameRate: 35,
      frames: this.anims.generateFrameNumbers("mExplode", { start: 0, end: 47 })
    })

    if (!scene.aliens) {
      scene.aliens = scene.physics.add.group({
        classType: Alien,
        scene: scene,
        runChildUpdate: true,
        immovable: true,
        maxSize: 200
      })
    }
  }
  spawnAliens() {
    let b = this.getCenter();
    let alien = this.scene.aliens.get((b.x) + Phaser.Math.Between(-100, 100), (b.y) + Phaser.Math.Between(-100, 100), 'alien')
    this.scene.physics.moveToObject(alien, this.scene.planet, 20, 10000)
    console.log("Spawn:", alien)
    return alien
  }
  update(time) {
    this.rotation = Phaser.Math.Angle.BetweenPoints(this, this.scene.planet)
    if (time > this.spawnDelay) {
      this.spawnAliens();
      let num = this.scene.motherships.getLength()
      this.spawnDelay = time + (num * 3000);
    }
  }
}


