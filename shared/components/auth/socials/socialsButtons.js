import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonLink from '../../common/buttonLink';
import MainHeading from '../../common/mainheading';
import FacebookIcon from '../../../assets/images/facebook.svg';
import GoogleIcon from '../../../assets/images/google.svg';
import EmailIcon from '../../../assets/images/email.svg';
import s from './socialsButtons.scss';

const SocialsButtons = ({ className, children, onClick }) => (
  <div className={className}>
    <fieldset>
      <MainHeading className="medium">Sign in with a social network</MainHeading>
      <ButtonLink
        href="/api/auth/facebook"
        text="Sign in with facebook"
        title="Facebook login"
        color="facebook"
        className="fullWidth"
      >
        <FacebookIcon className={s.icon} />
      </ButtonLink>
      <ButtonLink
        href="/api/auth/google"
        text="Sign in with Google"
        title="Google login"
        color="google"
        className="fullWidth"
      >
        <GoogleIcon className={s.icon} />
      </ButtonLink>
      <ButtonLink
        onClick={onClick}
        text="Sign in with email"
        title="Email login"
        color="grey"
        className="fullWidth"
      >
        <EmailIcon className={classnames(s.icon, s.iconDark)} />
      </ButtonLink>
      {children}
    </fieldset>
  </div>
);

SocialsButtons.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default SocialsButtons;
