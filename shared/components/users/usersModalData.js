import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shortid from 'shortid';

import Container from '../common/container';
import Button from '../common/button';
import formatISODateTime from '../../utils/date';
import getUserEmail from '../../utils/userHelper';

import Person from '../../assets/images/person.svg';
import styles from './users.scss';

class LoggerModalData extends Component {
  static propTypes = {
    data: PropTypes.object,
    deleteHandler: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      views: ['view', 'delete', 'edit'],
      active: 'view',
    };
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.data;
  }

  /**
   * Changes the active state for views
   * @param {Number} viewId 
   */
  changeView(viewId) {
    this.setState(() => ({
      active: this.state.views[viewId],
    }));
  }

  renderDeleteView() {
    const { data: { _id, name } } = this.props;
    return (
      <Container>
        <div className={styles.deleteContainer}>
          <h2 className={styles.textCenter}>
            Do you really want to delete {name}?
          </h2>
          <div className={styles.buttonsContainerCenter}>
            <Button
              type="button"
              text="Cancel"
              ariaLabel="Edit user"
              color="grey"
              onClick={() => this.changeView(0)}
            />
            <Button
              type="button"
              text="Delete"
              ariaLabel="Delete user"
              color="red"
              onClick={() => this.props.deleteHandler(_id)}
            />
          </div>
        </div>
      </Container>
    );
  }

  renderView() {
    const {
      data: { _id, roles, profile, name, createdAt, dateOfBirth, imageUrl },
    } = this.props;

    return (
      <div>
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
              <div className={styles.row}>
                <div>Email</div>
                <div>{getUserEmail(this.props.data)}</div>
              </div>
              <div className={styles.row}>
                <div>Id</div>
                <div>{_id}</div>
              </div>
              <div className={styles.row}>
                <div>Roles</div>
                <div>
                  {roles.map((role) => {
                    switch (role) {
                      case 'admin':
                        return (
                          <span
                            key={shortid.generate()}
                            className={classnames(styles.role, styles.admin)}
                          >
                            {role}
                          </span>
                        );
                      default:
                        return (
                          <span
                            key={shortid.generate()}
                            className={styles.role}
                          >
                            {role}
                          </span>
                        );
                    }
                  })}
                </div>
              </div>
              <div className={styles.row}>
                <div>Profile</div>
                <div>{profile}</div>
              </div>
              <div className={styles.row}>
                <div>Created at</div>
                <div>{formatISODateTime(createdAt)}</div>
              </div>
              {dateOfBirth
                ? <div className={styles.row}>
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
                onClick={() => this.changeView(2)}
              />
              <Button
                type="button"
                text="Delete"
                ariaLabel="Delete user"
                color="red"
                onClick={() => this.changeView(1)}
              />
            </div>
          </Container>
        </footer>
      </div>
    );
  }

  setView() {
    const { active } = this.state;
    switch (active) {
      case 'view':
        return this.renderView();

      case 'delete':
        return this.renderDeleteView();

      default:
        return this.renderView();
    }
  }

  render() {
    return (
      <article className={styles.modal}>
        <header>
          <div className="banner">
            <Container>
              <h1 className={styles.title}>{this.props.data.name}</h1>
            </Container>
          </div>
        </header>
        {this.setView()}
      </article>
    );
  }
}

export default LoggerModalData;
