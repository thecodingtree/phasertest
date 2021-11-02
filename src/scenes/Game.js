import Phaser from 'phaser';

import Boy from '../objects/Boy';

import { store } from '../main';

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

    this.load.image('tiles', 'assets/sheet.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/game.json');

  }

  create() {

    const { width, height } = this.scale;

    this.boy = new Boy({
      scene: this,
      x: width / 2,
      y: 700
    });

    const map = this.make.tilemap({
      key: 'tilemap'
    });

    const tileset = map.addTilesetImage('iceworld', 'tiles');

    const groundLayer = map.createLayer('ground', tileset, 0, 0);

    groundLayer.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(groundLayer);

    // FIX ME
    this.cameras.main.startFollow(this.boy);

  }

  update() {

    const { isRunningRight, isRunningLeft, isJumping, isSliding, isTouchingGround } = store.getState();

    if (isRunningRight) {
      this.boy.setVelocityX(5);
    }

    if (isRunningLeft) {
      this.boy.setVelocityX(-5);
    }

    if (isJumping && isTouchingGround) {
      this.boy.setVelocityY(-10);

      store.dispatch({ type: 'BOY/LEFT_GROUND' });
    }

    if (isSliding) {
      if (isRunningRight) {
        this.boy.setVelocityX(10);
      } else if (isRunningLeft) {
        this.boy.setVelocityX(-10);
      }
    }

  }

}