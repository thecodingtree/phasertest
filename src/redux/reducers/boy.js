
import {
  MOVING_RIGHT_START,
  MOVING_RIGHT_STOP,
  MOVING_LEFT_START,
  MOVING_LEFT_STOP,
  JUMPING_START,
  JUMPING_STOP,
  SLIDING_START,
  SLIDING_STOP,
  LEFT_GROUND,
  COLLIDED_WITH_GROUND,
} from '../actions/boy';

const initialState = {
  isRunningLeft: false,
  isRunningRight: false,
  isSliding: false,
  isJumping: false,
  isTouchingGround: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVING_RIGHT_START:
      return { ...state, isRunningRight: true };
    case MOVING_RIGHT_STOP:
      return { ...state, isRunningRight: false };
    case MOVING_LEFT_START:
      return { ...state, isRunningLeft: true };
    case MOVING_LEFT_STOP:
      return { ...state, isRunningLeft: false };
    case JUMPING_START:
      return { ...state, isJumping: true};
    case JUMPING_STOP:
      return { ...state, isJumping: false };
    case SLIDING_START:
      return { ...state, isSliding: true };
    case SLIDING_STOP:
      return { ...state, isSliding: false };
    case LEFT_GROUND:
      return {...state, isTouchingGround: false};
    case COLLIDED_WITH_GROUND:
      return { ...state, isTouchingGround: true };
    default:
      return state;
  }
};