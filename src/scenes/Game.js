import Phaser from 'phaser';

import { store } from '../main';

export default class Game extends Phaser.Scene
{

  constructor(config) {
    super(config);

    this.handleStateChg = this.handleStateChg.bind(this);
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

    store.subscribe(this.handleStateChg);

    this.keysObj = {
      right: this.input.keyboard.addKey('right'),
      left: this.input.keyboard.addKey('left'),
      down: this.input.keyboard.addKey('down'),
      space: this.input.keyboard.addKey('space'),
    }

    this.keysObj.right.on('down', () => {
      store.dispatch({ type: 'BOY/RUNNING_RIGHT_START' })
    });

    this.keysObj.right.on('up', () => {
      store.dispatch({ type: 'BOY/RUNNING_RIGHT_STOP' })
    });

    this.keysObj.left.on('down', () => {
      store.dispatch({ type: 'BOY/RUNNING_LEFT_START' })
    });

    this.keysObj.left.on('up', () => {
      store.dispatch({ type: 'BOY/RUNNING_LEFT_STOP' })
    });

    this.keysObj.down.on('down', () => {
      store.dispatch({ type: 'BOY/SLIDING_START' })
    });

    this.keysObj.down.on('up', () => {
      store.dispatch({ type: 'BOY/SLIDING_STOP' })
    });

    this.keysObj.space.on('down', () => {
      store.dispatch({ type: 'BOY/JUMPING_START' })
    });

    this.keysObj.space.on('up', () => {
      store.dispatch({ type: 'BOY/JUMPING_STOP' })
    });

    this.createBoyAnimations();

    this.boy = this.add.sprite(width / 2, height / 2, 'boy').play('boy_idle');
  }

  update() {

    const { isRunningLeft, isJumping } = store.getState();
  }

  handleStateChg() {

    // DEBUG
    console.log(store.getState());

    const { isRunningLeft, isRunningRight, isJumping, isSliding } = store.getState();

    if (isRunningLeft) {
      this.boy.flipX = true;
      this.boy.play('boy_run');
    } else if (isRunningRight) {
      this.boy.flipX = false;
      this.boy.play('boy_run');
    } else if (isSliding) {
      this.boy.play('boy_slide');
    } else if (isJumping) {
      this.boy.play('boy_jump');
    } else {
      this.boy.play('boy_idle');
    }

  }

  createBoyAnimations() {

    /**
     * IDLE
     */
    this.anims.create({
      key: 'boy_idle',
      frameRate: 8,
      frames: this.anims.generateFrameNames(
        'boy',
        {
          start: 1,
          end: 8,
          prefix: 'Idle (',
          suffix: ').png'
        }),
      repeat: -1,
    });

    /**
     * RUN
     */
    this.anims.create({
      key: 'boy_run',
      frameRate: 16,
      frames: this.anims.generateFrameNames(
        'boy',
        {
          start: 1,
          end: 8,
          prefix: 'Run (',
          suffix: ').png'
        }),
      repeat: -1
    });

    /**
     * JUMP
     */
    this.anims.create({
      key: 'boy_jump',
      frameRate: 10,
      frames: this.anims.generateFrameNames(
        'boy',
        {
          start: 1,
          end: 12,
          prefix: 'Jump (',
          suffix: ').png'
        }),
      repeat: -1
    });

    /**
     * SLIDE
     */
    this.anims.create({
      key: 'boy_slide',
      frameRate: 10,
      frames: this.anims.generateFrameNames(
        'boy',
        {
          start: 1,
          end: 5,
          prefix: 'Slide (',
          suffix: ').png'
        }),
      repeat: -1
    });
  }
}