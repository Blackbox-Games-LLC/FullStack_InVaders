export default class ColliderHelper {
    constructor(scene) {
        //alien kamakazi Damage
        scene.physics.add.overlap(scene.planet, scene.aliens, () => {
            scene.planet.health -= 200
        })

        //alien Bullet Damage
        scene.physics.add.overlap(scene.planet, scene.alienbullets, () => {
            if (scene.planet.health > 0) {
                scene.planet.health -= 10;
                scene.planet.hp.decrease(scene.planet.health)
            } else {
                scene.defenseBases.destroy(true)
                scene.attackBases.destroy(true)
                scene.planet.hp.delete()
                scene.planet.destroy();
            }
        });

        // ship damage from alien blaster
        const explode = scene.sound.add('motherboom', { volume: 0.6 })

        scene.physics.add.overlap(scene.ship, scene.alienbullets, () => {
            if (scene.ship.health > 0) {
                scene.ship.health -= 10;
                scene.ship.hp.decrease(scene.ship.health)
            } else {
                explode.play();
                scene.ship.body.destroy();
                scene.ship.play("explode");

            }
        });
    }
}