import { CHANGE_SETTINGS } from './actions';

const initialState = {
  orderDirection: 'asc',
  orderField: 'due_date',
};

const listController = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SETTINGS:
      return Object.assign({}, state, action.settings);
    default:
      return state;
  }
};

export default listController;

