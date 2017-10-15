import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Svg
import Person from '../../../assets/images/person.svg';
// Styles
import s from './avatar.scss';

class Avatar extends PureComponent {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    callbackOpenFn: PropTypes.func.isRequired,
  };

  handleClick = () => {
    this.props.callbackOpenFn(true);
  };

  render() {
    const { imageUrl, name, children } = this.props;

    return (
      <div className={s.avatar} role="button" tabIndex="0" onClick={this.handleClick}>
        {imageUrl ? <img src={imageUrl} alt={name} /> : <Person />}
        {children}
      </div>
    );
  }
}

export default Avatar;
