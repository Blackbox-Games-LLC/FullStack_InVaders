import Phaser from "phaser";

export default class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'powerup');
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setDepth(4)
        this.setScale(0.15, 0.15)
        this.setCircle(250, 0, 5)



        const pickup = scene.sound.add('pickup', { volume: 0.10 })

        scene.physics.add.overlap(this, scene.ship, () => {
            pickup.play()
            this.destroy()
            scene.ship.invulnerable = true
            scene.ship.aura.setVisible(true)
        })
    }
}
