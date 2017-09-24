import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-virtualized/dist/commonjs/Table';
import Column from 'react-virtualized/dist/commonjs/Table/Column';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import formatISODateTime from '../../utils/date';
import NotifyBox from '../common/notifyBox';
import tableStyles from '../../styles/table.css';

function LoggerTable({ list, onRowClickHandler, rowClassName }) {
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
          height={600}
          headerHeight={30}
          rowHeight={30}
          headerClassName={tableStyles.tableHeader}
          rowClassName={rowClassName}
          rowCount={list.length}
          rowGetter={({ index }) => list[index]}
          onRowClick={({ event, index, rowData }) =>
            onRowClickHandler(event, index, rowData)}
        >
          <Column
            className={tableStyles.tableColumn}
            label="Id"
            dataKey="_id"
            width={210}
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
            className={tableStyles.tableColumn}
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

LoggerTable.propTypes = {
  list: PropTypes.array.isRequired,
  onRowClickHandler: PropTypes.func.isRequired,
  rowClassName: PropTypes.func.isRequired,
};

export default LoggerTable;
