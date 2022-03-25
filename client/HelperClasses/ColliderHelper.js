export default class ColliderHelper {
    constructor(scene) {
        //alien kamakazi Damage
        scene.physics.add.overlap(scene.planet, scene.aliens, () => {
            scene.planet.health -= 100
            console.log(scene.planet.health)
        })

        //alien Bullet Damage
        scene.physics.add.collider(scene.planet, scene.alienbullets, () => {
            if (scene.planet.health > 0) {
                scene.planet.health -= 10;
            } else {
                scene.planet.hp.delete()
                scene.planet.destroy();
            }
        });
    }
}