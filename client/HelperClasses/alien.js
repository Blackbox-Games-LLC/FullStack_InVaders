import Phaser from 'phaser'

export default class Alien extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritekey) {
        super(scene, x, y, spritekey)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.physics.add.collider(this, scene.bullets, () => {
            if (this.health > 0) {
                scene.bullet.destroy()
                this.health -= 10
            } else {
                scene.bullet.destroy()
                this.destroy()
            }
        })

        this.setScale(0.09, 0.09)
        this.setCircle(250)
        this.setCollideWorldBounds(true)
        this.setImmovable(true)

        this.health = 10
    }
    seek() {
        //  Pick a random target point
        var entry = Phaser.Utils.Array.GetRandom(this.scene.points);

        this.target = entry;

        this.isSeeking = false;

        this.scene.tweens.add({
            targets: this.body.velocity,
            x: 0,
            y: 0,
            ease: 'Linear',
            duration: 500,
            onComplete: function (tween, targets, ship) {
                ship.isSeeking = true;
                ship.scene.tweens.add({
                    targets: ship,
                    speed: 150,
                    delay: 500,
                    ease: 'Sine.easeOut',
                    duration: 1000
                });
            },
            onCompleteParams: [this]
        });
    }
}