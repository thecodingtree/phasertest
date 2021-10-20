import Phaser from 'phaser';

import Boy from '../objects/Boy';

export default class Game extends Phaser.Scene
{

  constructor(config) {
    super(config);
  }

  preload() {
    this.load.atlas(
      'boy',
      'assets/boy.png',
      '../assets/boy.json'
    );

  }

  create() {

    const { width, height } = this.scale;

    this.boy = new Boy({
      scene: this,
      x: width / 2,
      y: height / 2
    });
  }

  update() {

  }

}