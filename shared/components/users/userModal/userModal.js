import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from '../../common/container';
import ViewUser from '../viewUser';
import DeleteUser from '../deleteUser';
import EditUser from '../editUser';

import s from './userModal.scss';

class UserModal extends Component {
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

    this.changeView = this.changeView.bind(this);
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

  /**
   * Changes witch component should render
   */
  setView() {
    const { active } = this.state;
    const { data, deleteHandler } = this.props;

    switch (active) {
      case 'view':
        return <ViewUser data={data} changeViewHandler={this.changeView} />;

      case 'delete':
        return (
          <DeleteUser
            id={data.id}
            name={data.name}
            changeViewHandler={this.changeView}
            deleteHandler={deleteHandler}
          />
        );

      case 'edit':
        return <EditUser user={data} changeViewHandler={this.changeView} />;

      default:
        return <ViewUser data={data} changeViewHandler={this.changeView} />;
    }
  }

  render() {
    return (
      <article className={s.modal}>
        <header>
          <div className="banner">
            <Container>
              <h1 className={s.title}>{this.props.data.name}</h1>
            </Container>
          </div>
        </header>
        {this.setView()}
      </article>
    );
  }
}

export default UserModal;
