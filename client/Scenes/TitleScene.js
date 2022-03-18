import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title_Scene')
  }
  preload() {
    this.load.image('background', 'assets/title.png') // insert background image for start scene at some point
  }

  create() {
    var bg = this.add.sprite(0, 0, 'background')
    bg.setOrigin(0, 0)
    var text = this.add.text(100, 100, 'FULLSTACK INVADERS')
    text.setInteractive({ userHandCursor: true })
    text.on('pointerdown', () => this.clickButton())
  }

  clickButton() {
    this.scene.switch('Test_level')
  }
}
