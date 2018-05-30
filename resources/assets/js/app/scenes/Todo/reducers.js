import { combineReducers } from 'redux';

import editor from './scenes/TodoEditor/reducers';
import listController from './scenes/TodoListController/reducers';
import list from './scenes/TodoList/reducers';

const todo = combineReducers({
  editor,
  listController,
  list,
});

export default todo;
