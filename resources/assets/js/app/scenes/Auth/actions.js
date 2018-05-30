import { handleRequest } from 'services/request';
import { setLoadingIndicator } from 'scenes/LoadingIndicator/actions';
import { globalReset } from '../../actions';
import history from '../../history';

export const LOAD_TOKEN = 'auth/load-token';
export const LOAD_USER = 'auth/load-user';

const loadToken = token => ({
  type: LOAD_TOKEN,
  token,
});

const loadUser = user => ({
  type: LOAD_USER,
  user,
});

export const loginUser = credentials => async dispatch => {
  dispatch(setLoadingIndicator({
    isInProrgess: true,
    text: 'Logging in...',
  }));
  let loginResponse = await handleRequest({
    config: {
      url: '/api/auth/login',
      method: 'post',
      data: {
        username: credentials.email,
        password: credentials.password,
      },
    },
    dispatchables: [loadToken],
  }, dispatch);
  if (loginResponse.status == 200) {
    dispatch(fetchAuthedUser());
  }
  localStorage.setItem('authToken', JSON.stringify(loginResponse.data));
};

export const attemptLoginUserFromLocalStorage = () => dispatch => {
  let authToken = localStorage.getItem('authToken');
  if (authToken) {
    dispatch(setLoadingIndicator({
      isInProrgess: true,
      text: 'Logging in...',
    }));
    authToken = JSON.parse(authToken);
    dispatch(loadToken(authToken));
    dispatch(fetchAuthedUser());
  }
};

export const fetchAuthedUser = () => async (dispatch, getState) => {
  await handleRequest({
    config: {
      url: '/api/auth/user',
    },
    authToken: getState().auth.token,
    dispatchables: [loadUser],
  }, dispatch);
  dispatch(setLoadingIndicator({ isInProrgess: false }));
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('authToken');
  dispatch(globalReset());
  history.push('/');
};
