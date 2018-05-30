import { SET_LOADING_INDICATOR } from './actions';

const initialState = {
  isInProrgess: false,
  text: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_INDICATOR:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export default auth;
