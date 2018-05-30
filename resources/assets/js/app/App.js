import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MainMenu from 'components/MainMenu';
import LoadingIndicator from 'scenes/LoadingIndicator';
import { attemptLoginUserFromLocalStorage, logoutUser } from 'scenes/Auth/actions';

@connect(store => ({
  auth: store.auth,
  loadingIndicator: store.loadingIndicator,
}), { attemptLoginUserFromLocalStorage, logoutUser })
class App extends React.Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    loadingIndicator: PropTypes.object.isRequired,
    attemptLoginUserFromLocalStorage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.attemptLoginUserFromLocalStorage();
  }

  render() {
    return (
      <div>
        { Number.isInteger(this.props.auth.user.id) ? <MainMenu onLogoutClick={this.props.logoutUser} userName={this.props.auth.user.name} /> : '' }
        <div className="container py-5">
          { this.props.loadingIndicator.isInProrgess ? <LoadingIndicator /> : this.props.children}
        </div>
      </div>
    );
  }

}

export default App;
