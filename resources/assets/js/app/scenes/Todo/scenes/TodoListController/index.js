import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeSettings } from './actions';
import style from './style.css';

@connect(store => store.todo.listController, { changeSettings })
class TodoListController extends React.Component {

  static propTypes = {
    orderDirection: PropTypes.oneOf(['asc', 'desc']),
    orderField: PropTypes.oneOf(['due_date', 'priority']),
    changeSettings: PropTypes.func.isRequired,
  }

  toggleOrder = () => {
    this.props.changeSettings({
      orderDirection: this.props.orderDirection == 'asc' ? 'desc' : 'asc',
    });
  };

  selectField = event => {
    this.props.changeSettings({
      orderField: event.target.value,
    });
  };

  render() {
    return (
      <div className="input-group col-md-12 mb-2">
        <div onClick={this.toggleOrder} className={`input-group-prepend ${style.orderDirection}`}>
          <span className="input-group-text">
            <span className={`fab fa-fw fa-sort-amount-${this.props.orderDirection == 'asc' ? 'down' : 'up' }`}></span>
          </span>
        </div>
        <select onChange={this.selectField} className="custom-select" defaultValue={this.props.orderField}>
          <option value="due_date">By due date</option>
          <option value="priority">By priority</option>
        </select>
      </div>
    );
  }

}

export default TodoListController;
