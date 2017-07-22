import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import styles from './profile.scss';
import CircleImage from '../../components/circleImage';
import ModalWrapper from '../../components/modal';
import ImageBlurWrapper from '../../components/imageBlurWrapper';
import Container from '../../components/container';

/**
 * Profile component
 */
class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
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

  render() {
    if (!this.props.user) {
      return <Container className="mt25">User is missing!</Container>;
    }

    const { name, imageUrl, thumbnailUrl, email } = this.props.user;

    return (
      <Container className="mt25">
        <Helmet title="Profile" />
        <div className={styles.grid}>
          <div className={classnames(styles.card, styles.cardLeft)}>
            {imageUrl
              ? <CircleImage
                src={imageUrl}
                alt={name}
                className={styles.profileImage}
                onClick={this.openModal}
              />
              : null}
            <p className={styles.name}>{name}</p>
            <a
              href={`mailto${email}`}
              title={`Send mail to ${email}`}
              className="link-slideright"
            >
              {email}
            </a>
          </div>
          <div className={styles.card}>
            <h2 className={styles.noMarginTop}>Additonal information</h2>
          </div>
        </div>

        <ModalWrapper
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Image Modal"
        >
          <ImageBlurWrapper
            id="1"
            src={`images/users/${imageUrl}`}
            thumbnail={`images/users/${thumbnailUrl}`}
            alt={name}
          />
        </ModalWrapper>
      </Container>
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
