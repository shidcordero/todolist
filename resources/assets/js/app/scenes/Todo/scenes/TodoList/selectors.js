import { createSelector } from 'reselect';

const getController = store => store.todo.listController;
const getTodos = store => store.todo.list;

export const getOrderedTodos = createSelector(
  [getController, getTodos],
  (controller, todos) => {
    if (todos !== null) {
      return todos.slice().sort((a, b) => {
        let result = 0;
        if (a[controller.orderField] < b[controller.orderField]) {
          result = -1;
        } else if (a[controller.orderField] > b[controller.orderField]) {
          result = 1;
        }
        return result * (controller.orderDirection === 'desc' ? -1 : 1);
      })
    }
    return todos;
  }
);
