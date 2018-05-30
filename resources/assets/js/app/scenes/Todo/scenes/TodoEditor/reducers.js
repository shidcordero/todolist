import { LOAD_TODO_TO_EDITOR, REMOVE_EDITOR_INITIAL_VALUE, RESET_EDITOR } from './actions';

const initialState = {
  selectedTodoId: null,
  initialState: null,
};

const editor = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODO_TO_EDITOR:
      return {
        selectedTodoId: action.todo.id,
        initialState: action.todo,
      };
    case REMOVE_EDITOR_INITIAL_VALUE:
      return  {
        selectedTodoId: state.selectedTodoId,
      };
    case RESET_EDITOR:
      return initialState;
    default:
      return state;
  }
}

export default editor;
