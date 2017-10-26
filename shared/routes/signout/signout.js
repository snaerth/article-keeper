import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Components
import Button from '../../components/common/button';
import { signoutUser } from '../../components/auth/actions';
import MainHeading from '../../components/common/mainheading';
// Styles
import s from './signout.scss';

class Signout extends PureComponent {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.signoutUser();
  }

  render() {
    return (
      <div>
        <Helmet title="Sign out" />
        <section className={s.container}>
          <div className={s.center}>
            <MainHeading className="medium">
              You have successfully been signed out.
              <br />
              You can sign in again at any time.
            </MainHeading>
            <br />
            <div className={s.buttonContainer}>
              <Link to="/signin">
                <Button text="Sign in" ariaLabel="Sign in" className="large" />
              </Link>
            </div>
          </div>
        </section>
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
