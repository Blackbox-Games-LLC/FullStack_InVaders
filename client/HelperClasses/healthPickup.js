import Phaser from "phaser";

export default class HealthPickup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'health_pickup');
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDepth(4)
        this.setScale(0.15, 0.15)
        this.setCircle(250, 0, 5)

        const pickup = scene.sound.add('pickup', { volume: 0.8 })

        scene.physics.add.overlap(this, scene.ship, () => {
            if (scene.ship.health <= 950) {
                scene.ship.health += 50
                pickup.play()
                this.destroy()
            }
        })
    }
}