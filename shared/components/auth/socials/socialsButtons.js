import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonLink from '../../buttonLink';
import MainHeading from '../../mainheading';
import ArrowForward from '../../../assets/images/arrow_forward.svg';
import FacebookIcon from '../../../assets/images//facebook.svg';
import TwitterIcon from '../../../assets/images//twitter.svg';
import GoogleIcon from '../../../assets/images/google.svg';
import styles from './socialsButtons.scss';

const SocialsButtons = ({ onClick }) => {
  const { icon, iconArrowForward } = styles;

  return (
    <div>
      <MainHeading text="Sign in with a social network" className="medium" />
      <ButtonLink
        href="/admin/auth/facebook"
        text="Continue with facebook"
        title="Facebook login"
        color="facebook"
        className="fullWidth"
      >
        <FacebookIcon className={icon} />
      </ButtonLink>
      <ButtonLink
        href="/admin/auth/twitter"
        text="Continue with Twitter"
        title="Twitter login"
        color="twitter"
        className="fullWidth"
      >
        <TwitterIcon className={icon} />
      </ButtonLink>
      <ButtonLink
        href="/admin/auth/google"
        text="Continue with Google"
        title="Google login"
        color="google"
        className="fullWidth"
      >
        <GoogleIcon className={icon} />
      </ButtonLink>
      <ButtonLink
        href="/"
        onClick={onClick}
        text="Sign in with email"
        title="Sign in with email"
        className="fullWidth"
      >
        <ArrowForward className={iconArrowForward} />
      </ButtonLink>
    </div>
  );
};

SocialsButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SocialsButtons;
