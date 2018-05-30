import { handleRequest, HTTP_OK, HTTP_CREATED } from 'services/request';

export const LOAD_TODOS = 'todo/todo-list/load-todos';
export const ADD_TODO = 'todo/todo-list/add-todo';
export const UPDATE_TODO = 'todo/todo-list/update-todo';
export const REMOVE_TODO = 'todo/todo-list/remove-todo';

const loadTodos = todos => ({
  type: LOAD_TODOS,
  todos,
});

const addTodo = todo => ({
  type: ADD_TODO,
  todo,
});

const updateTodo = todo => ({
  type: UPDATE_TODO,
  todo,
});

const removeTodo = todoId => ({
  type: REMOVE_TODO,
  todoId,
});

export const fetchTodos = userId => async (dispatch, getState) => {
  const response = await handleRequest({
    config: {
      url: `/api/users/${userId}/todos`,
    },
    authToken: getState().auth.token,
    dispatchables: [loadTodos],
  }, dispatch);
};

export const saveTodo = todo => async (dispatch, getState) => {
  const response = await handleRequest({
    config: {
      method: 'post',
      url: `/api/users/${getState().auth.user.id}/todos`,
      data: todo,
    },
    authToken: getState().auth.token,
  });
  if (response.status == HTTP_CREATED) {
    todo.id = response.data.todoId;
    dispatch(addTodo(todo));
  }
};

export const deleteTodo = todoId => async (dispatch, getState) => {
  if (confirm('Do you really want to delete this item?')) {
    let response = await handleRequest({
      config: {
        method: 'delete',
        url: `/api/users/${getState().auth.user.id}/todos/${todoId}`,
      },
      authToken: getState().auth.token,
    });
    if (response.status == HTTP_OK) {
      dispatch(removeTodo(todoId));
    }
  }
};

export const changeTodo = todo => async (dispatch, getState) => {
  let response = await handleRequest({
    config: {
      method: 'put',
      url: `/api/users/${getState().auth.user.id}/todos/${todo.id}`,
      data: todo,
    },
    authToken: getState().auth.token,
  });
  if (response.status == HTTP_OK) {
    dispatch(updateTodo(todo));
  }
};
