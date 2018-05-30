import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MainMenu = ({ onLogoutClick, userName }) => (
  <nav className="navbar navbar-light bg-light justify-content-between">
    <a className="navbar-brand" href="#">Todolist</a>
    <div className="d-flex justify-content-end align-items-center">
      {userName ? <div className="my-2 my-sm-0 mr-2">Hi, {userName}!</div> : ''}
      <button onClick={onLogoutClick} className="btn btn-outline-primary my-2 my-sm-0" type="button">Logout</button>
    </div>
  </nav>
);

MainMenu.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

export default MainMenu;
