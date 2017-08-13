import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from 'react-virtualized/dist/commonjs/Table';
import Column from 'react-virtualized/dist/commonjs/Table/Column';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import getLogs from './actions';
import Container from '../../components/container';
import Loader from '../../components/common/loader';
import s from '../../styles/table.css';

class Logger extends Component {
  constructor(props) {
    super(props);
    this.rowClassName = this.rowClassName.bind(this);
  }

  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object,
  };

  /**
   * Fetch logs
   */
  componentDidMount() {
    const { token } = this.props;
    const formData = { limit: 50, offset: 10 };
    this.props.actions.getLogs({ token, formData });
  }

  rowClassName({ index }) {
    if (index < 0) {
      return s.headerRow;
    }
    return index % 2 === 0 ? s.tableEvenRow : s.tableOddRow;
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return <Loader>Loading...</Loader>;
    }

    const list = data.docs;

    return (
      <Container className="mt25">
        <Helmet title="Log" />
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              width={width}
              height={600}
              headerHeight={30}
              rowHeight={30}
              headerClassName={s.tableHeader}
              rowClassName={this.rowClassName}
              rowCount={list.length}
              rowGetter={({ index }) => list[index]}
            >
              <Column
                className={s.tableColumn}
                label="Id"
                dataKey="_id"
                width={210}
              />
              <Column
                className={s.tableColumn}
                label="Time"
                dataKey="time"
                width={210}
              />
              <Column
                className={s.tableColumn}
                label="Message"
                dataKey="msg"
                width={210}
              />
              <Column
                className={s.tableColumn}
                label="Name"
                dataKey="name"
                width={210}
              />
              <Column
                className={s.tableColumn}
                label="Level"
                dataKey="level"
                width={210}
              />
              <Column
                className={s.tableColumn}
                label="Error"
                dataKey="err"
                width={210}
              />
            </Table>
          )}
        </AutoSizer>
      </Container>
    );
  }
}

/**
 * Maps state to components props
 *
 * @param {Object} state - Application state
 * @returns {Object}
 */
function mapStateToProps(state) {
  const { error, isFetching, data } = state.logs;
  const token = state.auth && state.auth.user ? state.auth.user.token : '';
  return { errorMessage: error, isFetching, token, data };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getLogs }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logger);
