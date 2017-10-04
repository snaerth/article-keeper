import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import anime from 'animejs';
import s from './textAnime.scss';

class TextAnime extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  componentDidMount() {
    anime
      .timeline({ loop: true })
      .add({
        targets: '.letter',
        rotateY: [-90, 0],
        duration: 1300,
        delay(el, i) {
          return 45 * i;
        },
      })
      .add({
        targets: this.container,
        opacity: 0,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 1000,
      });
  }

  /**
   * Converts each character in string to html span element with string
   *
   * @param {String} text
   * @returns {Array} arr
   */
  renderLetters(text) {
    const arr = [];
    [...text].forEach((letter) => {
      arr.push(
        <span key={shortid.generate()} className="letter">
          {letter}
        </span>,
      );
    });

    return arr;
  }

  render() {
    return (
      <h1 className={s.ml10} ref={(c) => (this.container = c)}>
        <span className={s.textWrapper}>
          <span className={s.letters}>
            {this.renderLetters(this.props.text)}
          </span>
        </span>
      </h1>
    );
  }
}

export default TextAnime;
