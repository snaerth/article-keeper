import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import s from './profile.scss';
import ModalWrapper from '../common/modal';
import ImageBlurWrapper from '../common/imageBlurWrapper';
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
   * Renders additonal information
   *
   * @returns {JSX}
   */
  renderAdditonalInformation() {
    return (
      <div className={classnames(s.card, s.profileInformation)}>
        <h2 className={s.noMarginTop}>Additonal information</h2>
      </div>
    );
  }

  render() {
    if (!this.props.user) {
      return <div>User is missing!</div>;
    }

    const { name, imageUrl, thumbnailUrl, email } = this.informationSetup(
      this.props.user,
    );

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
          {this.renderAdditonalInformation()}
        </div>
        {imageUrl
          ? <ModalWrapper
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
          : null}
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
