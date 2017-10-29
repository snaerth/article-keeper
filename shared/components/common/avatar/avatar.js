import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Svg
import Person from '../../../assets/images/person.svg';
// Styles
import s from './avatar.scss';

class Avatar extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    callbackOpenFn: PropTypes.func.isRequired,
    childrenVisible: PropTypes.bool.isRequired,
  };

  handleClick = () => {
    console.log(!this.props.childrenVisible);
    this.props.callbackOpenFn(!this.props.childrenVisible);
  };

  render() {
    const { imageUrl, name, children, id } = this.props;

    return (
      <div className={s.avatar} role="button" tabIndex="0" onClick={this.handleClick}>
        {imageUrl ? <img src={imageUrl} alt={name} id={id} /> : <Person id={id} />}
        {children}
      </div>
    );
  }
}

export default Avatar;
