import Phaser from "phaser";
import Offense from "./offenseSatellite";
import Alien from "./alien";
import MotherShip from "./mothership";

export default class BaseOffenseAI extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, offense, alien, mothership) {
      super(scene, x, y, offense, alien, mothership);
      this.offense = Offense;
      this.alien = Alien;
      this.mothership = MotherShip;
    }

  pickPath() {
    const { x, y } = this.offense;
    const { x: tx, y: ty } = this.alien;

    const d = Phaser.Math.Distance.Between(x, y, tx, ty)

    if (d >= 10) {
      this.offense.moveToObject(this.alien, tx, ty)
    } else {
      this.offense.moveToObject(this.mothership, realInRange(20, 3000), realInRange(20, 3000))
    }
  }
}