import Phaser from 'phaser'

export default class gameOver extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey) {
    super(scene, x, y, spritekey)
    this.scene = scene
    scene.add.existing(this)
    scene.physics.add.existing(this)

    let gameCondition = scene.add.rectangle(2000, 1500, 10000, 10000, 0x00000)
    gameCondition.alpha = 0.9
    gameCondition.setDepth(3)
  }
}
