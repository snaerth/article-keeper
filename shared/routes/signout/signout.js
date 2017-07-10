import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import styles from './signout.scss';
import Button from '../../components/button';
import Container from '../../components/container';

/**
 * Signout component
 */
class Signout extends Component {
  static propTypes = {
    signoutUser: PropTypes.func
  };

  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <Container className="mt25">
        <Helmet title="Sign out" />
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
      </Container>
    );
  }
}

export default Signout;
