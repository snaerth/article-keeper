import React from 'react';
import PropTypes from 'prop-types';
import s from './card.scss';

/**
 * Card component
 */
const Card = (props) => <div className={s.container}>{props.children}</div>;

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
