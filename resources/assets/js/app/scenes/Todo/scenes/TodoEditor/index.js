import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { removeEditorInitialValue, resetEditor } from './actions';
import { saveTodo, changeTodo } from '../TodoList/actions';
import style from './style.css';

const initialState = {
  priority: 0,
  text: '',
  due_date: '',
};

@connect(store => ({
  editor: store.todo.editor,
}), { removeEditorInitialValue, resetEditor, saveTodo, changeTodo })
class TodoEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  static propTypes = {
    editor: PropTypes.object,
    removeEditorInitialValue: PropTypes.func.isRequired,
    resetEditor: PropTypes.func.isRequired,
    saveTodo: PropTypes.func.isRequired,
    changeTodo: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.editor.initialState) {
      let { id, priority, text, due_date } = props.editor.initialState;
      due_date = due_date.replace(' ', 'T')
      props.removeEditorInitialValue();
      return { id, priority, text, due_date };
    }
    return state;
  }

  updateState(key) {
    return event => {
      this.setState({ [key]: event.target.value });
    }
  }

  onResetClick = () => {
    this.props.resetEditor();
    this.setState(initialState);
  };

  onSubmit = () => {
    const data = { ...this.state };
    const dueDate = moment(data.due_date);
    data.due_date = dueDate.format('YYYY-MM-DD HH:mm:ss');
    this.props.editor.selectedTodoId > 0 ? this.props.changeTodo(data) : this.props.saveTodo(data);
    this.props.resetEditor();
    this.setState(initialState);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="input-group col-md-12 mb-2">
        <input onChange={this.updateState('priority')} value={this.state.priority} type="number" min="0" max="2000000000" className={`form-control ${style.priorityInput}`} aria-label="Todo priority" />
        <input onChange={this.updateState('text')} value={this.state.text} type="text" className={`form-control ${style.textInput}`} placeholder="What do you need to remember?" aria-label="Todo title" required />
        <input onChange={this.updateState('due_date')} value={this.state.due_date} type="datetime-local" step="1" className={`form-control ${style.dueDateInput}`} placeholder="What do you need to remember?" aria-label="Todo due date" required/>
        <div className="input-group-append">
          <button onClick={this.onResetClick} className="btn btn-outline-danger" type="button"><span className="fas fa-fw fa-ban"></span></button>
          <button className="btn btn-outline-success" type="submit">{this.props.editor.selectedTodoId > 0 ? 'Update' : 'Schedule'}</button>
        </div>
      </form>
    );
  }

}

export default TodoEditor;
