import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@connect(store => store.loadingIndicator)
class LoadingIndicator extends React.Component {

  static propTypes = {
    text: PropTypes.string,
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center p-5 text-secondary">
        <span className="fas fa-fw fa-3x fa-circle-notch fa-spin"></span>
        {this.props.text ? <p className="mt-3">{this.props.text}</p> : ''}
      </div>
    );
  }

}

export default LoadingIndicator;
