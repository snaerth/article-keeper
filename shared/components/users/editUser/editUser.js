import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../../common/container';
import Button from '../../common/button';
import s from './editUser.scss';

class EditUser extends Component {
  render() {
    const { changeViewHandler, user: { name } } = this.props;
    return (
      <Container>
        Edit {name}
        <div className={s.editContainer}>
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
              text="Edit"
              ariaLabel="Edit user"
              color="blue"
            />
          </div>
        </div>
      </Container>
    );
  }
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  changeViewHandler: PropTypes.func.isRequired,
};

export default EditUser;
