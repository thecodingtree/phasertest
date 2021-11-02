import Phaser from 'phaser';

import { store } from '../main';

export default class Boy {

  constructor(config) {
    //super(config.scene, config.x, config.y, 'boy');

    this.handleStateChg = this.handleStateChg.bind(this);

    this.createAnimations(config.scene.anims);
    this.createInputs(config.scene.input);

    this.boyMatter = config.scene.matter.add.sprite(config.x, config.y, 'boy');

    this.boyMatter.play('boy_idle');
    this.boyMatter.setFixedRotation();

    // FIX ME: make this more robust
    this.boyMatter.setOnCollide((data) => {
      store.dispatch({ type: 'BOY/COLLIDED_WITH_GROUND' });
    })

    return this.boyMatter;

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

    const boy = this.boyMatter;
    // DEBUG
    console.log(store.getState());

    const { isRunningLeft, isRunningRight, isJumping, isSliding, isTouchingGround } = store.getState();

    if (isRunningLeft) {
      boy.flipX = true;
      boy.play('boy_run');
    }

    if (isRunningRight) {
      boy.flipX = false;
      boy.play('boy_run', true);
    }

    if (isSliding) {
      boy.play('boy_slide');
    }

    if (isJumping && isTouchingGround) {
      boy.play('boy_jump', true);
    }

    if (!(isRunningRight || isRunningLeft || isSliding || isJumping)) {
      boy.play('boy_idle');
    }

  }
}