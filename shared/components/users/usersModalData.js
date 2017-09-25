import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Container from '../common/container';
import Button from '../common/button';
import formatISODateTime from '../../utils/date';
import getUserEmail from '../../utils/userHelper';

import Person from '../../assets/images/person.svg';
import tableStyles from '../../styles/table.css';
import styles from './users.scss';

function LoggerModalData({ data, deleteHandler }) {
  if (!data) return <div>No user avaliable</div>;
  const { _id, roles, profile, name, createdAt, dateOfBirth, imageUrl } = data;

  return (
    <article className={styles.modal}>
      <header>
        <div className="banner">
          <Container>
            <h1 className={styles.title}>{name}</h1>
          </Container>
        </div>
      </header>
      <Container>
        <div className={styles.grid}>
          <aside>
            {imageUrl
              ? <img
                src={imageUrl}
                alt={name}
                className={styles.profileImage}
              />
              : <Person className={styles.person} />}
          </aside>
          <section>
            <div className={classnames(tableStyles.tableOddRow, styles.row)}>
              <div>Email</div>
              <div>{getUserEmail(data)}</div>
            </div>
            <div className={classnames(tableStyles.tableEvenRow, styles.row)}>
              <div>Id</div>
              <div>{_id}</div>
            </div>
            <div className={classnames(tableStyles.tableOddRow, styles.row)}>
              <div>Roles</div>
              <div>{roles.map((role) => <div>{role}</div>)}</div>
            </div>
            <div className={classnames(tableStyles.tableEvenRow, styles.row)}>
              <div>Profile</div>
              <div>{profile}</div>
            </div>
            <div className={classnames(tableStyles.tableOddRow, styles.row)}>
              <div>Created at</div>
              <div>{formatISODateTime(createdAt)}</div>
            </div>
            {dateOfBirth
              ? <div
                className={classnames(tableStyles.tableEvenRow, styles.row)}
              >
                <div>Date of birth</div>
                <div>{formatISODateTime(dateOfBirth)}</div>
              </div>
              : null}
          </section>
        </div>
      </Container>
      <footer>
        <Container>
          <div className={styles.buttonsContainer}>
            <Button
              type="button"
              text="Edit"
              ariaLabel="Edit user"
              color="grey"
              onClick={() => deleteHandler(_id)}
            />
            <Button
              type="button"
              text="Delete"
              ariaLabel="Delete user"
              color="red"
              onClick={() => deleteHandler(_id)}
            />
          </div>
        </Container>
      </footer>
    </article>
  );
}

LoggerModalData.propTypes = {
  data: PropTypes.object,
  deleteHandler: PropTypes.func.isRequired,
};

export default LoggerModalData;
