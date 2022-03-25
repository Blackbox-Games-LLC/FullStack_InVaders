import Phaser from "phaser";

export default class HealthBar extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, health, width, height) {
    super(scene, x, y, health, width, height)
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.setDepth(2)


    this.x = x;
    this.y = y;
    this.value = health;
    this.size = {
      width,
      height,
    };

    this.pixelPerHealth = this.size.width / this.value;

    scene.add.existing(this.bar);
    this.draw(x, y);
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

  draw(x, y) {
    this.bar.clear();
    const { width, height } = this.size;

    const margin = 2;

    this.bar.fillStyle(0x0000ff);
    this.bar.fillRect(x, y, width + margin, height + margin);

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

    const healthWidth = Math.floor(this.value * this.pixelPerHealth);

    this.bar.fillStyle(0x00a200);
    this.bar.fillRect(
      x + margin,
      y + margin,
      healthWidth - margin,
      height - margin
    );
  }
}
