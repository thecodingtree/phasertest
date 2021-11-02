import Phaser from 'phaser';

import TitleScreen from './scenes/TitleScreen';
import Game from './scenes/Game';

import { createStore, compose } from 'redux';

import { default as boyReducer } from './redux/reducers/boy';


const composeEnhancers = (process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const enhancers = composeEnhancers();

export const store = createStore(boyReducer, enhancers);

const config = {
  width: 1600,
  height: 768,
  type: Phaser.AUTO,
  physics: {
    default: "matter",
    matter: {
        debug: true
    }
}
}

const game = new Phaser.Game(config);

game.scene.add('titlescreen', TitleScreen);
game.scene.add('game', Game);

//game.scene.start('titlescreen');
game.scene.start('game');