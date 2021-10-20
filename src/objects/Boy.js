import Phaser from 'phaser';

import { store } from '../main';

export default class Boy extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, 'boy');

    this.handleStateChg = this.handleStateChg.bind(this);

    this.createAnimations(config.scene.anims);
    this.createInputs(config.scene.input);

    config.scene.add.existing(this);

    this.play('boy_idle');

  }

  createInputs(input) {

    store.subscribe(this.handleStateChg);

    this.keysObj = {
      right: input.keyboard.addKey('right'),
      left: input.keyboard.addKey('left'),
      down: input.keyboard.addKey('down'),
      space: input.keyboard.addKey('space'),
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
  }

  createAnimations(anims) {

    /**
     * IDLE
     */
    anims.create({
      key: 'boy_idle',
      frameRate: 8,
      frames: anims.generateFrameNames(
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
    anims.create({
      key: 'boy_run',
      frameRate: 16,
      frames: anims.generateFrameNames(
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
    anims.create({
      key: 'boy_jump',
      frameRate: 10,
      frames: anims.generateFrameNames(
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
    anims.create({
      key: 'boy_slide',
      frameRate: 10,
      frames: anims.generateFrameNames(
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

  handleStateChg() {

    // DEBUG
    console.log(store.getState());

    const { isRunningLeft, isRunningRight, isJumping, isSliding } = store.getState();

    if (isRunningLeft) {
      this.flipX = true;
      this.play('boy_run');
    } else if (isRunningRight) {
      this.flipX = false;
      this.play('boy_run');
    } else if (isSliding) {
      this.play('boy_slide');
    } else if (isJumping) {
      this.play('boy_jump');
    } else {
      this.play('boy_idle');
    }

  }
}