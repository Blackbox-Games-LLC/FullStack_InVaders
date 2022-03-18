import Phaser from 'phaser'
import HealthBar from '../UI/HealthBar'

export default class Ship extends Phaser.Physics.Arcade.Sprite{
  constructor(scene) {
    super(scene)

        // this.ship = this.physics.add.sprite(this, scene, 800, 600,'ship').setDepth(1);


        this.render = (scene, health) => {
          let ship = scene.physics.add.sprite(800, 600, `ship`).setDepth(1)
          ship.setDrag(300);
          ship.setAngularDrag(400);
          ship.setMaxVelocity(600);
          ship.setCollideWorldBounds(true)

          ship.health = 100;

          this.hp = new HealthBar(
            scene,
            0, 0,
            health
          )


          return ship
        }
  }
}

