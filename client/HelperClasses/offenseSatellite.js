import Phaser from "phaser";
import BaseOffenseAI from "./AI";
import Alien from "./alien";
import MotherShip from "./mothership";

export default class Offense extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spritekey, alien, mothership) {
    super(scene, x, y, spritekey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, scene.bullets, () => {
      if (this.health > 0) {
        this.health -= 10;
      } else {
        this.destroy();
      }
    });
    this.alien = Alien;
    this.mothership = MotherShip;
    this.offense = this

    this.setCircle();
    this.setCollideWorldBounds(true);
    this.setImmovable(true);

    this.health = 50;
  }

  seekAndDestroy() {
    new BaseOffenseAI(scene, x, y, offense, alien, mothership)
  }


  // seek() {
  //   //  Pick a random target point
  //   var entry = Phaser.Utils.Array.GetRandom(this.scene.points);

  //   this.target = entry;

  //   this.isSeeking = false;

  //   this.scene.tweens.add({
  //     targets: this.body.velocity,
  //     x: 0,
  //     y: 0,
  //     ease: "Linear",
  //     duration: 500,
  //     onComplete: function (tween, targets, alien) {
  //       ship.isSeeking = true;
  //       ship.scene.tweens.add({
  //         targets: alien,
  //         speed: 150,
  //         delay: 500,
  //         ease: "Sine.easeOut",
  //         duration: 1000,
  //       });
  //     },
  //     onCompleteParams: [this],
  //   });
  // }
}