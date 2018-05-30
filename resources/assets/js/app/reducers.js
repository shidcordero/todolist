import { combineReducers } from 'redux';

import loadingIndicator from 'scenes/LoadingIndicator/reducers';
import auth from 'scenes/Auth/reducers';
import todo from 'scenes/Todo/reducers';

import { GLOBAL_RESET } from './actions'; 

const appReducer = combineReducers({
  loadingIndicator,
	auth,
  todo,
});

const rootReducer = (state, action) => {
  if (action.type === GLOBAL_RESET) {
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer;
