import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Styles
import s from './avatar.scss';

class Avatar extends Component {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { imageUrl, name, children } = this.props;

    return (
      <div className={s.avatar}>
        <img src={imageUrl} alt={name} />
        {children}
      </div>
    );
  }
}

export default Avatar;
