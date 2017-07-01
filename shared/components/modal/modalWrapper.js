import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './modalWrapper.scss';
import ExitIcon from '../../../common/svg/exit.svg';

const ModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(55, 58, 71, 0.9)',
    zIndex: 1000,
  },
  content: {
    zIndex: 1001,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '10px',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    outline: 'none',
    borderRadius: '0',
    WebkitOverflowScrolling: 'touch',
    pointerEvents: 'none',
    backgroundColor: 'transparent',
  },
};

/**
 * Modal component
 */
const ModalWrapper = props => (
  <Modal {...props} closeTimeoutMS={300} style={ModalStyles}>
    <div className={styles.modalInner}>
      <ExitIcon className={styles.exit} onClick={props.onRequestClose} />
      {props.children}
    </div>
  </Modal>
);

ModalWrapper.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default ModalWrapper;
