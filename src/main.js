import Phaser from 'phaser';

import TitleScreen from './scenes/TitleScreen';
import Game from './scenes/Game';

import { createStore } from 'redux';

const initialState = {
  isRunningLeft: false,
  isRunningRight: false,
  isSliding: false,
  isJumping: false,
}

function boyReducer(state = initialState, action) {
  switch (action.type) {
    case 'BOY/RUNNING_RIGHT_START':
      return { ...state, isRunningRight: true };
    case 'BOY/RUNNING_RIGHT_STOP':
      return { ...state, isRunningRight: false };
    case 'BOY/RUNNING_LEFT_START':
      return { ...state, isRunningLeft: true };
    case 'BOY/RUNNING_LEFT_STOP':
      return { ...state, isRunningLeft: false };
    case 'BOY/JUMPING_START':
      return { ...state, isJumping: true };
    case 'BOY/JUMPING_STOP':
      return { ...state, isJumping: false };
      case 'BOY/SLIDING_START':
          return { ...state, isSliding: true };
        case 'BOY/SLIDING_STOP':
          return { ...state, isSliding: false };
    default:
      return state;
  }
}

export const store = createStore(boyReducer);

const config = {
  width: 1024,
  height: 768,
  type: Phaser.AUTO,
}

const game = new Phaser.Game(config);

game.scene.add('titlescreen', TitleScreen);
game.scene.add('game', Game);

//game.scene.start('titlescreen');
game.scene.start('game');