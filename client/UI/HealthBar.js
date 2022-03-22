import Phaser from "phaser";

export default class HealthBar {
  constructor(scene, x, y, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.bar.setScrollFactor(0, 0);
    this.x = x;
    this.y = y;
    this.value = health;

    this.size = {
      width: 200,
      height: 20,
    };

    this.pixelPerHealth = this.size.width / this.value;

    scene.add.existing(this.bar);
    this.draw(x, y);
  }

  decrease(amount) {
    this.value = amount;
    this.draw(this.x, this.y);
  }

  draw(x, y) {
    this.bar.clear();
    const { width, height } = this.size;

    const margin = 2;

    this.bar.fillStyle(0x00a200);
    this.bar.fillRect(x, y, width + margin, height + margin);

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth = Math.floor(this.value * this.pixelPerHealth);

    this.bar.fillStyle(0x0000ff);
    this.bar.fillRect(
      x + margin,
      y + margin,
      healthWidth - margin,
      height - margin
    );
  }
}
