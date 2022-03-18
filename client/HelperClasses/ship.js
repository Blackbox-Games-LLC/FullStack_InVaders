import Phaser from 'phaser'
import HealthBar from '../UI/HealthBar'

<<<<<<< HEAD
export default class Ship extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y) {
    super(scene, x, y, 'ship')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    // scene.physics.add.collider(this, scene.bullet, () => {
    //   if (this.health > 0) {
    //             scene.bullet.destroy()
    //             this.health -= 10
    //         } else {
    //             scene.bullet.destroy()
    //             this.destroy()
    //         }
    // })

    this.setDrag(300);
    this.setAngularDrag(400);
    this.setMaxVelocity(600);
    this.setDepth(1)

    this.setCollideWorldBounds(true)
      this.health = 100;
          this.hp = new HealthBar(
            this.scene,
            50, 50,
            this.health
    )
=======
export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene)

    // this.ship = this.physics.add.sprite(this, scene, 800, 600,'ship').setDepth(1);


    this.render = (scene) => {
      let ship = scene.physics.add.sprite(800, 600, `ship`).setDepth(1)
      ship.setDrag(300);
      ship.setAngularDrag(400);
      ship.setMaxVelocity(600);
      ship.setCollideWorldBounds(true)
      return ship
    }
>>>>>>> origin/main
  }
}


