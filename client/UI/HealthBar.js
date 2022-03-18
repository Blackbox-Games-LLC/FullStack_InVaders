import Phaser from 'phaser'

export default class HealthBar {
  constructor(scene, x, y, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene)

    this.x = x
    this.y = y
    this.value = health

    this.size = {
      width: 40,
      height: 8
    }

    this.pixelPerHealth = this.size.width / this.value

    scene.add.existing(this.bar)
    this.draw(x,y)
  }

  draw(x, y) {
    this.bar.clear()
    const { width, height } = this.size

    this.bar.fillStyle(0x00A200)
    this.bar.fillRect(x, y, width, height)
  }
}
