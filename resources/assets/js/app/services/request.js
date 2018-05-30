import axios from 'axios';

export const HTTP_OK = 200;
export const HTTP_CREATED = 201;

export const handleRequest = async ({ config, authToken, dispatchables }, dispatch) => {
  let response = null;
  if (authToken) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['Authorization'] = `Bearer ${authToken.access_token}`;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('REQUEST: ', config)
  }
  response = await axios.request(config);
  if (process.env.NODE_ENV === 'development') {
    console.log('RESPONSE: ', response)
  }
  if (response.status != HTTP_OK) {
    console.log(response.message);
  } else {
    if (dispatchables) {
      dispatchables.forEach(dispatchable => {
        dispatch(dispatchable(response.data));
      });
    }
  }
  return response;
};
