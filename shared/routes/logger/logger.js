import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from 'react-virtualized/dist/commonjs/Table';
import Column from 'react-virtualized/dist/commonjs/Table/Column';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import { getLogs, isFetchingData, isNotFetchingData } from './actions';
import Container from '../../components/common/container';
import Loader from '../../components/common/loader';
import NotifyBox from '../../components/common/notifyBox';
import ModalWrapper from '../../components/common/modal';
import formatISODateTime from '../..//utils/date';
import s from '../../styles/table.css';
import styles from './logger.scss';

class Logger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      currentRowData: null,
    };

    this.rowClassName = this.rowClassName.bind(this);
    this.onRowClickHandler = this.onRowClickHandler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  static propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  /**
   * Fetch logs
   */
  componentDidMount() {
    const { token } = this.props;
    const formData = { limit: 50, offset: 10 };
    this.props.actions.isFetchingData();
    this.props.actions.getLogs({ token, formData });
  }

  /**
   * Sets style to even and odd rows
   *
   * @param {index} param0
   * @returns {string} className
   */
  rowClassName({ index }) {
    if (index < 0) {
      return s.headerRow;
    }
    return index % 2 === 0 ? s.tableEvenRow : s.tableOddRow;
  }

  /**
   * Set new state open modal and set current row data for modal
   *
   * @param {Object} event
   * @param {Number} index
   * @param {Object} rowData
   * @returns {undefined}
   */
  onRowClickHandler(event, index, rowData) {
    this.setState({
      currentRowData: rowData,
      modalOpen: true,
    });
  }

  /**
   * Set state to close modal and reset current row data
   *
   * @returns {undefined}
   */
  closeModal() {
    this.setState(() => ({
      currentRowData: null,
      modalOpen: false,
    }));
  }

  /**
     * Renders error message box
     *
     * @param {String} error
     * @returns {JSX}
     */
  renderError(error) {
    if (!error) return null;

    return (
      <fieldset className="noPadding">
        <NotifyBox strongText="Error: " text={error} type="error" />
      </fieldset>
    );
  }

  /**
   * Renders Table with logs
   * @param {Array} list
   * @returns {JSX}
   */
  renderTable(list) {
    return (
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
            onRowClick={({ event, index, rowData }) =>
              this.onRowClickHandler(event, index, rowData)}
          >
            <Column
              className={s.tableColumn}
              label="Id"
              dataKey="_id"
              width={210}
            />
            <Column
              cellDataGetter={(columnData) =>
                formatISODateTime(columnData.rowData.time)}
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
              cellDataGetter={(columnData) => JSON.stringify(columnData)}
              className={s.tableColumn}
              label="Error"
              dataKey="err"
              width={210}
            />
          </Table>
        )}
      </AutoSizer>
    );
  }

  renderRowDataModal() {
    if (!this.state.currentRowData) return <div>No log avaliable</div>;
    const {
      _id,
      time,
      msg,
      name,
      level,
      err: { stack },
      req,
      res,
    } = this.state.currentRowData;
    return (
      <div className={styles.modal}>
        <div className={s.tableEvenRow}>
          <div>Id</div>
          <div>{_id}</div>
        </div>
        <div className={s.tableOddRow}>
          <div>Time</div>
          <div>{time}</div>
        </div>
        <div className={s.tableEvenRow}>
          <div>Message</div>
          <div>{msg}</div>
        </div>
        <div className={s.tableOddRow}>
          <div>Name</div>
          <div>{name}</div>
        </div>
        <div className={s.tableEvenRow}>
          <div>Level</div>
          <div>{level}</div>
        </div>
        <div className={s.tableOddRow}>
          <div>Error</div>
          <div>{stack}</div>
        </div>
      </div>
    );
  }

  render() {
    const { data, isFetching, error } = this.props;
    return (
      <div>
        <Helmet title="Log" />
        <div className="banner">
          <Container>
            <h1>Logs</h1>
          </Container>
        </div>
        <Container className="mt25mb50">
          {this.renderError(error)}
          <div className={styles.minHeight200}>
            {isFetching ? <Loader absolute>Getting logs...</Loader> : null}
            {!isFetching && data ? this.renderTable(data.docs) : null}
          </div>
        </Container>

        <ModalWrapper
          className="mw992"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel={'Authentication'}
        >
          <div>{this.renderRowDataModal()}</div>
        </ModalWrapper>
      </div>
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
  return { error, isFetching, token, data };
}

/**
 * Maps dispatch to components props
 *
 * @param {Object} dispatch - Redux dispatch medhod
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { getLogs, isFetchingData, isNotFetchingData },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logger);
