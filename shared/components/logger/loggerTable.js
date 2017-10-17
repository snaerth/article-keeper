import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-virtualized/dist/commonjs/Table';
import Column from 'react-virtualized/dist/commonjs/Table/Column';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import levels from './level';
import formatISODateTime from '../../utils/date';
import { sortHelper } from '../../utils/sortDirection';
import NotifyBox from '../common/notifyBox';
import tableStyles from '../../styles/table.css';

class LoggerTable extends PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onRowClickHandler: PropTypes.func.isRequired,
    onSortClickHandler: PropTypes.func.isRequired,
    rowClassName: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      sort: [],
    };

    this.sort = this.sort.bind(this);
  }

  /**
   * Table sort handler
   *
   * @param {Object} obj
   * @param {String} obj.sortBy
   * @param {String} obj.sortDirection
   */
  sort({ sortBy, sortDirection }) {
    const { sort } = this.state;
    const result = sortHelper(sort, sortBy, sortDirection);
    // Callback to parent component
    this.props.onSortClickHandler(
      result.currentSort.sortBy,
      result.currentSort.sortDirection,
    );
    this.setState({ sort: result.sort });
  }

  render() {
    const { list, onRowClickHandler, rowClassName } = this.props;
    if (list.length === 0) {
      return (
        <fieldset className="noPadding">
          <NotifyBox text="No logs found" type="info" />
        </fieldset>
      );
    }

    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            width={width}
            height={500}
            headerHeight={30}
            rowHeight={30}
            headerClassName={tableStyles.tableHeader}
            rowClassName={rowClassName}
            rowCount={list.length}
            sort={this.sort}
            rowGetter={({ index }) => list[index]}
            onRowClick={({ event, index, rowData }) =>
              onRowClickHandler(event, index, rowData)}
          >
            <Column
              className={tableStyles.tableColumn}
              label="Id"
              dataKey="_id"
              width={210}
              disableSort
            />
            <Column
              cellDataGetter={(columnData) =>
                formatISODateTime(columnData.rowData.time)}
              className={tableStyles.tableColumn}
              label="Time"
              dataKey="time"
              width={180}
            />
            <Column
              cellDataGetter={(columnData) => levels(columnData.rowData.level)}
              label="Type"
              dataKey="level"
              width={80}
            />
            <Column
              className={tableStyles.tableColumn}
              label="Message"
              dataKey="msg"
              width={300}
            />
            <Column
              className={tableStyles.tableColumn}
              label="Name"
              dataKey="name"
              width={210}
            />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

export default LoggerTable;
