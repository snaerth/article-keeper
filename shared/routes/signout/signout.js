import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './signout.scss';
import Button from '../../components/common/button';
import { signoutUser } from '../../components/auth/actions';

/**
 * Signout component
 */
class Signout extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.signoutUser();
  }

  render() {
    const { signoutContainer, buttonContainer } = styles;

    return (
      <div>
        <Helmet title="Sign out" />
        <div className={signoutContainer}>
          <h2>
            You have successfully been signed out.
            <br />
            You can sign in again at any time.
          </h2>
          <br />
          <div className={buttonContainer}>
            <Link to="/signin">
              <Button text="Sign in" ariaLabel="Sign in" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ signoutUser }, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Signout);
