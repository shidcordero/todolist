import React from 'react';
import TodoEditor from './scenes/TodoEditor';
import TodoListController from './scenes/TodoListController';
import TodoList from './scenes/TodoList';

const Todo = () => (
  <div>
    <div className="row">
      <div className="col-md-12">
        <h1>Todos</h1>
      </div>
    </div>
    <div className="row">
      <TodoEditor />
    </div>
    <div className="row">
      <TodoListController />
    </div>
    <div className="row">
      <TodoList />
    </div>
  </div>
);

export default Todo;
