import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import Container from '../../common/container';
import ViewUser from '../viewUser';
import DeleteUser from '../deleteUser';
import UserForm from '../userForm';
// Styles
import s from './userModal.scss';

class UserModal extends Component {
  static propTypes = {
    activeView: PropTypes.string.isRequired,
    data: PropTypes.object,
    name: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeView: 'view',
  };

  constructor(props) {
    super(props);

    this.state = {
      views: ['view', 'delete', 'edit'],
      activeView: props.activeView,
    };

    this.changeView = this.changeView.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.data;
  }

  /**
   * Changes the activeView state for views
   * @param {Number} viewId
   */
  changeView(viewId) {
    this.setState(() => ({
      activeView: this.state.views[viewId],
    }));
  }

  /**
   * Changes witch component should render
   */
  setView() {
    const { activeView } = this.state;
    const { data, deleteHandler } = this.props;

    switch (activeView) {
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

      case 'create':
      case 'edit':
        return (
          <UserForm
            type={activeView}
            user={activeView === 'edit' ? data : {}}
            changeViewHandler={this.changeView}
          />
        );

      default:
        return <ViewUser data={data} changeViewHandler={this.changeView} />;
    }
  }

  /**
   * Sets header title text
   *
   * @param {String} type
   * @param {String} name
   * @returns {String}
   */
  setHeaderTitle(type, name) {
    switch (type) {
      case 'edit':
        return 'Edit user';

      case 'create':
        return 'Create user';

      default:
        return name;
    }
  }

  render() {
    const { activeView } = this.state;
    const { name } = this.props;

    return (
      <article className={s.modal}>
        <header>
          <div className="banner">
            <Container>
              <h1 className={s.title}>
                {this.setHeaderTitle(activeView, name)}
              </h1>
            </Container>
          </div>
        </header>
        {this.setView()}
      </article>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @param {Object} ownProps - Components own props
 * @returns {Object}
 */
function mapStateToProps(state) {
  const { user } = state.users;
  if (user) {
    return { data: user, name: user.name };
  }

  return { data: {}, name: 'Create User' };
}

export default connect(mapStateToProps)(UserModal);
