import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import classnames from 'classnames';
import s from './modalWrapper.scss';
import ExitIcon from '../../../assets/images/exit.svg';

const Modals = {
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
class ModalWrapper extends PureComponent {
  render() {
    const {
      className,
      onRequestClose,
      exitIconClassName,
      children,
      contentLabel,
      isOpen,
    } = this.props;

    return (
      <Modal
        contentLabel={contentLabel}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        closeTimeoutMS={300}
        style={Modals}
      >
        <div className={classnames(s.modalInner, className ? s[className] : '')}>
          <ExitIcon className={classnames(s.exit, s[exitIconClassName])} onClick={onRequestClose} />
          {children}
        </div>
      </Modal>
    );
  }
}

ModalWrapper.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.element,
  className: PropTypes.string,
  exitIconClassName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  contentLabel: PropTypes.string.isRequired,
};

export default ModalWrapper;
