import USER_ACTION_TYPES from './user.types';

export const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  errorSigningIn: null,
  errorSigningOut: null,
  errorSigningUp: null
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };

    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null}

    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return { ...state, errorSigningIn: payload.message};

    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      const message = payload.message.includes('auth/email-already-in-use') ?
                      'Email already in use' :
                      payload.message;
      return { ...state, errorSigningUp: message};

    case USER_ACTION_TYPES.SIGN_OUT_FAILED:

      return { ...state, errorSigningOut: payload.message};
      
    case USER_ACTION_TYPES.CLEAR_ERROR:
      return { ...state,
              errorSigningIn: null,
              errorSigningOut: null,
              errorSigningUp: null
            }

    default:
      return state;
  }
};