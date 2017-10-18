import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
// Components
import ModalWrapper from '../common/modal';
import ImageBlurWrapper from '../common/imageBlurWrapper';
import CircleButton from '../common/circleButton';
import Tags from '../common/tags';
import UsersModal from '../users/userModal';
// Utils
import formatISODateTime, { formatDateWithMonthName } from '../../utils/date';
// Svg
import Person from '../../assets/images/person.svg';
import Edit from '../../assets/images/edit.svg';
// Styles
import s from './profile.scss';

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
      imageModalActive: false,
      editUserModalActive: false,
      focused: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * Changes state and opens modal
   *
   * @param {String} type
   */
  openModal(type) {
    if (type === 'image') {
      this.setState({ modalIsOpen: true, imageModalActive: true });
    }

    if (type === 'edituser') {
      this.setState({ modalIsOpen: true, editUserModalActive: true });
    }
  }

  /**
   * Closes modal and changes state
   */
  closeModal() {
    this.setState({
      modalIsOpen: false,
      imageModalActive: false,
      editUserModalActive: false,
    });
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
    const { dateOfBirth, phone, email, roles, createdAt, updatedAt, name } = user;

    return (
      <div className={classnames(s.card, s.profileInformation)}>
        <h2 className={s.noMarginTop}>{name}</h2>
        <section>
          <div className={s.row}>
            <div>Email</div>
            <div>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
          {phone ? (
            <div className={s.row}>
              <div>Phone</div>
              <div>
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            </div>
          ) : null}
          {roles && roles.length > 0 ? (
            <div className={s.row}>
              <div>Roles</div>
              <div>
                <Tags roles={roles} />
              </div>
            </div>
          ) : null}
          {createdAt ? (
            <div className={s.row}>
              <div>Created at</div>
              <div>{formatISODateTime(createdAt)}</div>
            </div>
          ) : null}
          {updatedAt ? (
            <div className={s.row}>
              <div>Updated at</div>
              <div>{formatISODateTime(updatedAt)}</div>
            </div>
          ) : null}
          {dateOfBirth ? (
            <div className={s.row}>
              <div>Date of birth</div>
              <div>{formatDateWithMonthName(dateOfBirth)}</div>
            </div>
          ) : null}
        </section>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    const { modalIsOpen, imageModalActive, editUserModalActive } = this.state;

    if (!user) {
      return <div>User is missing!</div>;
    }

    const { name, imageUrl, thumbnailUrl } = this.informationSetup(user);

    return (
      <div>
        <div className={s.grid}>
          <div className={classnames(s.card, s.cardLeft)}>
            {imageUrl ? (
              <div onClick={() => this.openModal('image')} role="button" tabIndex={0}>
                <img src={imageUrl} alt={name} className={s.profileImage} />
              </div>
            ) : (
              <Person className={s.person} />
            )}
            <p className={s.name}>{name}</p>
          </div>
          {this.renderAdditonalInformation(user)}
        </div>
        <div className={s.editButton}>
          <CircleButton onClick={() => this.openModal('edituser')}>
            <Edit />
          </CircleButton>
        </div>
        <ModalWrapper
          className={editUserModalActive ? 'mw992' : ''}
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Profile modal"
          exitIconClassName={editUserModalActive ? 'white' : ''}
        >
          <div>
            {modalIsOpen && imageModalActive ? (
              <ImageBlurWrapper src={imageUrl} thumbnail={thumbnailUrl} alt={name} />
            ) : null}
            {modalIsOpen && editUserModalActive ? (
              <UsersModal activeView="profile" closeModalHandler={this.closeModal} />
            ) : null}
          </div>
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
