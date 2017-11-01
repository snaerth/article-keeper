import React from 'react';
import PropTypes from 'prop-types';
import Container from '../../common/container';
import Button from '../../common/button';
import s from './delete.scss';

const Delete = ({
  text,
  cancelHandler,
  cancelHandlerId,
  deleteHandler,
  deleteHandlerId,
  cancelButtonText,
  deleteButtonText,
}) => (
  <Container>
    <div className={s.deleteContainer}>
      <h2 className={s.textCenter}>{text}</h2>
      <div className={s.buttonsContainerCenter}>
        <Button
          type="button"
          text={cancelButtonText}
          ariaLabel={cancelButtonText}
          color="grey"
          onClick={() => cancelHandler(cancelHandlerId)}
        />
        <Button
          type="button"
          text={deleteButtonText}
          ariaLabel={deleteButtonText}
          color="red"
          onClick={() => deleteHandler(deleteHandlerId)}
        />
      </div>
    </div>
  </Container>
);

Delete.propTypes = {
  text: PropTypes.string.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  cancelHandlerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  deleteHandler: PropTypes.func.isRequired,
  deleteHandlerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cancelButtonText: PropTypes.string,
  deleteButtonText: PropTypes.string,
};

Delete.defaultProps = {
  cancelButtonText: 'Cancel',
  deleteButtonText: 'Delete',
};

export default Delete;
