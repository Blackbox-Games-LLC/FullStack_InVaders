import React from 'react'
import Phaser from 'phaser'
import Test from '../Scenes/TestLevel';

var config = {
    type: Phaser.AUTO,
    width: 4000,
    height: 3000,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { scale: 0 }
        },
        // matter: {
        //     debug: true,
        //     gravity: { scale: 0 }
        // }
    },
};

const game = new Phaser.Game(config)

game.scene.add('Test_Level', Test)
game.scene.start('Test_Level')

const Home = () => {
    return (<div></div>)
}

export default Home
