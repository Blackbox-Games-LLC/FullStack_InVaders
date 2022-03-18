import Phaser from 'phaser'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title_Scene')
  }
  // preload() {
  //   this.load.image('background', 'assets/title.png')
  // }

  create() {
    var bg = this.add.sprite(0, 0, 'background')
    bg.setOrigin(0, 0)
    var text = this.add.text(500, 500, 'FULLSTACK INVADERS. CLICK HERE TO START')
    text.setInteractive({ userHandCursor: true })
    text.on('pointerdown', () => this.clickButton())
  }

  clickButton() {
    this.scene.switch('Test_Level')
  }
}
