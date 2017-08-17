import React from 'react';
import ButtonLink from '../../buttonLink';
import MainHeading from '../../mainheading';
import FacebookIcon from '../../../assets/images//facebook.svg';
import TwitterIcon from '../../../assets/images//twitter.svg';
import GoogleIcon from '../../../assets/images/google.svg';
import s from './socialsButtons.css';

const SocialsButtons = () => (
  <div>
    <MainHeading text="Sign in with a social network" className="medium" />
    <ButtonLink
      href="/api/auth/facebook"
      text="Continue with facebook"
      title="Facebook login"
      color="facebook"
      className="fullWidth"
    >
      <FacebookIcon className={s.icon} />
    </ButtonLink>
    <ButtonLink
      href="/api/auth/twitter"
      text="Continue with Twitter"
      title="Twitter login"
      color="twitter"
      className="fullWidth"
    >
      <TwitterIcon className={s.icon} />
    </ButtonLink>
    <ButtonLink
      href="/api/auth/google"
      text="Continue with Google"
      title="Google login"
      color="google"
      className="fullWidth"
    >
      <GoogleIcon className={s.icon} />
    </ButtonLink>
  </div>
);

export default SocialsButtons;
