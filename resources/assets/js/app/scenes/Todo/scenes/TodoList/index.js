import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../../../history';
import TodoItem from './components/TodoItem';
import { getOrderedTodos } from './selectors';
import { fetchTodos, deleteTodo, changeTodo } from './actions';
import { loadTodoToEditor } from '../TodoEditor/actions';

@connect(store => ({
  list: getOrderedTodos(store),
  editor: store.todo.editor,
  user: store.auth.user,
}), { fetchTodos, deleteTodo, changeTodo, loadTodoToEditor })
class TodoList extends React.Component {

  static propTypes =  {
    list: PropTypes.array,
    editor: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    changeTodo: PropTypes.func.isRequired,
    loadTodoToEditor: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const userId = this.props.user.id;
    if (userId && this.props.list == null) {
      this.props.fetchTodos(userId);
    }
    if (!Number.isInteger(userId)) {
      history.push('/');
    }
  }

  onEditClick = todoId => {
    this.props.loadTodoToEditor(this.props.list.find(todo => todo.id == todoId));
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="list-group">
          {
            this.props.list === null ? (
              <div className="d-flex flex-column align-items-center justify-content-center p-5 text-secondary">
                <span className="fas fa-fw fa-3x fa-circle-notch fa-spin"></span>,
                <p className="mt-3">Loading todos...</p>
              </div>
            ) : (
              this.props.list.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center p-5 text-secondary">
                  <span className="fas fa-fw fa-10x fa-clipboard-list"></span>
                  <p className="display-4 mt-3 mb-3">You have no todos</p>
                  <p>Start creating them by filling the top panel and pressing Schedule.</p>
                </div>
              ) : (
                this.props.list.map(todo => <TodoItem
                  todo={todo}
                  onCheckClick={this.props.changeTodo}
                  onEditClick={this.onEditClick}
                  onDeleteClick={this.props.deleteTodo}
                  isSelected={todo.id == this.props.editor.selectedTodoId}
                  key={todo.id}
                />)
              )
            )
          }
        </div>
      </div>
    );
  }

}

export default TodoList;
