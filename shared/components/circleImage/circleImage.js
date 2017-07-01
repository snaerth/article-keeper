import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './circleImage.scss';
import BrokenImage from '../../../common/svg/brokenImage.svg';

/**
 * CircleImage component
 */
class CircleImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {
      imageBroken: false,
    };
  }

  componentWillMount() {
    const src = this.props.src;
    if (!src) {
      this.setState({ imageBroken: true });
    }

    const image = new Image();
    image.src = src;

    image.onerror = () => {
      this.setState({ imageBroken: true });
    };
  }

  render() {
    const { src, alt, className, onClick } = this.props;

    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${src})`,
          }}
          role="button"
          tabIndex={0}
          aria-label={alt}
          onClick={onClick}
          className={classnames(className || '', styles.circle)}
        >
          {this.state.imageBroken
            ? <span className={styles.brokenImageContainer}>
              <BrokenImage
                width="50"
                height="50"
                className={styles.brokenImage}
              />
            </span>
            : null}
        </div>
      </div>
    );
  }
}

export default CircleImage;
