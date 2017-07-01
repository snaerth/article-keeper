import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './imageBlurWrapper.scss';
import { processImage } from '../../../utils/stackBlur';

/**
 * Image blur wrapper component
 * Loads thumbnail image in canvas and performes
 * blur algoritim to blur image. When bigger image has loaded
 * it hides canvas and shows bigger image
 */
class ImageBlurWrapper extends Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const { blur, thumbnail, src, id } = this.props;
    const img = new Image();
    img.src = thumbnail || 'images/public/person-placeholder-thumbnail.png';
    img.onload = () => {
      const canvas = document.getElementById(`canvas-blur-${id}`);
      processImage(img, canvas, blur || 10);
    };

    const imgBig = new Image();
    imgBig.src = src;
    imgBig.onload = () => {
      this.setState({ loaded: true });
    };
  }

  render() {
    const { src, alt, id } = this.props;
    return (
      <div className={styles.container}>
        <img
          src={src}
          alt={alt}
          className={classnames(
            styles.image,
            this.state.loaded ? styles.show : '',
          )}
        />
        <canvas
          id={`canvas-blur-${id}`}
          className={classnames(
            styles.canvas,
            this.state.loaded ? styles.hide : '',
          )}
        />
      </div>
    );
  }
}

ImageBlurWrapper.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  blur: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default ImageBlurWrapper;
