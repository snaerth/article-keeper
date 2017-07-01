import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import styles from './signout.scss';
import Button from '../../components/common/button';
import * as actions from '../../components/auth/actions';

/**
 * Signout component
 */
class Signout extends Component {
  static propTypes = {
    signoutUser: PropTypes.func,
  };

  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="container">
        <div className={styles.center}>
          <p>
            You have successfully been signed out. You can sign in again at any
            time.
          </p>
          <br />
          <Link to="/">
            <Button text="Back to home" ariaLabel="Back to home" />
          </Link>
          &nbsp;&nbsp;
          <Link to="/"><Button text="Sign in" ariaLabel="Sign in" /></Link>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
