import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './style.css';

const TodoItem = ({ todo, onCheckClick, onEditClick, onDeleteClick, isSelected = false }) => (
  <div className={`list-group-item list-group-item-action d-flex justify-content-between ${isSelected ? 'active' : ''}`}>
    <div>
      <span onClick={e => onCheckClick({ ...todo, is_completed: !todo.is_completed })} className={`fas fa-fw fa-calendar${todo.is_completed ? '-check' : ''}  ${style.check}`}></span>
    </div>
    <div className={`d-flex ${style.data} ${todo.is_completed ? style.lineThrough : ''}`}>
      <span className="ml-2 mr-3"><span className="fas fa-fw fa-caret-up"></span>{todo.priority}</span>
      <span className="mr-2">{todo.text} @ <span className="font-italic">{todo.due_date}</span></span>
    </div>
    <div className={style.buttonGroup}>
      <button onClick={e => onEditClick(todo.id)} className="btn btn-outline-primary mr-1"><span className="fas fa-fw fa-edit"></span></button>
      <button onClick={e => onDeleteClick(todo.id)} className="btn btn-outline-danger"><span className="fas fa-fw fa-trash"></span></button>
    </div>
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onCheckClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default TodoItem;
