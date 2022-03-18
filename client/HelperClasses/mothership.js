import Phaser from 'phaser'
import Alien from './alien'

export default class MotherShip extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritekey) {
        super(scene, x, y, spritekey)
        this.scene = scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.physics.add.collider(this, scene.bullet, () => {
            if (this.health > 0) {
                scene.bullet.destroy()
                this.health -= 10
            } else {
                scene.bullet.destroy()
                this.destroy()
            }
            console.log(this.health)
        })

        this.setSize(400, 550)

        this.setCollideWorldBounds(true)
        this.setImmovable(true)

        this.health = 100000
    }
    spawnAliens() {
        let b = this.getBottomCenter()
        new Alien(this.scene, b.x + Phaser.Math.Between(-100, 100), b.y, 'alien')
        console.log(b)
    }
}