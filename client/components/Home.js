import React from 'react'
import Phaser from 'phaser'
import Test from '../Scenes/TestLevel';
import TitleScene from '../Scenes/TitleScene'



var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 760,
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

game.scene.add('Title_Scene', TitleScene)
game.scene.add('Test_Level', Test)
// game.scene.start('Title_Scene')
game.scene.start('Test_Level')

const Home = () => {
    return (<div></div>)
}

export default Home
