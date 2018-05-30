export const LOAD_TODO_TO_EDITOR = 'todo/todo-editor/load-todo-to-editor';
export const REMOVE_EDITOR_INITIAL_VALUE = 'todo/todo-editor/remove-editor-initial-value';
export const RESET_EDITOR = 'todo/todo-editor/reset-editor';

export const loadTodoToEditor = todo => ({
  type: LOAD_TODO_TO_EDITOR,
  todo,
});

export const removeEditorInitialValue = () => ({
  type: REMOVE_EDITOR_INITIAL_VALUE,
});

export const resetEditor = () => ({
  type: RESET_EDITOR,
});
