import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { processImage } from '../../../utils/stackBlur';
import s from './imageBlurWrapper.scss';

/**
 * Image blur wrapper component
 * Loads thumbnail image in canvas and performes
 * blur algoritim to blur image. When bigger image has loaded
 * it hides canvas and shows bigger image
 */
class ImageBlurWrapper extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    blur: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    const { blur, thumbnail } = this.props;
    const img = new Image();
    img.src = thumbnail || 'images/thumbnails/placeholder.png';
    img.onload = () => {
      const canvas = this.canvas;
      processImage(img, canvas, blur || 10);
    };
  }

  loadBigImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.canvas.parentNode.classList.add('heightAuto');
      setTimeout(() => {
        this.canvas.classList.add(s.hide);
        this.image.classList.add(s.show);
      }, 1000);

      this.setState({ visible: false });
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.visible === true;
  }

  render() {
    const { src, alt } = this.props;
    const { visible } = this.state;

    if (visible) {
      this.loadBigImage(src);
    }

    return (
      <figure>
        <img
          src={visible ? src : ''}
          alt={alt}
          className={s.image}
          ref={(c) => this.image = c}
        />
        <canvas ref={(c) => this.canvas = c} className={s.canvas} />
      </figure>
    );
  }
}

export default ImageBlurWrapper;
