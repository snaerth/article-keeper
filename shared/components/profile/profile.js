import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { SingleDatePicker } from 'react-dates';
import s from './profile.scss';
import ModalWrapper from '../common/modal';
import ImageBlurWrapper from '../common/imageBlurWrapper';
import Button from '../common/button';
import Person from '../../assets/images/person.svg';

/**
 * Profile component
 */
class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      focused: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  informationSetup(user) {
    const info = {
      thumbnailUrl: user.thumbnailUrl,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    };

    switch (user.profile) {
      case 'FACEBOOK':
        info.email = user.facebook.email;
        info.imageUrl = user.imageUrl || user.facebook.image;
        break;

      case 'TWITTER':
        info.email = user.twitter.email;
        info.imageUrl = user.imageUrl || user.twitter.image;
        break;

      case 'GOOGLE':
        info.email = user.google.email;
        info.imageUrl = user.imageUrl || user.google.image;
        break;

      default:
        break;
    }

    return info;
  }

  /**
   * Renders additonal information about user
   *
   * @param {Object} user
   * @returns {JSX}
   */
  renderAdditonalInformation(user) {
    const { dateOfBirth, phone } = user;
    const noAdditonalInfo = !!(!dateOfBirth && !phone);

    return (
      <div className={classnames(s.card, s.profileInformation)}>
        <h2 className={s.noMarginTop}>Additonal information</h2>
        {!noAdditonalInfo
          ? <SingleDatePicker
            date={null} // momentPropTypes.momentObj or null
            onDateChange={(date) => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })}
          />
          : <div>
            <p>No additonal user information</p>

            <Button text="Edit profile" ariaLabel="Edit profile" />
          </div>}
      </div>
    );
  }

  render() {
    const { user } = this.props;
    const { modalIsOpen } = this.state;

    if (!user) {
      return <div>User is missing!</div>;
    }

    const { name, imageUrl, thumbnailUrl, email } = this.informationSetup(user);

    return (
      <div>
        <div className={s.grid}>
          <div className={classnames(s.card, s.cardLeft)}>
            {imageUrl
              ? <div onClick={this.openModal} role="button" tabIndex={0}>
                <img src={imageUrl} alt={name} className={s.profileImage} />
              </div>
              : <Person className={s.person} />}
            <p className={s.name}>{name}</p>
            {email
              ? <a
                href={`mailto${email}`}
                title={`Send mail to ${email}`}
                className="link-slideright"
              >
                {email}
              </a>
              : 'Email missing'}
          </div>
          {this.renderAdditonalInformation(user)}
        </div>
        <ModalWrapper
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Image Modal"
        >
          <ImageBlurWrapper
            src={imageUrl}
            thumbnail={thumbnailUrl}
            alt={name}
          />
        </ModalWrapper>
      </div>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps)(Profile);
