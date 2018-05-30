import { LOAD_TOKEN, LOAD_USER, RESET_USER } from './actions';

const initialState = {
  user: {
    id: null,
  },
	token: {},
};

const auth = (state = initialState, action) => {
	switch (action.type) {
    case LOAD_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.user,
      };
		default:
			return state;
	}
}

export default auth;
