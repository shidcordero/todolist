import { LOAD_TODOS, ADD_TODO, UPDATE_TODO, REMOVE_TODO } from './actions';

const initialState = null;

const list = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return action.todos;
    case ADD_TODO:
      return [...state, action.todo];
    case UPDATE_TODO:
      return state.map(todo => todo.id == action.todo.id ? Object.assign({}, todo, action.todo) : todo);
    case REMOVE_TODO:
      return state.filter(todo => todo.id != action.todoId);
    default:
      return state;
  }
}

export default list;
