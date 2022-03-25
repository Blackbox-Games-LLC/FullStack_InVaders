import Phaser from "phaser";

export default class HealthBar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, health, width, height, color) {
    super(scene, x, y, health, width, height, color)
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setDepth(2)

    // this.color = color
    this.x = x;
    this.y = y;
    this.value = health;
    this.size = {
      width,
      height,
    };

    this.pixelPerHealth = this.size.width / this.value;

    scene.add.existing(this.bar);
    this.draw(x, y, color);
  }

  decrease(amount) {
    this.value = amount;
    this.draw(this.x, this.y);
  }

  delete() {
    this.bar.destroy()
  }

  followCamera() {
    this.bar.setScrollFactor(0,0)
  }

  draw(x, y, color) {
    this.bar.clear();
    const { width, height } = this.size;

    const margin = 2;

    // this.bar.fillStyle(0x00FF00);
    // this.bar.fillRect(x, y, width + margin, height + margin);

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth = Math.floor(this.value * this.pixelPerHealth);

    this.bar.fillStyle(0x00FF00);
    this.bar.fillRect(
      x + margin,
      y + margin,
      healthWidth - margin,
      height - margin
    );
  }
}
