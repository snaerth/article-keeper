import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-virtualized/dist/commonjs/Table';
import Column from 'react-virtualized/dist/commonjs/Table/Column';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import formatISODateTime from '../../utils/date';
import NotifyBox from '../common/notifyBox';
import tableStyles from '../../styles/table.css';

function UsersTable({ list, onRowClickHandler, rowClassName }) {
  if (list.length === 0) {
    return (
      <fieldset className="noPadding">
        <NotifyBox text="No users found" type="info" />
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
            cellDataGetter={columnData => {
              if (columnData.rowData.thumbnailUrl) {
                return (
                  <img
                    src={columnData.rowData.thumbnailUrl}
                    alt={columnData.rowData.name}
                  />
                );
              }
              return null;
            }}
            className={tableStyles.tableColumn}
            label="Image"
            dataKey="thumbnailUrl"
            width={210}
          />
          <Column
            className={tableStyles.tableColumn}
            label="Name"
            dataKey="name"
            width={210}
          />
          <Column
            className={tableStyles.tableColumn}
            label="Id"
            dataKey="_id"
            width={210}
          />
          <Column
            cellDataGetter={columnData =>
              formatISODateTime(columnData.rowData.createdAt)}
            className={tableStyles.tableColumn}
            label="Created at"
            dataKey="createdAt"
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
        </Table>
      )}
    </AutoSizer>
  );
}

UsersTable.propTypes = {
  list: PropTypes.array.isRequired,
  onRowClickHandler: PropTypes.func.isRequired,
  rowClassName: PropTypes.func.isRequired,
};

export default UsersTable;
