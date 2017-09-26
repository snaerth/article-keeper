import React from 'react';
import PropTypes from 'prop-types';
import Container from '../../common/container';
import Button from '../../common/button';
import s from './deleteUser.scss';

const Delete = ({ id, name, changeViewHandler, deleteHandler }) => (
  <Container>
    <div className={s.deleteContainer}>
      <h2 className={s.textCenter}>
        Do you really want to delete {name}?
      </h2>
      <div className={s.buttonsContainerCenter}>
        <Button
          type="button"
          text="Cancel"
          ariaLabel="Edit user"
          color="grey"
          onClick={() => changeViewHandler(0)}
        />
        <Button
          type="button"
          text="Delete"
          ariaLabel="Delete user"
          color="red"
          onClick={() => deleteHandler(id)}
        />
      </div>
    </div>
  </Container>
);

Delete.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  changeViewHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Delete;
