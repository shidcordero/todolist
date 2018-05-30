import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from 'scenes/Auth/actions';

@connect(store => store.auth, { loginUser })
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
  };

  updateState(key) {
    return event => {
      this.setState({ [key]: event.target.value });
    }
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.loginUser(this.state);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card rounded-0" key="loginCard">
            <div className="card-header">
                <h3 className="mb-0">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit} className="form" role="form">
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input onChange={this.updateState('email')} type="email" className="form-control form-control-lg rounded-0" id="email" required />
                  <div className="invalid-feedback">Oops, you missed this one.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input onKeyPress={this.onKeyPress} onChange={this.updateState('password')} type="password" className="form-control form-control-lg rounded-0" id="password" required autoComplete="new-password" />
                  <div className="invalid-feedback">Enter your password too!</div>
                </div>
                <button type="submit" className="btn btn-success btn-lg float-right">Login</button>
                {Number.isInteger(this.props.user.id) ? <Redirect to="/todos" /> : ''}
              </form>
            </div>
          </div>
          <p className="text-center mt-3" key="registerLink"><Link to="/register">Create an Account</Link></p>
        </div>
      </div>
    );
  }

}

export default Login;