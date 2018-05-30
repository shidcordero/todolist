import { handleRequest } from 'services/request';
import { setLoadingIndicator } from 'scenes/LoadingIndicator/actions';
import history from '../../history'

export const registerUser = credentials => async dispatch => {
  dispatch(setLoadingIndicator({
    isInProrgess: true,
    text: 'Registering...',
  }));
  let loginResponse = await handleRequest({
    config: {
      url: '/api/users',
      method: 'post',
      data: credentials,
    },
  }, dispatch);
  dispatch(setLoadingIndicator({
    isInProrgess: false,
  }));
  if (loginResponse.status == 201) {
    history.push('/');
  }
};
